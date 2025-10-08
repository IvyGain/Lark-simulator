import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/colors';
import { spacing, isDesktop } from '../constants/responsive';

interface SummaryMetrics {
  annualCostReduction: number;
  reductionRate: number;
  roi: number;
  paybackPeriod: number;
}

interface ResultsSummaryProps {
  metrics: SummaryMetrics;
  companyName?: string;
  employeeCount: number;
}

export function ResultsSummary({
  metrics,
  companyName,
  employeeCount,
}: ResultsSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      {/* Hero Section - 年間削減額を最も大きく表示 */}
      <LinearGradient
        colors={[Colors.success, '#2E8B57']}
        style={styles.heroCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroContent}>
          <Text style={styles.heroLabel}>年間削減コスト</Text>
          <Text style={styles.heroAmount}>{formatCurrency(metrics.annualCostReduction)}</Text>
          <View style={styles.heroPercentageContainer}>
            <Text style={styles.heroPercentage}>{metrics.reductionRate.toFixed(1)}%</Text>
            <Text style={styles.heroPercentageLabel}>削減</Text>
          </View>
        </View>
        <View style={styles.heroIcon}>
          <Text style={styles.heroIconText}>💰</Text>
        </View>
      </LinearGradient>

      {/* Secondary Metrics Grid */}
      <View style={styles.metricsGrid}>
        <View style={styles.metricCard}>
          <LinearGradient
            colors={[Colors.primary + '15', Colors.primary + '25']}
            style={styles.metricGradient}
          >
            <Text style={styles.metricIcon}>📈</Text>
            <Text style={styles.metricLabel}>ROI</Text>
            <Text style={styles.metricValue}>{metrics.roi.toFixed(1)}%</Text>
          </LinearGradient>
        </View>

        <View style={styles.metricCard}>
          <LinearGradient
            colors={[Colors.warning + '15', Colors.warning + '25']}
            style={styles.metricGradient}
          >
            <Text style={styles.metricIcon}>⏱️</Text>
            <Text style={styles.metricLabel}>投資回収期間</Text>
            <Text style={styles.metricValue}>{metrics.paybackPeriod.toFixed(1)}ヶ月</Text>
          </LinearGradient>
        </View>
      </View>

      {/* Impact Statement */}
      <View style={styles.impactStatement}>
        <Text style={styles.impactText}>
          {companyName ? `${companyName}では` : `${employeeCount}名規模の組織では`}、Larkの導入により年間で<Text style={styles.impactHighlight}>{formatCurrency(metrics.annualCostReduction)}</Text>のコスト削減を実現
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  heroCard: {
    borderRadius: 20,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    minHeight: isDesktop ? 160 : 140,
  },
  heroContent: {
    flex: 1,
  },
  heroLabel: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: spacing.sm,
    opacity: 0.9,
  },
  heroAmount: {
    fontSize: isDesktop ? 42 : 36,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: spacing.md,
    letterSpacing: -1,
  },
  heroPercentageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heroPercentage: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginRight: spacing.xs,
  },
  heroPercentageLabel: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.white,
    opacity: 0.9,
  },
  heroIcon: {
    marginLeft: spacing.lg,
  },
  heroIconText: {
    fontSize: isDesktop ? 64 : 56,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  metricCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 6,
  },
  metricGradient: {
    padding: spacing.lg,
    alignItems: 'center',
    minHeight: isDesktop ? 120 : 100,
    justifyContent: 'center',
  },
  metricIcon: {
    fontSize: isDesktop ? 32 : 28,
    marginBottom: spacing.sm,
  },
  metricLabel: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  metricValue: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  impactStatement: {
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: spacing.lg,
    borderLeftWidth: 4,
    borderLeftColor: Colors.success,
  },
  impactText: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: isDesktop ? 28 : 24,
  },
  impactHighlight: {
    fontWeight: 'bold',
    color: Colors.success,
  },
});