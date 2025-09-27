import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";
import { LARK_PRICE_PER_USER } from "@/constants/tools";

interface SimulatorState {
  selectedTools: string[];
  userCount: number;
  toggleTool: (toolId: string) => void;
  setUserCount: (count: number) => void;
  resetSelection: () => void;
  calculateCurrentCost: (toolPrices: Record<string, number>) => number;
  calculateLarkCost: () => number;
  calculateSavings: (toolPrices: Record<string, number>) => number;
  calculateAnnualCost: (monthlyCost: number) => number;
}

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set, get) => ({
      selectedTools: [],
      userCount: 50,
      
      toggleTool: (toolId: string) => {
        set((state) => {
          if (state.selectedTools.includes(toolId)) {
            return {
              selectedTools: state.selectedTools.filter((id) => id !== toolId),
            };
          } else {
            return {
              selectedTools: [...state.selectedTools, toolId],
            };
          }
        });
      },
      
      setUserCount: (count: number) => {
        set({ userCount: count });
      },
      
      resetSelection: () => {
        set({ selectedTools: [], userCount: 50 });
      },
      
      calculateCurrentCost: (toolPrices: Record<string, number>) => {
        const { selectedTools, userCount } = get();
        return selectedTools.reduce(
          (total, toolId) => total + (toolPrices[toolId] || 0) * userCount,
          0
        );
      },
      
      calculateLarkCost: () => {
        const { userCount } = get();
        return LARK_PRICE_PER_USER * userCount;
      },
      
      calculateSavings: (toolPrices: Record<string, number>) => {
        const currentCost = get().calculateCurrentCost(toolPrices);
        const larkCost = get().calculateLarkCost();
        return currentCost - larkCost;
      },
      
      calculateAnnualCost: (monthlyCost: number) => {
        return monthlyCost * 12;
      },
    }),
    {
      name: "lark-simulator-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);