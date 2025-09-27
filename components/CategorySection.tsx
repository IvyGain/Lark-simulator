import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ToolCheckbox from "./ToolCheckbox";
import { Tool } from "@/constants/tools";
import Colors from "@/constants/colors";

interface CategorySectionProps {
  category: string;
  tools: Tool[];
  selectedTools: string[];
  onToggleTool: (id: string) => void;
}

export default function CategorySection({
  category,
  tools,
  selectedTools,
  onToggleTool,
}: CategorySectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryTitle}>{category}</Text>
      <View style={styles.toolsGrid}>
        {tools.map((tool) => (
          <View key={tool.id} style={styles.toolWrapper}>
            <ToolCheckbox
              id={tool.id}
              name={tool.name}
              icon={tool.icon}
              price={tool.pricePerUser}
              isSelected={selectedTools.includes(tool.id)}
              onToggle={onToggleTool}
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