import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop, spacing } from '@/constants/responsive';
import { LARK_PRICE_PER_USER } from '@/constants/tools';

interface VisualCostComparisonProps {
  currentMonthlyCost: number;
  employeeCount: number;
  selectedTools: Array<{ toolId: string; monthlyFee: number }>;
}

export const VisualCostComparison: React.FC<VisualCostComparisonProps> = ({
  currentMonthlyCost,
  employeeCount,
  selectedTools,
}) => {
  const larkMonthlyCost = LARK_PRICE_PER_USER * employeeCount;
  const monthlySavings = currentMonthlyCost - larkMonthlyCost;
  const annualSavings = monthlySavings * 12;
  const savingsPercentage = currentMonthlyCost > 0 ? (monthlySavings / currentMonthlyCost) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // チャートの高さを計算（最大値を基準にスケール）
  const maxCost = Math.max(currentMonthlyCost, larkMonthlyCost);
  const currentHeight = maxCost > 0 ? (currentMonthlyCost / maxCost) * 200 : 0;
  const larkHeight = maxCost > 0 ? (larkMonthlyCost / maxCost) * 200 : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>コスト比較</Text>
      <Text style={styles.subtitle}>{employeeCount}人の利用者で計算</Text>

      {/* バーチャート */}
      <View style={styles.chartContainer}>
        <View style={styles.chartArea}>
          {/* 現在のツール */}
          <View style={styles.barContainer}>
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  styles.currentBar,
                  { height: currentHeight }
                ]} 
              />
            </View>
            <Text style={styles.barLabel}>現在のツール</Text>
            <Text style={styles.barAmount}>{formatCurrency(currentMonthlyCost)}</Text>
            <Text style={styles.barPeriod}>(年間 {formatCurrency(currentMonthlyCost * 12)})</Text>
          </View>

          {/* Lark */}
          <View style={styles.barContainer}>
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  styles.larkBar,
                  { height: larkHeight }
                ]} 
              />
            </View>
            <Text style={styles.barLabel}>Larkに統合</Text>
            <Text style={styles.barAmount}>{formatCurrency(larkMonthlyCost)}</Text>
            <Text style={styles.barPeriod}>(年間 {formatCurrency(larkMonthlyCost * 12)})</Text>
          </View>
        </View>
      </View>

      {/* 削減効果の強調表示 */}
      {monthlySavings > 0 && (
        <View style={styles.savingsContainer}>
          <View style={styles.savingsCard}>
            <Text style={styles.savingsLabel}>年間削減額</Text>
            <Text style={styles.savingsAmount}>{formatCurrency(annualSavings)}</Text>
            <Text style={styles.savingsSubtext}>月間 {formatCurrency(monthlySavings)}</Text>
            <View style={styles.savingsPercentage}>
              <Text style={styles.savingsPercentageText}>{Math.round(savingsPercentage)}%</Text>
              <Text style={styles.savingsPercentageLabel}>削減</Text>
            </View>
          </View>
        </View>
      )}

      {/* 現在のツール内訳 */}
      <View style={styles.breakdownContainer}>
        <Text style={styles.breakdownTitle}>現在のツール内訳</Text>
        <Text style={styles.breakdownSubtitle}>利用者数: {employeeCount}人</Text>
        
        {selectedTools.map((tool, index) => (
          <View key={index} style={styles.toolItem}>
            <Text style={styles.toolName}>{tool.toolId}</Text>
            <View style={styles.toolCost}>
              <Text style={styles.toolPrice}>
                {formatCurrency(tool.monthlyFee * employeeCount)}
              </Text>
              <Text style={styles.toolPriceUnit}>
                ¥{tool.monthlyFee.toLocaleString()}/人
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.larkPromotion}>
          <Text style={styles.larkPromotionText}>
            *Larkプラン: {LARK_PRICE_PER_USER.toLocaleString()}円/人/月で実現
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: isDesktop ? 32 : 24,
    marginVertical: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  title: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: '800',
    color: Colors.gray[900],
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: isDesktop ? 60 : 40,
    height: 280,
  },
  barContainer: {
    alignItems: 'center',
    width: isDesktop ? 120 : 100,
  },
  barWrapper: {
    height: 200,
    justifyContent: 'flex-end',
    marginBottom: spacing.md,
  },
  bar: {
    width: isDesktop ? 80 : 60,
    borderRadius: isDesktop ? 12 : 8,
    minHeight: 20,
  },
  currentBar: {
    backgroundColor: Colors.gray[700] as string,
  },
  larkBar: {
    backgroundColor: Colors.primary,
  },
  barLabel: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.gray[700],
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  barAmount: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.gray[900],
    textAlign: 'center',
  },
  barPeriod: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[500],
    textAlign: 'center',
    marginTop: 2,
  },
  savingsContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  savingsCard: {
    backgroundColor: Colors.success + '10',
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.success + '30',
    minWidth: isDesktop ? 300 : 280,
  },
  savingsLabel: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.success,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  savingsAmount: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: '800',
    color: Colors.success,
    marginBottom: spacing.xs,
  },
  savingsSubtext: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginBottom: spacing.sm,
  },
  savingsPercentage: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    alignItems: 'center',
  },
  savingsPercentageText: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '800',
    color: Colors.white,
  },
  savingsPercentageLabel: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.white,
    fontWeight: '600',
  },
  breakdownContainer: {
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 12,
    padding: spacing.lg,
  },
  breakdownTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: spacing.xs,
  },
  breakdownSubtitle: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginBottom: spacing.md,
  },
  toolItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  toolName: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '500',
    color: Colors.gray[800],
    flex: 1,
  },
  toolCost: {
    alignItems: 'flex-end',
  },
  toolPrice: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  toolPriceUnit: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[500],
  },
  larkPromotion: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.primary + '30',
    alignItems: 'center',
  },
  larkPromotionText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});