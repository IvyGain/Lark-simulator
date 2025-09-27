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
      // 初期値
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
      
      // 基本情報のセッター
      setCompanyName: (name) => set({ companyName: name }),
      setIndustry: (industry) => set({ industry }),
      setEmployeeCount: (count) => set({ employeeCount: count }),
      setHeadquarters: (headquarters) => set({ headquarters }),
      setPrefecture: (prefecture) => set({ prefecture }),
      setCity: (city) => set({ city }),
      setMode: (mode) => set({ mode }),
      
      // ツール管理
      toggleTool: (toolId) => {
        const state = get();
        const tool = tools.find(t => t.id === toolId);
        if (!tool) return;
        
        const existingIndex = state.selectedTools.findIndex(t => t.id === toolId);
        if (existingIndex >= 0) {
          // 削除
          set({
            selectedTools: state.selectedTools.filter(t => t.id !== toolId)
          });
        } else {
          // 追加
          const unifiedTool: UnifiedTool = {
            id: tool.id,
            name: tool.name,
            category: tool.category,
            pricePerUser: tool.pricePerUser,
          };
          set({
            selectedTools: [...state.selectedTools, unifiedTool]
          });
        }
      },
      
      updateToolCustomPrice: (toolId, monthlyFee, annualFee, isAnnual) => {
        set((state) => ({
          selectedTools: state.selectedTools.map(tool =>
            tool.id === toolId
              ? {
                  ...tool,
                  customMonthlyFee: monthlyFee,
                  customAnnualFee: annualFee,
                  isAnnualBilling: isAnnual
                }
              : tool
          )
        }));
      },
      
      // 詳細情報管理
      setChallenges: (challenges) => set({ currentChallenges: challenges }),
      setImprovements: (improvements) => set({ expectedImprovements: improvements }),
      
      // 補助金関連
      searchSubsidies: async () => {
        const state = get();
        const { prefecture, city, industry, employeeCount, calculationResults } = state;
        
        set({ isLoadingSubsidies: true });
        
        try {
          // リアルタイム補助金・助成金情報を取得する模擬実装
          // 実際の実装では searchAvailableSubsidies を使用
          const larkAnnualCost = calculationResults?.larkAnnualCost || 0;
          
          const mockSubsidies: SubsidyInfo[] = [
            {
              id: 'it-subsidy-2025',
              name: 'IT導入補助金2025',
              type: 'national',
              maxAmount: 4500000,
              subsidyRate: 0.5,
              targetType: ['IT導入', 'DX推進', 'グループウェア'],
              applicationDeadline: '2025-07-18',
              requirements: ['中小企業', 'IT導入支援事業者との連携'],
              applicableToLark: true,
              estimatedAmount: Math.min(larkAnnualCost * 0.5, 4500000),
              source: 'IT導入補助金2025公式サイト'
            },
            {
              id: 'small-business-subsidy-2025',
              name: '小規模事業者持続化補助金',
              type: 'national',
              maxAmount: 2500000,
              subsidyRate: 0.67,
              targetType: ['販路開拓', '業務効率化', 'デジタル化'],
              applicationDeadline: '2025-06-30',
              requirements: ['小規模事業者', '経営計画の策定'],
              applicableToLark: employeeCount <= 20,
              estimatedAmount: employeeCount <= 20 ? Math.min(larkAnnualCost * 0.67, 500000) : 0,
              source: '全国商工会連合会'
            }
          ];
          
          // 地方自治体の補助金を追加（都道府県・市区町村ベース）
          if (prefecture) {
            const localSubsidies: SubsidyInfo[] = [
              {
                id: `${prefecture}-dx-subsidy`,
                name: `${prefecture}DX推進補助金`,
                type: 'local',
                maxAmount: 1000000,
                subsidyRate: 0.5,
                targetType: ['地域DX', 'デジタル化推進'],
                applicationDeadline: '2025-09-30',
                requirements: ['県内企業', 'DX推進計画'],
                applicableToLark: true,
                estimatedAmount: Math.min(larkAnnualCost * 0.5, 1000000),
                prefecture,
                city,
                source: `${prefecture}庁公式サイト`
              }
            ];
            
            mockSubsidies.push(...localSubsidies);
          }
          
          // 適用可能な補助金のみをフィルタリング
          const applicableSubsidies = mockSubsidies.filter(s => s.applicableToLark);
          
          set({ 
            availableSubsidies: applicableSubsidies,
            isLoadingSubsidies: false 
          });
          
        } catch (error) {
          console.error('補助金検索エラー:', error);
          set({ isLoadingSubsidies: false });
        }
      },
      
      generateSubsidyPlan: () => {
        const state = get();
        const { availableSubsidies, calculationResults } = state;
        
        if (!calculationResults || availableSubsidies.length === 0) {
          set({ subsidyPlan: null });
          return;
        }
        
        // 補助金の組み合わせを最適化
        const sortedSubsidies = availableSubsidies
          .filter(s => s.applicableToLark)
          .sort((a, b) => b.estimatedAmount - a.estimatedAmount);
        
        // 重複しない補助金を選択（通常は1つの国庫補助金 + 1つの地方補助金）
        const selectedSubsidies = [];
        let hasNational = false;
        let hasLocal = false;
        
        for (const subsidy of sortedSubsidies) {
          if (subsidy.type === 'national' && !hasNational) {
            selectedSubsidies.push(subsidy);
            hasNational = true;
          } else if (subsidy.type === 'local' && !hasLocal) {
            selectedSubsidies.push(subsidy);
            hasLocal = true;
          }
          
          if (hasNational && hasLocal) break;
        }
        
        // 補助金額の合計を計算（現実的な上限を設定）
        const totalSubsidyAmount = selectedSubsidies.reduce((sum, s) => sum + s.estimatedAmount, 0);
        // 補助金額は導入コストの最大80%まで（現実的な制約）
        const maxSubsidyAmount = calculationResults.larkAnnualCost * 0.8;
        const effectiveSubsidyAmount = Math.min(totalSubsidyAmount, maxSubsidyAmount);
        const netImplementationCost = Math.max(calculationResults.larkAnnualCost * 0.2, calculationResults.larkAnnualCost - effectiveSubsidyAmount);
        const roiWithSubsidy = netImplementationCost > 0 
          ? Math.round(((calculationResults.annualSavings - netImplementationCost) / netImplementationCost) * 100)
          : calculationResults.annualSavings > 0 ? Infinity : 0;
        const paybackWithSubsidy = netImplementationCost > 0 
          ? Math.ceil((netImplementationCost / calculationResults.annualSavings) * 12)
          : 0;
        
        const subsidyPlan: SubsidyPlan = {
          totalSubsidyAmount: effectiveSubsidyAmount,
          netImplementationCost,
          applicableSubsidies: selectedSubsidies.map(s => ({
            ...s,
            estimatedAmount: s.estimatedAmount > maxSubsidyAmount ? 
              Math.round(maxSubsidyAmount * (s.estimatedAmount / totalSubsidyAmount)) : 
              s.estimatedAmount
          })),
          roiWithSubsidy,
          paybackWithSubsidy,
          implementationTimeline: '申請から導入完了まで3-6ヶ月'
        };
        
        set({ subsidyPlan });
      },
      
      // 計算（エラーハンドリング強化版）
      calculateResults: () => {
        try {
          const state = get();
          const { employeeCount, selectedTools, mode } = state;
          
          // 入力値検証
          const safeEmployeeCount = Math.max(1, safeParseFloat(employeeCount, 1));
          
          // 早期リターン：選択ツールがない場合
          if (!selectedTools || selectedTools.length === 0) {
            set({ calculationResults: null });
            return;
          }
          
          // 現在のツールコスト計算（安全な計算）
          const currentMonthlyCost = selectedTools.reduce((total, tool) => {
            try {
              if (tool.customMonthlyFee !== undefined) {
                return total + safeParseFloat(tool.customMonthlyFee, 0);
              } else if (tool.customAnnualFee !== undefined && tool.isAnnualBilling) {
                return total + safeDivision(safeParseFloat(tool.customAnnualFee, 0), 12, 0);
              } else {
                return total + (safeParseFloat(tool.pricePerUser, 0) * safeEmployeeCount);
              }
            } catch (error) {
              ErrorHandler.logError(ErrorHandler.createError('TOOL_CALC_ERROR', `ツール計算エラー: ${tool.name}`, 'low'));
              return total;
            }
          }, 0);
          
          const currentAnnualCost = currentMonthlyCost * 12;
          const larkMonthlyCost = LARK_PRICE_PER_USER * safeEmployeeCount;
          const larkAnnualCost = larkMonthlyCost * 12;
          const monthlySavings = currentMonthlyCost - larkMonthlyCost;
          const annualSavings = currentAnnualCost - larkAnnualCost;
          
          // 安全な除算とパーセンテージ計算
          const savingsPercentage = Math.max(0, Math.min(100, 
            Math.round(safeDivision(monthlySavings, currentMonthlyCost, 0) * 100)
          ));
          
          const roi = Math.max(0, 
            Math.round(safeDivision(annualSavings, larkAnnualCost, 0) * 100)
          );
          
          const paybackPeriod = annualSavings > 0
            ? Math.max(1, Math.ceil(safeDivision(larkAnnualCost, annualSavings, 1) * 12))
            : 0;
          
          // 労働時間削減効果（条件付き計算）
          const isAdvancedMode = mode === 'advanced' || mode === 'unified';
          const laborHoursSaved = isAdvancedMode ? safeEmployeeCount * 20 : 0;
          const laborCostSaved = isAdvancedMode ? laborHoursSaved * AVERAGE_HOURLY_WAGE : 0;
          
          // 一度に状態更新
          set({
            calculationResults: {
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
            }
          });
        } catch (error) {
          const appError = ErrorHandler.handleCalculationError(error);
          ErrorHandler.logError(appError);
          
          // エラー時はnullに設定
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
          availableSubsidies: [],
          subsidyPlan: null,
          isLoadingSubsidies: false,
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