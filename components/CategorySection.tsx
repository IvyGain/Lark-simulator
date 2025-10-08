import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { ToolCheckboxWithPlans } from './ToolCheckboxWithPlans'
import { Tool } from '@/constants/tools'
import Colors from '@/constants/colors'

export interface SelectedToolPlan {
  toolId: string
  planIndex: number
  planName: string
}

interface CategorySectionProps {
  title: string
  tools: Tool[]
  selectedTools: SelectedToolPlan[]
  onToggleTool: (toolId: string) => void
  onPlanChange: (toolId: string, planIndex: number) => void
}

export function CategorySection({ 
  title, 
  tools, 
  selectedTools, 
  onToggleTool, 
  onPlanChange 
}: CategorySectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.toolsGrid}>
        {tools.map((tool) => {
          const selectedTool = selectedTools.find(st => st.toolId === tool.id)
          return (
            <ToolCheckboxWithPlans
              key={tool.id}
              tool={tool}
              isSelected={!!selectedTool}
              selectedPlanIndex={selectedTool?.planIndex || 0}
              onToggle={() => onToggleTool(tool.id)}
              onPlanChange={(planIndex) => onPlanChange(tool.id, planIndex)}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 16,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
})