import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { LARK_PRICE_PER_USER, tools } from "@/constants/tools";
import { ErrorHandler, safeParseFloat, safeDivision } from "@/utils/errorHandler";

// 統合されたツール情報
export interface UnifiedTool {
  id: string;
  name: string;
  category: string;
  pricePerUser: number;
  customMonthlyFee?: number;
  customAnnualFee?: number;
  isAnnualBilling?: boolean;
}

// 補助金情報
export interface SubsidyInfo {
  id: string;
  name: string;
  type: 'national' | 'local';
  maxAmount: number;
  subsidyRate: number; // 0.5 = 50%
  targetType: string[];
  applicationDeadline: string;
  requirements: string[];
  applicableToLark: boolean;
  estimatedAmount: number; // 推定適用額
  prefecture?: string;
  city?: string;
  source?: string; // データソース
}

// 補助金プラン
export interface SubsidyPlan {
  totalSubsidyAmount: number;
  netImplementationCost: number; // 補助金適用後の実質導入費用
  applicableSubsidies: SubsidyInfo[];
  roiWithSubsidy: number; // 補助金考慮後のROI
  paybackWithSubsidy: number; // 補助金考慮後の回収期間
  implementationTimeline: string; // 実装タイムライン
}

// 統合されたシミュレーター状態
export interface UnifiedSimulatorState {
  // 基本情報
  companyName: string;
  industry: string;
  employeeCount: number;
  headquarters: string; // 本社所在地
  prefecture: string; // 都道府県
  city: string; // 市区町村
  selectedTools: UnifiedTool[];
  
  // 詳細情報（Advanced mode用）
  currentChallenges: string[];
  expectedImprovements: string[];
  
  // 補助金関連
  availableSubsidies: SubsidyInfo[];
  subsidyPlan: SubsidyPlan | null;
  isLoadingSubsidies: boolean;
  
  // モード制御
  mode: 'simple' | 'advanced' | 'enhanced' | 'unified';
  
  // 計算結果
  calculationResults: {
    currentMonthlyCost: number;
    currentAnnualCost: number;
    larkMonthlyCost: number;
    larkAnnualCost: number;
    monthlySavings: number;
    annualSavings: number;
    savingsPercentage: number;
    roi: number;
    paybackPeriod: number;
    laborHoursSaved?: number;
    laborCostSaved?: number;
  } | null;
  
  // アクション
  setCompanyName: (name: string) => void;
  setIndustry: (industry: string) => void;
  setEmployeeCount: (count: number) => void;
  setHeadquarters: (headquarters: string) => void;
  setPrefecture: (prefecture: string) => void;
  setCity: (city: string) => void;
  setMode: (mode: 'simple' | 'advanced' | 'enhanced' | 'unified') => void;
  
  // ツール管理
  toggleTool: (toolId: string) => void;
  updateToolCustomPrice: (toolId: string, monthlyFee?: number, annualFee?: number, isAnnual?: boolean) => void;
  
  // 詳細情報管理
  setChallenges: (challenges: string[]) => void;
  setImprovements: (improvements: string[]) => void;
  
  // 補助金関連
  searchSubsidies: () => Promise<void>;
  generateSubsidyPlan: () => void;
  
  // 計算
  calculateResults: () => void;
  
  // リセット
  reset: () => void;
}

const AVERAGE_HOURLY_WAGE = 3000;

export const useUnifiedStore = create<UnifiedSimulatorState>()(
  persist(
    (set, get) => ({
      // 初期状態
      companyName: '',
      industry: 'IT',
      employeeCount: 50,
      headquarters: '',
      selectedTools: [],
      currentChallenges: [],
      expectedImprovements: [],
      mode: 'simple',
      calculationResults: null,
      
      // アクション実装
      setCompanyName: (name) => set({ companyName: name }),
      setIndustry: (industry) => set({ industry }),
      setEmployeeCount: (count) => set({ employeeCount: count }),
      setHeadquarters: (headquarters) => set({ headquarters }),
      setMode: (mode) => set({ mode }),
      
      // ツール管理
      toggleTool: (toolId) => {
        const state = get();
        const existingIndex = state.selectedTools.findIndex(t => t.id === toolId);
        
        if (existingIndex >= 0) {
          // ツールを削除
          const newTools = state.selectedTools.filter(t => t.id !== toolId);
          set({ selectedTools: newTools });
        } else {
          // ツールを追加
          const tool = tools.find(t => t.id === toolId);
          if (tool) {
            const newTool: UnifiedTool = {
              id: tool.id,
              name: tool.name,
              category: tool.category,
              pricePerUser: tool.pricePerUser,
            };
            set({ selectedTools: [...state.selectedTools, newTool] });
          }
        }
      },
      
      updateToolCustomPrice: (toolId, monthlyFee, annualFee, isAnnual) => {
        const state = get();
        const updatedTools = state.selectedTools.map(tool => {
          if (tool.id === toolId) {
            return {
              ...tool,
              customMonthlyFee: monthlyFee,
              customAnnualFee: annualFee,
              isAnnualBilling: isAnnual,
            };
          }
          return tool;
        });
        set({ selectedTools: updatedTools });
      },
      
      // 詳細情報管理
      setChallenges: (challenges) => set({ currentChallenges: challenges }),
      setImprovements: (improvements) => set({ expectedImprovements: improvements }),
      
      // 計算ロジック
      calculateResults: () => {
        try {
          const state = get();
          const { selectedTools, employeeCount } = state;
          
          if (selectedTools.length === 0) {
            set({ calculationResults: null });
            return;
          }
          
          // 現在のツールコスト計算
          const currentMonthlyCost = selectedTools.reduce((total, tool) => {
            if (tool.customMonthlyFee !== undefined) {
              return total + tool.customMonthlyFee;
            }
            if (tool.customAnnualFee !== undefined && tool.isAnnualBilling) {
              return total + (tool.customAnnualFee / 12);
            }
            return total + (tool.pricePerUser * employeeCount);
          }, 0);
          
          const currentAnnualCost = currentMonthlyCost * 12;
          
          // Larkコスト計算
          const larkMonthlyCost = LARK_PRICE_PER_USER * employeeCount;
          const larkAnnualCost = larkMonthlyCost * 12;
          
          // 削減額計算
          const monthlySavings = Math.max(0, currentMonthlyCost - larkMonthlyCost);
          const annualSavings = monthlySavings * 12;
          
          // 削減率計算
          const savingsPercentage = currentMonthlyCost > 0 
            ? safeDivision(monthlySavings, currentMonthlyCost) * 100 
            : 0;
          
          // ROI計算（年間削減額 / Lark年間コスト）
          const roi = larkAnnualCost > 0 
            ? safeDivision(annualSavings, larkAnnualCost) * 100 
            : 0;
          
          // 回収期間計算（月）
          const paybackPeriod = monthlySavings > 0 
            ? safeDivision(larkMonthlyCost, monthlySavings) 
            : 0;
          
          // 労働時間削減効果の推定
          const estimatedHoursSavedPerEmployee = selectedTools.length * 2; // ツール1つあたり月2時間削減と仮定
          const laborHoursSaved = estimatedHoursSavedPerEmployee * employeeCount;
          const laborCostSaved = laborHoursSaved * AVERAGE_HOURLY_WAGE;
          
          const results = {
            currentMonthlyCost: safeParseFloat(currentMonthlyCost),
            currentAnnualCost: safeParseFloat(currentAnnualCost),
            larkMonthlyCost: safeParseFloat(larkMonthlyCost),
            larkAnnualCost: safeParseFloat(larkAnnualCost),
            monthlySavings: safeParseFloat(monthlySavings),
            annualSavings: safeParseFloat(annualSavings),
            savingsPercentage: safeParseFloat(savingsPercentage),
            roi: safeParseFloat(roi),
            paybackPeriod: safeParseFloat(paybackPeriod),
            laborHoursSaved: safeParseFloat(laborHoursSaved),
            laborCostSaved: safeParseFloat(laborCostSaved),
          };
          
          set({ calculationResults: results });
        } catch (error) {
          ErrorHandler.logError('Calculation failed', error);
          set({ calculationResults: null });
        }
      },
      
      // リセット
      reset: () => {
        set({
          companyName: '',
          industry: 'IT',
          employeeCount: 50,
          headquarters: '',
          selectedTools: [],
          currentChallenges: [],
          expectedImprovements: [],
          mode: 'simple',
          calculationResults: null,
        });
      },
    }),
    {
      name: "lark-unified-simulator-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);