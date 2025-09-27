import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import { CalculationResult } from '@/store/advanced-simulator-store';

interface AdvancedCostComparisonProps {
  result: CalculationResult;
  employeeCount: number;
}

export const AdvancedCostComparison: React.FC<AdvancedCostComparisonProps> = ({
  result,
  employeeCount,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ja-JP').format(Math.round(num));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>コスト比較結果</Text>
      
      {/* メインの比較グラフ */}
      <View style={styles.comparisonSection}>
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>現在のコスト</Text>
          <Text style={styles.currentCost}>{formatCurrency(result.currentAnnualCost)}</Text>
          <Text style={styles.costPeriod}>年間</Text>
        </View>
        
        <View style={styles.arrowContainer}>
          <View style={styles.arrow} />
          <Text style={styles.arrowText}>Lark導入</Text>
        </View>
        
        <View style={styles.costItem}>
          <Text style={styles.costLabel}>Lark導入後</Text>
          <Text style={styles.larkCost}>{formatCurrency(result.larkAnnualCost)}</Text>
          <Text style={styles.costPeriod}>年間</Text>
        </View>
      </View>

      {/* 節約額とパーセンテージ */}
      <View style={styles.savingsContainer}>
        <View style={styles.savingsBox}>
          <Text style={styles.savingsAmount}>{formatCurrency(result.annualSavings)}</Text>
          <Text style={styles.savingsLabel}>年間節約額</Text>
        </View>
        <View style={styles.savingsBox}>
          <Text style={styles.savingsPercentage}>{formatPercentage(result.savingsPercentage)}</Text>
          <Text style={styles.savingsLabel}>コスト削減率</Text>
        </View>
      </View>

      {/* 詳細指標 */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatNumber(result.laborHoursSaved)}</Text>
          <Text style={styles.metricUnit}>時間/年</Text>
          <Text style={styles.metricLabel}>工数削減</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatCurrency(result.laborCostSaved)}</Text>
          <Text style={styles.metricUnit}>年間</Text>
          <Text style={styles.metricLabel}>人件費削減</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatPercentage(result.roi)}</Text>
          <Text style={styles.metricUnit}>ROI</Text>
          <Text style={styles.metricLabel}>投資収益率</Text>
        </View>
        
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>{formatNumber(result.paybackPeriod)}</Text>
          <Text style={styles.metricUnit}>ヶ月</Text>
          <Text style={styles.metricLabel}>投資回収期間</Text>
        </View>
      </View>

      {/* 1人あたりの内訳 */}
      <View style={styles.breakdown}>
        <Text style={styles.breakdownTitle}>1人あたりの月額コスト内訳</Text>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>現在のコスト</Text>
          <Text style={styles.breakdownValue}>
            {formatCurrency(result.currentMonthlyCost / employeeCount)}
          </Text>
        </View>
        <View style={styles.breakdownRow}>
          <Text style={styles.breakdownLabel}>Larkコスト</Text>
          <Text style={styles.breakdownValue}>
            {formatCurrency(result.larkMonthlyCost / employeeCount)}
          </Text>
        </View>
        <View style={[styles.breakdownRow, styles.breakdownSavings]}>
          <Text style={styles.breakdownLabel}>1人あたり節約額</Text>
          <Text style={styles.breakdownSavingsValue}>
            {formatCurrency(result.monthlySavings / employeeCount)}
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
    padding: isDesktop ? 24 : 20,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 24,
    textAlign: 'center',
  },
  comparisonSection: {
    flexDirection: isDesktop ? 'row' : 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  costItem: {
    alignItems: 'center',
    flex: isDesktop ? 1 : undefined,
  },
  costLabel: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    marginBottom: 8,
  },
  currentCost: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: '700',
    color: Colors.error,
  },
  larkCost: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: '700',
    color: Colors.primary,
  },
  costPeriod: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[500],
    marginTop: 4,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: isDesktop ? 0 : 16,
    marginHorizontal: isDesktop ? 16 : 0,
  },
  arrow: {
    width: isDesktop ? 40 : 30,
    height: 2,
    backgroundColor: Colors.primary,
    marginBottom: 4,
  },
  arrowText: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.primary,
    fontWeight: '500',
  },
  savingsContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  savingsBox: {
    flex: 1,
    backgroundColor: Colors.primary + '10',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  savingsAmount: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  savingsPercentage: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: '700',
    color: Colors.primary,
  },
  savingsLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginTop: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  metricCard: {
    width: isDesktop ? 'calc(25% - 9px)' : 'calc(50% - 6px)',
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.gray[900],
  },
  metricUnit: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.gray[500],
    marginTop: 2,
  },
  metricLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginTop: 4,
    textAlign: 'center',
  },
  breakdown: {
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 12,
    padding: 16,
  },
  breakdownTitle: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: 12,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  breakdownLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
  },
  breakdownValue: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '500',
    color: Colors.gray[900],
  },
  breakdownSavings: {
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
    marginTop: 8,
    paddingTop: 12,
  },
  breakdownSavingsValue: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.primary,
  },
});