import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ToolCheckboxWithPlans from "./ToolCheckboxWithPlans";
import { Tool } from "@/constants/tools";
import Colors from "@/constants/colors";

interface SelectedToolPlan {
  toolId: string;
  planIndex: number;
}

interface CategorySectionProps {
  category: string;
  tools: Tool[];
  selectedTools: SelectedToolPlan[];
  onToggleTool: (id: string, planIndex?: number) => void;
  onPlanChange?: (toolId: string, planIndex: number) => void;
}

export default function CategorySection({
  category,
  tools,
  selectedTools,
  onToggleTool,
  onPlanChange,
}: CategorySectionProps) {
  const getSelectedPlanIndex = (toolId: string): number | undefined => {
    const selectedTool = selectedTools.find(st => st.toolId === toolId);
    return selectedTool?.planIndex;
  };

  const isToolSelected = (toolId: string): boolean => {
    return selectedTools.some(st => st.toolId === toolId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.toolsGrid}>
        {tools.map((tool) => (
          <View key={tool.id} style={styles.toolWrapper}>
            <ToolCheckboxWithPlans
              tool={tool}
              isSelected={isToolSelected(tool.id)}
              selectedPlanIndex={getSelectedPlanIndex(tool.id)}
              onToggle={onToggleTool}
              onPlanChange={onPlanChange}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.primary,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  toolsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  toolWrapper: {
    flexBasis: '32%', // 3 columns
    marginBottom: 6,
  }
});