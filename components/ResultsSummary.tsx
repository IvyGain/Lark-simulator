import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

interface ResultsSummaryProps {
  annualSavings: number;
  savingsPercentage: number;
  roi: number;
  paybackPeriod: number;
}

export function ResultsSummary({ 
  annualSavings, 
  savingsPercentage, 
  roi, 
  paybackPeriod 
}: ResultsSummaryProps) {
  const formatCurrency = (amount: number) => `¥${amount.toLocaleString()}`;

  const metrics = [
    { label: '年間削減コスト', value: formatCurrency(annualSavings), highlight: true },
    { label: '削減率', value: `${Math.round(savingsPercentage)}%` },
    { label: 'ROI', value: `${Math.round(roi)}%` },
    { label: '投資回収期間', value: `${Math.round(paybackPeriod)}ヶ月` },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>リアルタイムシミュレーション結果</Text>
      <View style={styles.metricsContainer}>
        {metrics.map((metric, index) => (
          <View 
            key={index} 
            style={[
              styles.metricCard,
              metric.highlight && styles.highlightedCard
            ]}
          >
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={[
              styles.metricValue,
              metric.highlight && styles.highlightedValue
            ]}>
              {metric.value}
            </Text>
          </View>
        ))}
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
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  metricCard: {
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: spacing.xs,
    minWidth: '22%',
  },
  highlightedCard: {
    backgroundColor: Colors.success + '10',
    borderWidth: 1,
    borderColor: Colors.success + '30',
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.gray[700],
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.05)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  highlightedValue: {
    color: Colors.success,
    textShadowColor: 'rgba(34, 197, 94, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});