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
    marginBottom: spacing.xxl, // Increased spacing
    transform: [{ scale: 1.02 }], // Slightly larger overall
  },
  heroCard: {
    borderRadius: 24, // Increased from 20
    padding: spacing.xxl + 8, // Increased padding significantly
    marginBottom: spacing.xl, // Increased from lg
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 12 }, // Enhanced shadow
    shadowOpacity: 0.4, // Increased from 0.3
    shadowRadius: 24, // Increased from 16
    elevation: 16, // Increased from 12
    minHeight: isDesktop ? 200 : 180, // Increased from 160/140
  },
  heroContent: {
    flex: 1,
  },
  heroLabel: {
    fontSize: isDesktop ? 24 : 22, // Increased from 20/18
    fontWeight: '700', // Increased from '600'
    color: Colors.white,
    marginBottom: spacing.md, // Increased from sm
    opacity: 0.95, // Slightly more opaque
  },
  heroAmount: {
    fontSize: isDesktop ? 52 : 46, // Significantly increased from 42/36
    fontWeight: '900',
    color: Colors.white,
    marginBottom: spacing.lg, // Increased from md
    letterSpacing: -1.5, // Slightly more negative spacing
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroPercentageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  heroPercentage: {
    fontSize: isDesktop ? 38 : 34, // Increased from 32/28
    fontWeight: '900', // Increased from 'bold'
    color: Colors.white,
    marginRight: spacing.sm, // Increased from xs
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  heroPercentageLabel: {
    fontSize: isDesktop ? 22 : 20, // Increased from 18/16
    fontWeight: '700', // Increased from '600'
    color: Colors.white,
    opacity: 0.95, // Slightly more opaque
  },
  heroIcon: {
    marginLeft: spacing.xl, // Increased from lg
  },
  heroIconText: {
    fontSize: isDesktop ? 80 : 72, // Significantly increased from 64/56
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    gap: spacing.lg, // Increased from md
    marginBottom: spacing.xl, // Increased from lg
  },
  metricCard: {
    flex: 1,
    borderRadius: 20, // Increased from 16
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 }, // Enhanced shadow
    shadowOpacity: 0.15, // Increased from 0.1
    shadowRadius: 12, // Increased from 8
    elevation: 8, // Increased from 6
    transform: [{ scale: 1.01 }], // Slightly larger
  },
  metricGradient: {
    padding: spacing.xl, // Increased from lg
    alignItems: 'center',
    minHeight: isDesktop ? 140 : 120, // Increased from 120/100
    justifyContent: 'center',
  },
  metricIcon: {
    fontSize: isDesktop ? 40 : 36, // Increased from 32/28
    marginBottom: spacing.md, // Increased from sm
  },
  metricLabel: {
    fontSize: isDesktop ? 18 : 16, // Increased from 16/14
    fontWeight: '700', // Increased from '600'
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm, // Increased from xs
  },
  metricValue: {
    fontSize: isDesktop ? 32 : 28, // Increased from 28/24
    fontWeight: '900', // Increased from 'bold'
    color: Colors.text,
    textAlign: 'center',
  },
  impactStatement: {
    backgroundColor: Colors.gray[50],
    borderRadius: 16, // Increased from 12
    padding: spacing.xl, // Increased from lg
    borderLeftWidth: 6, // Increased from 4
    borderLeftColor: Colors.success,
    shadowColor: Colors.gray[300],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  impactText: {
    fontSize: isDesktop ? 20 : 18, // Increased from 18/16
    fontWeight: '600', // Increased from '500'
    color: Colors.text,
    textAlign: 'center',
    lineHeight: isDesktop ? 32 : 28, // Increased from 28/24
  },
  impactHighlight: {
    fontWeight: '900', // Increased from 'bold'
    color: Colors.success,
    fontSize: isDesktop ? 22 : 20, // Slightly larger than base text
  },
});