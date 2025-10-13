import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/colors';
import { isDesktop, spacing } from '@/constants/responsive';

interface VisualCostComparisonProps {
  currentMonthlyCost: number;
  larkMonthlyCost: number;
  monthlySavings: number;
  annualSavings: number;
}

export const VisualCostComparison: React.FC<VisualCostComparisonProps> = ({
  currentMonthlyCost,
  larkMonthlyCost,
  monthlySavings,
  annualSavings,
}) => {
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
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
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
            <Text style={styles.barSubtitle}>複数ツール利用</Text>
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
            <Text style={styles.barTitle}>Lark</Text>
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
                colors={[Colors.primary, Colors.primary + 'DD']}
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
          colors={[Colors.success + '10', Colors.success + '20']}
          style={styles.savingsCard}
        >
          <View style={styles.savingsContent}>
            <View style={styles.savingsIcon}>
              <Text style={styles.savingsIconText}>💰</Text>
            </View>
            <View style={styles.savingsDetails}>
              <Text style={styles.savingsTitle}>月間削減額</Text>
              <View style={styles.savingsAmountContainer}>
                <Text style={styles.savingsAmount}>{formatCurrency(monthlySavings)}</Text>
                <Text style={styles.savingsUnit}>削減</Text>
              </View>
              <Text style={styles.savingsAnnual}>年間 {formatCurrency(annualSavings)} の削減効果</Text>
            </View>
            <View style={styles.savingsPercentage}>
              <Text style={styles.percentageValue}>{savingsPercentage.toFixed(1)}%</Text>
              <Text style={styles.percentageLabel}>削減</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Benefits */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>Lark導入のメリット</Text>
        <View style={styles.benefitsGrid}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🔄</Text>
            <Text style={styles.benefitText}>ツール統合</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⚡</Text>
            <Text style={styles.benefitText}>効率向上</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💡</Text>
            <Text style={styles.benefitText}>シンプル運用</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🛡️</Text>
            <Text style={styles.benefitText}>セキュリティ</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.98)',
    borderRadius: 24,
    padding: spacing.xl * 1.8,
    marginBottom: spacing.xl * 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    minHeight: 500,
    transform: [{ scale: 1.01 }],
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  sectionSubtitle: {
    fontSize: 18,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.xl * 1.5,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  comparisonContainer: {
    marginBottom: spacing.xl * 1.5,
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  barHeader: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  barTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: spacing.xs,
    letterSpacing: 0.3,
  },
  barSubtitle: {
    fontSize: 16,
    color: Colors.gray[600],
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  barWrapper: {
    marginBottom: spacing.xl,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.5)',
  },
  monthlyCost: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  monthlyLabel: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  annualCost: {
    fontSize: 18,
    color: Colors.gray[500],
    textAlign: 'center',
    marginTop: spacing.xs,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  vsContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
    backgroundColor: 'rgba(99, 102, 241, 0.05)',
    borderRadius: 50,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    borderWidth: 2,
    borderColor: 'rgba(99, 102, 241, 0.2)',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  vsText: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 1,
    textShadowColor: 'rgba(99, 102, 241, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: spacing.md,
  },
  arrow: {
    fontSize: 28,
    color: Colors.primary,
    textShadowColor: 'rgba(99, 102, 241, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  savingsContainer: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  savingsCard: {
    borderRadius: 20,
    padding: spacing.xl * 1.5,
    alignItems: 'center',
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    minHeight: 200,
    width: '100%',
  },
  savingsIcon: {
    marginBottom: spacing.lg,
  },
  savingsIconText: {
    fontSize: 48,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  savingsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: spacing.lg,
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  savingsAmountContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  savingsAmount: {
    fontSize: 42,
    fontWeight: '900',
    color: 'white',
    letterSpacing: -1,
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  savingsUnit: {
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: spacing.xs,
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  savingsAnnual: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.85)',
    fontWeight: '500',
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  savingsPercentage: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  percentageLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '600',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  benefitsContainer: {
    marginTop: spacing.xl,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.6)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  benefitsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
    letterSpacing: 0.3,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
    minWidth: '45%',
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  benefitText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '600',
    flex: 1,
    letterSpacing: 0.2,
  },
});