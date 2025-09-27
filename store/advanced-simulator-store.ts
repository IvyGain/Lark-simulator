import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { LARK_PRICE_PER_USER } from "@/constants/tools";

// 現状課題の型定義
export interface CurrentChallenge {
  id: string;
  label: string;
  selected: boolean;
  customText?: string;
}

// 期待する改善効果の型定義
export interface ExpectedImprovement {
  id: string;
  label: string;
  selected: boolean;
}

// ツール詳細情報の型定義
export interface ToolDetail {
  toolId: string;
  monthlyFee: number;
  annualFee: number;
  isAnnualBilling: boolean;
}

// ユースケースの型定義
export interface UseCase {
  challenge: string;
  solution: string;
  feature: string;
}

// 計算結果の型定義
export interface CalculationResult {
  currentMonthlyCost: number;
  currentAnnualCost: number;
  larkMonthlyCost: number;
  larkAnnualCost: number;
  monthlySavings: number;
  annualSavings: number;
  savingsPercentage: number;
  laborHoursSaved: number;
  laborCostSaved: number;
  expenseReductionRate: number;
  expenseReductionAmount: number;
  roi: number;
  paybackPeriod: number; // months
  useCases: UseCase[];
}

interface AdvancedSimulatorState {
  // 基本情報
  companyName?: string;
  industry?: string;
  employeeCount: number;
  selectedTools: ToolDetail[];
  
  // 現状課題
  currentChallenges: CurrentChallenge[];
  
  // 期待する改善効果
  expectedImprovements: ExpectedImprovement[];
  
  // 計算結果
  calculationResult: CalculationResult | null;
  
  // アクション
  setCompanyName: (name: string) => void;
  setIndustry: (industry: string) => void;
  setEmployeeCount: (count: number) => void;
  addTool: (tool: ToolDetail) => void;
  removeTool: (toolId: string) => void;
  updateToolFee: (toolId: string, monthlyFee: number, annualFee: number, isAnnualBilling: boolean) => void;
  toggleChallenge: (challengeId: string) => void;
  updateChallengeCustomText: (challengeId: string, text: string) => void;
  toggleImprovement: (improvementId: string) => void;
  calculateResults: () => void;
  resetAll: () => void;
}

// デフォルトの現状課題
const defaultChallenges: CurrentChallenge[] = [
  { id: 'customer-management', label: '顧客管理の属人化', selected: false },
  { id: 'project-complexity', label: 'プロジェクト進捗管理の煩雑化', selected: false },
  { id: 'info-fragmentation', label: '情報共有の分散', selected: false },
  { id: 'communication-delay', label: 'コミュニケーションの遅延', selected: false },
  { id: 'tool-cost', label: 'ツールコストの増大', selected: false },
  { id: 'other', label: 'その他', selected: false, customText: '' },
];

// デフォルトの期待する改善効果
const defaultImprovements: ExpectedImprovement[] = [
  { id: 'labor-reduction', label: '工数削減', selected: false },
  { id: 'paperless', label: 'ペーパーレス', selected: false },
  { id: 'info-centralization', label: '情報一元化', selected: false },
  { id: 'cost-reduction', label: 'コスト削減', selected: false },
  { id: 'efficiency', label: '業務効率化', selected: false },
];

// 平均時給（計算用）
const AVERAGE_HOURLY_WAGE = 3000; // 円

export const useAdvancedSimulatorStore = create<AdvancedSimulatorState>()(
  persist(
    (set, get) => ({
      companyName: '',
      industry: 'IT',
      employeeCount: 50,
      selectedTools: [],
      currentChallenges: defaultChallenges,
      expectedImprovements: defaultImprovements,
      calculationResult: null,
      
      setCompanyName: (name: string) => {
        set({ companyName: name });
      },
      
      setIndustry: (industry: string) => {
        set({ industry: industry });
      },
      
      setEmployeeCount: (count: number) => {
        set({ employeeCount: count });
      },
      
      addTool: (tool: ToolDetail) => {
        set((state) => ({
          selectedTools: [...state.selectedTools, tool],
        }));
      },
      
      removeTool: (toolId: string) => {
        set((state) => ({
          selectedTools: state.selectedTools.filter((t) => t.toolId !== toolId),
        }));
      },
      
      updateToolFee: (toolId: string, monthlyFee: number, annualFee: number, isAnnualBilling: boolean) => {
        set((state) => ({
          selectedTools: state.selectedTools.map((tool) =>
            tool.toolId === toolId
              ? { ...tool, monthlyFee, annualFee, isAnnualBilling }
              : tool
          ),
        }));
      },
      
      toggleChallenge: (challengeId: string) => {
        set((state) => ({
          currentChallenges: state.currentChallenges.map((challenge) =>
            challenge.id === challengeId
              ? { ...challenge, selected: !challenge.selected }
              : challenge
          ),
        }));
      },
      
      updateChallengeCustomText: (challengeId: string, text: string) => {
        set((state) => ({
          currentChallenges: state.currentChallenges.map((challenge) =>
            challenge.id === challengeId
              ? { ...challenge, customText: text }
              : challenge
          ),
        }));
      },
      
      toggleImprovement: (improvementId: string) => {
        set((state) => ({
          expectedImprovements: state.expectedImprovements.map((improvement) =>
            improvement.id === improvementId
              ? { ...improvement, selected: !improvement.selected }
              : improvement
          ),
        }));
      },
      
      calculateResults: () => {
        const state = get();
        const { employeeCount, selectedTools, currentChallenges, expectedImprovements } = state;
        
        // 現在のコスト計算
        let currentMonthlyCost = 0;
        let currentAnnualCost = 0;
        
        selectedTools.forEach((tool) => {
          if (tool.isAnnualBilling) {
            currentAnnualCost += tool.annualFee * employeeCount;
            currentMonthlyCost += (tool.annualFee / 12) * employeeCount;
          } else {
            currentMonthlyCost += tool.monthlyFee * employeeCount;
            currentAnnualCost += tool.monthlyFee * 12 * employeeCount;
          }
        });
        
        // Larkのコスト計算
        const larkMonthlyCost = LARK_PRICE_PER_USER * employeeCount;
        const larkAnnualCost = larkMonthlyCost * 12;
        
        // 節約額計算
        const monthlySavings = currentMonthlyCost - larkMonthlyCost;
        const annualSavings = currentAnnualCost - larkAnnualCost;
        const savingsPercentage = currentMonthlyCost > 0 
          ? (monthlySavings / currentMonthlyCost) * 100 
          : 0;
        
        // 工数削減計算（選択されたツール数に基づいて推定）
        const toolIntegrationHours = selectedTools.length * 2; // 各ツール間の連携に2時間/月
        const laborHoursSaved = toolIntegrationHours * employeeCount;
        const laborCostSaved = laborHoursSaved * AVERAGE_HOURLY_WAGE;
        
        // 経費削減率計算
        const expenseReductionRate = savingsPercentage;
        const expenseReductionAmount = annualSavings;
        
        // ROI計算（年間節約額 / 年間Larkコスト）
        const roi = larkAnnualCost > 0 ? (annualSavings / larkAnnualCost) * 100 : 0;
        
        // 投資回収期間（月）
        const monthlyNetSavings = monthlySavings + (laborCostSaved / 12);
        const paybackPeriod = larkMonthlyCost > 0 && monthlyNetSavings > 0
          ? larkMonthlyCost / monthlyNetSavings
          : 0;
        
        // ユースケース生成
        const useCases: UseCase[] = [];
        
        currentChallenges.forEach((challenge) => {
          if (challenge.selected) {
            switch (challenge.id) {
              case 'customer-management':
                useCases.push({
                  challenge: challenge.label,
                  solution: 'Lark CRMテンプレートを活用した顧客情報の一元管理',
                  feature: 'CRMテンプレート、カスタムフォーム、自動化ワークフロー',
                });
                break;
              case 'project-complexity':
                useCases.push({
                  challenge: challenge.label,
                  solution: 'Larkタスク管理とカレンダー連携による進捗の可視化',
                  feature: 'タスク管理、ガントチャート、カレンダー連携',
                });
                break;
              case 'info-fragmentation':
                useCases.push({
                  challenge: challenge.label,
                  solution: 'Lark Docsとチャットの統合による情報の一元化',
                  feature: 'ドキュメント管理、チーム共有フォルダ、検索機能',
                });
                break;
              case 'communication-delay':
                useCases.push({
                  challenge: challenge.label,
                  solution: 'Larkメッセンジャーとビデオ会議による即時コミュニケーション',
                  feature: 'インスタントメッセージ、ビデオ会議、画面共有',
                });
                break;
              case 'tool-cost':
                useCases.push({
                  challenge: challenge.label,
                  solution: 'オールインワンプラットフォームによるコスト最適化',
                  feature: '統合プラットフォーム、一括請求、ボリュームディスカウント',
                });
                break;
              case 'other':
                if (challenge.customText) {
                  useCases.push({
                    challenge: challenge.customText,
                    solution: 'Larkの豊富な機能を活用したカスタムソリューション',
                    feature: 'API連携、カスタムアプリ、ワークフロー自動化',
                  });
                }
                break;
            }
          }
        });
        
        const result: CalculationResult = {
          currentMonthlyCost,
          currentAnnualCost,
          larkMonthlyCost,
          larkAnnualCost,
          monthlySavings,
          annualSavings,
          savingsPercentage,
          laborHoursSaved,
          laborCostSaved,
          expenseReductionRate,
          expenseReductionAmount,
          roi,
          paybackPeriod,
          useCases,
        };
        
        set({ calculationResult: result });
      },
      
      resetAll: () => {
        set({
          companyName: '',
          industry: 'IT',
          employeeCount: 50,
          selectedTools: [],
          currentChallenges: defaultChallenges,
          expectedImprovements: defaultImprovements,
          calculationResult: null,
        });
      },
    }),
    {
      name: "lark-advanced-simulator-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);