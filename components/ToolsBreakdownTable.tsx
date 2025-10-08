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
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: spacing.xl * 1.8,
    marginBottom: spacing.lg * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    minHeight: 450,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: Colors.gray[600],
    marginBottom: spacing.xl * 1.5,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  tableContainer: {
    maxHeight: 500,
    backgroundColor: 'rgba(248, 250, 252, 0.5)',
    borderRadius: 16,
    padding: spacing.md,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.6)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 4,
    paddingHorizontal: spacing.lg,
    borderRadius: 16,
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  toolNameContainer: {
    flex: 1,
  },
  toolName: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: 0.3,
  },
  planName: {
    fontSize: 16,
    color: Colors.gray[600],
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: 0.2,
  },
  costContainer: {
    alignItems: 'flex-end',
  },
  userCost: {
    fontSize: 16,
    color: Colors.gray[600],
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  totalCost: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 0.3,
  },
  larkRow: {
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.6)',
  },
  larkInfo: {
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
    padding: spacing.lg,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.3)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  larkNote: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  summaryContainer: {
    marginTop: spacing.xl,
    paddingTop: spacing.xl,
    borderTopWidth: 2,
    borderTopColor: 'rgba(226, 232, 240, 0.8)',
    backgroundColor: 'rgba(248, 250, 252, 0.5)',
    borderRadius: 16,
    padding: spacing.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    minHeight: 60,
  },
  summaryLabel: {
    fontSize: 20,
    color: Colors.text,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: 0.3,
  },
  larkCost: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 0.3,
  },
  savingsRow: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderRadius: 20,
    marginTop: spacing.lg,
    borderWidth: 2,
    borderColor: 'rgba(34, 197, 94, 0.3)',
    minHeight: 80,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  savingsLabel: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.success,
    letterSpacing: 0.5,
  },
  savingsValue: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.success,
    letterSpacing: 0.5,
  },
})