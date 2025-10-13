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
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
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
    minHeight: 450,
    transform: [{ scale: 1.02 }],
  },
  heroCard: {
    borderRadius: 20,
    padding: spacing.xl * 1.5,
    marginBottom: spacing.xl * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minHeight: 180,
  },
  heroLabel: {
    fontSize: 20,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: spacing.sm,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroAmount: {
    fontSize: 48,
    fontWeight: '900',
    color: 'white',
    textAlign: 'center',
    marginBottom: spacing.xs,
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroPercentage: {
    fontSize: 24,
    fontWeight: '800',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroIconText: {
    fontSize: 32,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  heroContent: {
    alignItems: 'center',
    flex: 1,
  },
  heroPercentageContainer: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  heroPercentageLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '600',
    textAlign: 'center',
  },
  heroIcon: {
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl * 1.5,
    gap: spacing.md,
  },
  metricCard: {
    flex: 1,
    borderRadius: 18,
    padding: spacing.lg * 1.2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minHeight: 140,
  },
  metricGradient: {
    borderRadius: 18,
    padding: spacing.lg * 1.2,
    alignItems: 'center',
    minHeight: 140,
  },
  metricIcon: {
    fontSize: 28,
    marginBottom: spacing.sm,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xs,
    textAlign: 'center',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
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