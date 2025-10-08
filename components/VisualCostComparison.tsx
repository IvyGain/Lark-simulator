import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

  // Animation values
  const currentBarHeight = useRef(new Animated.Value(0)).current;
  const larkBarHeight = useRef(new Animated.Value(0)).current;
  const savingsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate bars
    Animated.sequence([
      Animated.timing(currentBarHeight, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(larkBarHeight, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(savingsOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate bar heights for visualization
  const maxBarHeight = isDesktop ? 200 : 160;
  const currentHeight = maxBarHeight;
  const larkHeight = currentMonthlyCost > 0 ? (larkMonthlyCost / currentMonthlyCost) * maxBarHeight : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>コスト比較分析</Text>
      <Text style={styles.sectionSubtitle}>現在のツールコストとLark導入後の比較</Text>
      
      <View style={styles.comparisonContainer}>
        {/* Current Tools Cost Bar */}
        <View style={styles.barColumn}>
          <View style={styles.barHeader}>
            <Text style={styles.barTitle}>現在のツール</Text>
            <Text style={styles.barSubtitle}>{selectedTools.length}個のツール</Text>
          </View>
          
          <View style={styles.barContainer}>
            <Animated.View
              style={[
                styles.barWrapper,
                {
                  height: currentBarHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, currentHeight],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={['#FF6B6B', '#FF5252']}
                style={styles.currentBar}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </Animated.View>
            <View style={styles.barLabels}>
              <Text style={styles.monthlyCost}>{formatCurrency(currentMonthlyCost)}</Text>
              <Text style={styles.monthlyLabel}>月額</Text>
              <Text style={styles.annualCost}>年間 {formatCurrency(currentMonthlyCost * 12)}</Text>
            </View>
          </View>
        </View>

        {/* VS Indicator */}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>→</Text>
          </View>
        </View>

        {/* Lark Cost Bar */}
        <View style={styles.barColumn}>
          <View style={styles.barHeader}>
            <Text style={styles.barTitle}>Lark統合後</Text>
            <Text style={styles.barSubtitle}>オールインワン</Text>
          </View>
          
          <View style={styles.barContainer}>
            <Animated.View
              style={[
                styles.barWrapper,
                {
                  height: larkBarHeight.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, larkHeight],
                  }),
                },
              ]}
            >
              <LinearGradient
                colors={[Colors.primary, '#00A693']}
                style={styles.larkBar}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
            </Animated.View>
            <View style={styles.barLabels}>
              <Text style={styles.monthlyCost}>{formatCurrency(larkMonthlyCost)}</Text>
              <Text style={styles.monthlyLabel}>月額</Text>
              <Text style={styles.annualCost}>年間 {formatCurrency(larkMonthlyCost * 12)}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Savings Highlight */}
      <Animated.View style={[styles.savingsContainer, { opacity: savingsOpacity }]}>
        <LinearGradient
          colors={[Colors.success + '20', Colors.success + '30']}
          style={styles.savingsCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.savingsContent}>
            <View style={styles.savingsIcon}>
              <Text style={styles.savingsIconText}>💡</Text>
            </View>
            <View style={styles.savingsDetails}>
              <Text style={styles.savingsTitle}>削減効果</Text>
              <View style={styles.savingsAmountContainer}>
                <Text style={styles.savingsAmount}>{formatCurrency(monthlySavings)}</Text>
                <Text style={styles.savingsUnit}>月間削減</Text>
              </View>
              <Text style={styles.savingsAnnual}>年間 {formatCurrency(annualSavings)} の削減</Text>
            </View>
            <View style={styles.savingsPercentage}>
              <Text style={styles.percentageValue}>{Math.round(savingsPercentage)}%</Text>
              <Text style={styles.percentageLabel}>削減</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Key Benefits */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Lark導入のメリット</Text>
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🔄</Text>
            <Text style={styles.benefitText}>ツール統合</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💰</Text>
            <Text style={styles.benefitText}>コスト削減</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⚡</Text>
            <Text style={styles.benefitText}>効率向上</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🤝</Text>
            <Text style={styles.benefitText}>連携強化</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  sectionTitle: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  comparisonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    minHeight: isDesktop ? 280 : 240,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  barTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  barSubtitle: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
  },
  barContainer: {
    alignItems: 'center',
    width: '100%',
  },
  barWrapper: {
    width: isDesktop ? 80 : 60,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  currentBar: {
    flex: 1,
    width: '100%',
  },
  larkBar: {
    flex: 1,
    width: '100%',
  },
  barLabels: {
    alignItems: 'center',
  },
  monthlyCost: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  monthlyLabel: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.gray[600],
    marginBottom: spacing.xs,
  },
  annualCost: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[700],
    fontWeight: '500',
  },
  vsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
  },
  vsText: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.sm,
  },
  arrowContainer: {
    backgroundColor: Colors.primary + '20',
    borderRadius: 20,
    padding: spacing.sm,
  },
  arrow: {
    fontSize: isDesktop ? 24 : 20,
    color: Colors.primary,
  },
  savingsContainer: {
    marginBottom: spacing.xl,
  },
  savingsCard: {
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: Colors.success + '30',
  },
  savingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsIcon: {
    marginRight: spacing.md,
  },
  savingsIconText: {
    fontSize: isDesktop ? 40 : 32,
  },
  savingsDetails: {
    flex: 1,
  },
  savingsTitle: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.success,
    marginBottom: spacing.xs,
  },
  savingsAmountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xs,
  },
  savingsAmount: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: 'bold',
    color: Colors.success,
    marginRight: spacing.xs,
  },
  savingsUnit: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.success,
    fontWeight: '500',
  },
  savingsAnnual: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[700],
  },
  savingsPercentage: {
    alignItems: 'center',
    backgroundColor: Colors.success,
    borderRadius: 12,
    padding: spacing.md,
    minWidth: isDesktop ? 80 : 70,
  },
  percentageValue: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  percentageLabel: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.white,
    fontWeight: '600',
  },
  benefitsContainer: {
    marginTop: spacing.lg,
  },
  benefitsTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  benefitsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  benefitItem: {
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },
  benefitIcon: {
    fontSize: isDesktop ? 28 : 24,
    marginBottom: spacing.xs,
  },
  benefitText: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
});