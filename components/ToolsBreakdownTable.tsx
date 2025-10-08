import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

interface ToolWithPrice {
  tool: {
    id: string;
    name: string;
    pricePerUser: number;
    planName?: string;
  };
  totalMonthlyCost: number;
}

interface ToolsBreakdownTableProps {
  selectedTools: ToolWithPrice[];
  larkPricePerUser: number;
  userCount: number;
}

export function ToolsBreakdownTable({ 
  selectedTools, 
  larkPricePerUser,
  userCount 
}: ToolsBreakdownTableProps) {
  const totalCurrentCost = selectedTools.reduce((sum, toolWithPrice) => sum + toolWithPrice.totalMonthlyCost, 0);
  const larkMonthlyCost = larkPricePerUser * userCount;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>現在のツール内訳</Text>
      <Text style={styles.subtitle}>利用者数：{userCount}人</Text>
      
      <ScrollView style={styles.tableContainer} showsVerticalScrollIndicator={false}>
        {selectedTools.map((toolWithPrice, index) => {
          return (
            <View key={toolWithPrice.tool.id} style={styles.tableRow}>
              <View style={styles.toolNameContainer}>
                <Text style={styles.toolName}>{toolWithPrice.tool.name}</Text>
                {toolWithPrice.tool.planName && (
                  <Text style={styles.planName}>{toolWithPrice.tool.planName}</Text>
                )}
              </View>
              <View style={styles.costContainer}>
                <Text style={styles.userCost}>¥{toolWithPrice.tool.pricePerUser.toLocaleString()}/人</Text>
                <Text style={styles.totalCost}>¥{toolWithPrice.totalMonthlyCost.toLocaleString()}/月</Text>
              </View>
            </View>
          );
        })}
        
        {/* Lark Comparison Row */}
        <View style={styles.larkRow}>
          <View style={styles.larkInfo}>
            <Text style={styles.larkNote}>*Larkプランは¥{larkPricePerUser.toLocaleString()}/人/月で全機能</Text>
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
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray[600],
    marginBottom: spacing.xl,
    textAlign: 'center',
    fontWeight: '500',
  },
  tableContainer: {
    maxHeight: 350,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    backgroundColor: Colors.gray[25],
    marginVertical: 2,
    paddingHorizontal: spacing.md,
    borderRadius: 8,
  },
  toolNameContainer: {
    flex: 1,
  },
  toolName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  planName: {
    fontSize: 14,
    color: Colors.gray[600],
    fontWeight: '500',
    marginTop: 2,
  },
  costContainer: {
    alignItems: 'flex-end',
  },
  userCost: {
    fontSize: 14,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  totalCost: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  larkRow: {
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  larkInfo: {
    backgroundColor: Colors.primary + '15',
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.primary + '30',
  },
  larkNote: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 2,
    borderTopColor: Colors.gray[300],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  summaryLabel: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  larkCost: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
  },
  savingsRow: {
    backgroundColor: Colors.success + '15',
    marginHorizontal: -spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: Colors.success + '30',
  },
  savingsLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.success,
  },
  savingsValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.success,
  },
})