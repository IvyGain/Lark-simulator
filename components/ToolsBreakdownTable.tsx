import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

interface Tool {
  id: string;
  name: string;
  pricePerUser: number;
  customMonthlyFee?: number;
}

interface ToolsBreakdownTableProps {
  selectedTools: Tool[];
  employeeCount: number;
  larkPricePerUser?: number;
}

export function ToolsBreakdownTable({ 
  selectedTools, 
  employeeCount, 
  larkPricePerUser = 1420 
}: ToolsBreakdownTableProps) {
  const calculateMonthlyCost = (tool: Tool) => {
    return tool.customMonthlyFee || (tool.pricePerUser * employeeCount);
  };

  const totalCurrentCost = selectedTools.reduce((sum, tool) => sum + calculateMonthlyCost(tool), 0);
  const larkMonthlyCost = larkPricePerUser * employeeCount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>現在のツール内訳</Text>
      <Text style={styles.subtitle}>利用者数：{employeeCount}人</Text>
      
      <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
        {selectedTools.map((tool, index) => {
          const monthlyCost = calculateMonthlyCost(tool);
          const userCost = Math.round(monthlyCost / employeeCount);
          
          return (
            <View key={tool.id} style={styles.tableRow}>
              <View style={styles.toolNameContainer}>
                <Text style={styles.toolName}>{tool.name}</Text>
              </View>
              <View style={styles.costContainer}>
                <Text style={styles.userCost}>¥{userCost}/人</Text>
                <Text style={styles.totalCost}>¥{monthlyCost.toLocaleString()}/月</Text>
              </View>
            </View>
          );
        })}
        
        {/* Lark Comparison Row */}
        <View style={styles.larkRow}>
          <View style={styles.larkInfo}>
            <Text style={styles.larkNote}>*Larkプランは4200円/人/月で全機能</Text>
          </View>
        </View>
      </ScrollView>

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>現在の合計コスト</Text>
          <Text style={styles.summaryValue}>¥{totalCurrentCost.toLocaleString()}/月</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Lark統合後のコスト</Text>
          <Text style={styles.larkCost}>¥{larkMonthlyCost.toLocaleString()}/月</Text>
        </View>
        <View style={[styles.summaryRow, styles.savingsRow]}>
          <Text style={styles.savingsLabel}>月間削減額</Text>
          <Text style={styles.savingsValue}>¥{(totalCurrentCost - larkMonthlyCost).toLocaleString()}/月</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: spacing.lg,
  },
  tableContainer: {
    maxHeight: 300,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  toolNameContainer: {
    flex: 1,
  },
  toolName: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  costContainer: {
    alignItems: 'flex-end',
  },
  userCost: {
    fontSize: 12,
    color: Colors.gray[600],
  },
  totalCost: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  larkRow: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  larkInfo: {
    backgroundColor: Colors.primary + '10',
    padding: spacing.sm,
    borderRadius: 6,
  },
  larkNote: {
    fontSize: 12,
    color: Colors.primary,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 2,
    borderTopColor: Colors.gray[300],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  summaryLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  larkCost: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  savingsRow: {
    backgroundColor: Colors.success + '10',
    marginHorizontal: -spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    marginTop: spacing.sm,
  },
  savingsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.success,
  },
  savingsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.success,
  },
});