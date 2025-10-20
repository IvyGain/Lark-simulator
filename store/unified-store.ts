import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { LARK_PRICE_PER_USER, tools } from "@/constants/tools";
import { ErrorHandler, safeParseFloat, safeDivision } from "@/utils/errorHandler";

// 選択されたツールとプラン情報
export interface SelectedToolPlan {
  toolId: string;
  planIndex: number;
}

// 統合されたツール情報
export interface UnifiedTool {
  id: string;
  name: string;
  category: string;
  pricePerUser: number;
  planIndex: number; // 選択されたプランのインデックス
  planName: string; // 選択されたプランの名前
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
  selectedTools: SelectedToolPlan[]; // 変更: プラン情報を含む
  
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
  
  // ツール管理 - 更新
  toggleTool: (toolId: string, planIndex?: number) => void;
  updateToolPlan: (toolId: string, planIndex: number) => void;
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
      prefecture: '',
      city: '',
      selectedTools: [],
      currentChallenges: [],
      expectedImprovements: [],
      availableSubsidies: [],
      subsidyPlan: null,
      isLoadingSubsidies: false,
      mode: 'simple',
      calculationResults: null,
      
      // アクション
      setCompanyName: (name) => set({ companyName: name }),
      setIndustry: (industry) => set({ industry }),
      setEmployeeCount: (count) => set({ employeeCount: count }),
      setHeadquarters: (headquarters) => set({ headquarters }),
      setPrefecture: (prefecture) => set({ prefecture }),
      setCity: (city) => set({ city }),
      setMode: (mode) => set({ mode }),
      
      // ツール管理 - 更新
      toggleTool: (toolId, planIndex) => {
        const { selectedTools } = get();
        const existingIndex = selectedTools.findIndex(st => st.toolId === toolId);
        
        if (existingIndex >= 0) {
          // ツールが既に選択されている場合は削除
          const newSelectedTools = selectedTools.filter(st => st.toolId !== toolId);
          set({ selectedTools: newSelectedTools });
        } else {
          // ツールが選択されていない場合は追加
          const tool = tools.find(t => t.id === toolId);
          if (tool) {
            const defaultPlanIndex = planIndex !== undefined ? planIndex : (tool.defaultPlanIndex || 0);
            const newSelectedTools = [...selectedTools, { toolId, planIndex: defaultPlanIndex }];
            set({ selectedTools: newSelectedTools });
          }
        }
      },

      updateToolPlan: (toolId, planIndex) => {
        const { selectedTools } = get();
        const updatedTools = selectedTools.map(st => 
          st.toolId === toolId ? { ...st, planIndex } : st
        );
        set({ selectedTools: updatedTools });
      },
      
      updateToolCustomPrice: (toolId, monthlyFee, annualFee, isAnnual) => {
        // カスタム価格機能は後で実装
        console.log('Custom pricing not yet implemented');
      },
      
      // 詳細情報管理
      setChallenges: (challenges) => set({ currentChallenges: challenges }),
      setImprovements: (improvements) => set({ expectedImprovements: improvements }),
      
      // 補助金関連
      searchSubsidies: async () => {
        // 補助金検索機能は後で実装
        console.log('Subsidy search not yet implemented');
      },
      
      generateSubsidyPlan: () => {
        // 補助金プラン生成機能は後で実装
        console.log('Subsidy plan generation not yet implemented');
      },
      
      // 計算
      calculateResults: () => {
        try {
          const { selectedTools, employeeCount } = get();
          
          if (selectedTools.length === 0 || employeeCount <= 0) {
            set({ calculationResults: null });
            return;
          }

          // 現在のツールコストを計算
          let currentMonthlyCost = 0;
          
          selectedTools.forEach(selectedTool => {
            const tool = tools.find(t => t.id === selectedTool.toolId);
            if (tool && tool.pricingPlans[selectedTool.planIndex]) {
              const plan = tool.pricingPlans[selectedTool.planIndex];
              currentMonthlyCost += plan.pricePerUser * employeeCount;
            }
          });

          const currentAnnualCost = currentMonthlyCost * 12;
          
          // Larkのコスト
          const larkMonthlyCost = LARK_PRICE_PER_USER * employeeCount;
          const larkAnnualCost = larkMonthlyCost * 12;
          
          // 節約額
          const monthlySavings = Math.max(0, currentMonthlyCost - larkMonthlyCost);
          const annualSavings = monthlySavings * 12;
          
          // 節約率
          const savingsPercentage = currentMonthlyCost > 0 
            ? safeDivision(monthlySavings, currentMonthlyCost, 0) * 100 
            : 0;
          
          // ROI計算（正しい計算式：(年間削減額 - 年間Larkコスト) / 年間Larkコスト * 100）
          const roi = larkAnnualCost > 0 
            ? safeDivision(annualSavings - larkAnnualCost, larkAnnualCost, 0) * 100 
            : 0;
          
          // 回収期間（月）- Lark導入コストを月間削減額で割る
          const paybackPeriod = monthlySavings > 0 
            ? safeDivision(larkAnnualCost, monthlySavings, 0) 
            : 0;

          // 労働時間節約の推定
          const laborHoursSaved = selectedTools.length * employeeCount * 2; // 1ツールあたり2時間/月の節約と仮定
          const laborCostSaved = laborHoursSaved * AVERAGE_HOURLY_WAGE;

          const results = {
            currentMonthlyCost,
            currentAnnualCost,
            larkMonthlyCost,
            larkAnnualCost,
            monthlySavings,
            annualSavings,
            savingsPercentage,
            roi,
            paybackPeriod,
            laborHoursSaved,
            laborCostSaved,
          };

          set({ calculationResults: results });
          
        } catch (error) {
          ErrorHandler.logError('Calculation error', error);
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
          prefecture: '',
          city: '',
          selectedTools: [],
          currentChallenges: [],
          expectedImprovements: [],
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