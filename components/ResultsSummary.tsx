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
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      {/* Single Row Layout - 年間削減コスト2/4、ROI 1/4、投資回収期間1/4 */}
      <View style={styles.singleRowLayout}>
        {/* 年間削減コスト - 2/4 width */}
        <View style={styles.mainMetricCard}>
          <LinearGradient
            colors={[Colors.success, '#2E8B57']}
            style={styles.mainMetricGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.mainMetricIcon}>💰</Text>
            <Text style={styles.mainMetricLabel}>年間削減コスト</Text>
            <Text style={styles.mainMetricValue}>{formatCurrency(metrics.annualCostReduction)}</Text>
            <Text style={styles.mainMetricPercentage}>{metrics.reductionRate.toFixed(1)}%削減</Text>
          </LinearGradient>
        </View>

        {/* ROI - 1/4 width */}
        <View style={styles.secondaryMetricCard}>
          <LinearGradient
            colors={[Colors.primary + '15', Colors.primary + '25']}
            style={styles.secondaryMetricGradient}
          >
            <Text style={styles.secondaryMetricIcon}>📈</Text>
            <Text style={styles.secondaryMetricLabel}>ROI</Text>
            <Text style={styles.secondaryMetricValue}>{metrics.roi.toFixed(1)}%</Text>
          </LinearGradient>
        </View>

        {/* 投資回収期間 - 1/4 width */}
        <View style={styles.secondaryMetricCard}>
          <LinearGradient
            colors={[Colors.warning + '15', Colors.warning + '25']}
            style={styles.secondaryMetricGradient}
          >
            <Text style={styles.secondaryMetricIcon}>⏱️</Text>
            <Text style={styles.secondaryMetricLabel}>投資回収期間</Text>
            <Text style={styles.secondaryMetricValue}>{metrics.paybackPeriod.toFixed(1)}ヶ月</Text>
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
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: spacing.xl * 1.8,
    marginBottom: spacing.xl * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: Colors.gray[100],
    minHeight: 300,
    transform: [{ scale: 1.02 }],
  },
  singleRowLayout: {
    flexDirection: 'row',
    marginBottom: spacing.xl * 1.5,
    gap: spacing.md,
    alignItems: 'stretch',
  },
  mainMetricCard: {
    flex: 2, // 2/4 of the width
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  mainMetricGradient: {
    borderRadius: 18,
    padding: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  mainMetricIcon: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  mainMetricLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: spacing.sm,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mainMetricValue: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  mainMetricPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  secondaryMetricCard: {
    flex: 1, // 1/4 of the width
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  secondaryMetricGradient: {
    borderRadius: 18,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
  },
  secondaryMetricIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  secondaryMetricLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.xs,
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  secondaryMetricValue: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  impactStatement: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
    padding: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    minHeight: 100,
  },
  impactText: {
    fontSize: 18,
    lineHeight: 26,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  impactHighlight: {
    fontWeight: '800',
    color: Colors.primary,
    fontSize: 20,
    letterSpacing: 0.5,
  },
});