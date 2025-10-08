import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { LARK_PRICE_PER_USER, tools, Tool } from "@/constants/tools";

interface SelectedToolPlan {
  toolId: string;
  planIndex: number;
}

interface SimulatorState {
  selectedTools: SelectedToolPlan[];
  userCount: number;
  toggleTool: (toolId: string, planIndex?: number) => void;
  updateToolPlan: (toolId: string, planIndex: number) => void;
  setUserCount: (count: number) => void;
  resetSelection: () => void;
  calculateCurrentCost: () => number;
  calculateLarkCost: () => number;
  calculateSavings: () => number;
  calculateAnnualCost: (monthlyCost: number) => number;
  getSelectedToolsWithPrices: () => Array<{ tool: Tool; planIndex: number; price: number }>;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set, get) => ({
      selectedTools: [],
      userCount: 50,
      
      toggleTool: (toolId: string, planIndex?: number) => {
        set((state) => {
          const existingIndex = state.selectedTools.findIndex(item => item.toolId === toolId);
          
          if (existingIndex >= 0) {
            // Remove tool if already selected
            return {
              selectedTools: state.selectedTools.filter(item => item.toolId !== toolId),
            };
          } else {
            // Add tool with specified plan or default plan
            const tool = tools.find(t => t.id === toolId);
            const selectedPlanIndex = planIndex !== undefined ? planIndex : (tool?.defaultPlanIndex || 0);
            
            return {
              selectedTools: [...state.selectedTools, { toolId, planIndex: selectedPlanIndex }],
            };
          }
        });
      },
      
      updateToolPlan: (toolId: string, planIndex: number) => {
        set((state) => ({
          selectedTools: state.selectedTools.map(item =>
            item.toolId === toolId ? { ...item, planIndex } : item
          ),
        }));
      },
      
      setUserCount: (count: number) => {
        set({ userCount: count });
      },
      
      resetSelection: () => {
        set({ selectedTools: [], userCount: 50 });
      },
      
      calculateCurrentCost: () => {
        const { selectedTools, userCount } = get();
        return selectedTools.reduce((total, selectedTool) => {
          const tool = tools.find(t => t.id === selectedTool.toolId);
          if (tool && tool.pricingPlans[selectedTool.planIndex]) {
            return total + tool.pricingPlans[selectedTool.planIndex].pricePerUser * userCount;
          }
          return total;
        }, 0);
      },
      
      calculateLarkCost: () => {
        const { userCount } = get();
        return LARK_PRICE_PER_USER * userCount;
      },
      
      calculateSavings: () => {
        const currentCost = get().calculateCurrentCost();
        const larkCost = get().calculateLarkCost();
        return currentCost - larkCost;
      },
      
      calculateAnnualCost: (monthlyCost: number) => {
        return monthlyCost * 12;
      },
      
      getSelectedToolsWithPrices: () => {
        const { selectedTools } = get();
        return selectedTools.map(selectedTool => {
          const tool = tools.find(t => t.id === selectedTool.toolId);
          if (tool && tool.pricingPlans[selectedTool.planIndex]) {
            return {
              tool,
              planIndex: selectedTool.planIndex,
              price: tool.pricingPlans[selectedTool.planIndex].pricePerUser,
            };
          }
          return null;
        }).filter(Boolean) as Array<{ tool: Tool; planIndex: number; price: number }>;
      },
    }),
    {
      name: "lark-simulator-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);