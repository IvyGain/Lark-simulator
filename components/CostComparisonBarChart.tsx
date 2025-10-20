import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/colors';
import { spacing, responsive, isMobile, isTablet } from '../constants/responsive';

interface CostComparisonBarChartProps {
  currentAnnualCost: number;
  larkAnnualCost: number;
  annualSavings: number;
}

export function CostComparisonBarChart({
  currentAnnualCost,
  larkAnnualCost,
  annualSavings,
}: CostComparisonBarChartProps) {
  // Animation values
  const currentBarAnim = useRef(new Animated.Value(0)).current;
  const larkBarAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate bar heights based on the maximum value - responsive
  const maxValue = Math.max(currentAnnualCost, larkAnnualCost);
  const baseBarHeight = responsive(200, 230, 250); // Mobile: 200, Tablet: 230, Desktop: 250
  const currentBarHeight = (currentAnnualCost / maxValue) * baseBarHeight;
  const larkBarHeight = (larkAnnualCost / maxValue) * baseBarHeight;

  // Animate bars on mount
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(currentBarAnim, {
        toValue: currentBarHeight,
        duration: 1200,
        useNativeDriver: false,
      }),
      Animated.timing(larkBarAnim, {
        toValue: larkBarHeight,
        duration: 1400, // Slightly delayed for visual effect
        useNativeDriver: false,
      }),
    ]).start();
  }, [currentBarHeight, larkBarHeight]);

  // Render savings section
  const renderSavingsSection = () => (
    <View style={styles.arrowContainer}>
      <View style={styles.arrow} />
      <View style={styles.savingsBox}>
        <Text style={styles.savingsLabel}>年間削減額</Text>
        <Text style={styles.savingsValue}>{formatCurrency(annualSavings)}</Text>
        <Text style={styles.savingsPercentage}>
          {((annualSavings / currentAnnualCost) * 100).toFixed(1)}% 削減
        </Text>
      </View>
    </View>
  );

  // Render bar section
  const renderBarSection = (
    cost: number,
    animValue: Animated.Value,
    colors: readonly [string, string, ...string[]],
    label: string,
    badgeText: string,
    badgeStyle: any
  ) => (
    <View style={styles.barContainer}>
      <View style={styles.barWrapper}>
        <Animated.View style={[styles.bar, { height: animValue }]}>
          <LinearGradient
            colors={colors}
            style={[styles.barGradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          />
        </Animated.View>
        <Text style={styles.barValue}>{formatCurrency(cost)}</Text>
      </View>
      <Text style={styles.barLabel}>{label}</Text>
      <View style={badgeStyle}>
        <Text style={badgeStyle === styles.currentBadge ? styles.currentBadgeText : styles.larkBadgeText}>
          {badgeText}
        </Text>
      </View>
    </View>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>💰 年間コスト比較</Text>
      
      <View style={styles.chartContainer}>
        {/* Mobile layout: Savings first, then bars */}
        {isMobile && renderSavingsSection()}
        
        {/* Current Tools Bar */}
        {renderBarSection(
          currentAnnualCost,
          currentBarAnim,
          ['#FF6B6B', '#FF8E8E', '#FFA8A8'],
          '現在のツール',
          '現状',
          styles.currentBadge
        )}

        {/* Desktop/Tablet layout: Savings in the middle */}
        {!isMobile && renderSavingsSection()}

        {/* Lark Bar */}
        {renderBarSection(
          larkAnnualCost,
          larkBarAnim,
          [Colors.primary, '#7C3AED', '#9333EA'],
          'Lark導入後',
          '導入後',
          styles.larkBadge
        )}
      </View>

      {/* Cost Difference Highlight */}
      <View style={styles.differenceContainer}>
        <LinearGradient
          colors={[Colors.success, '#2E8B57', '#228B22']}
          style={styles.differenceGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.differenceText}>
            🎉 年間 {formatCurrency(annualSavings)} のコスト削減を実現
          </Text>
          <Text style={styles.differenceSubtext}>
            月額換算で {formatCurrency(annualSavings / 12)} の節約効果
          </Text>
        </LinearGradient>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: responsive(20, 22, 24), // Mobile: 20, Tablet: 22, Desktop: 24
    padding: spacing.xl,
    marginBottom: spacing.xl,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: responsive(8, 10, 12) }, // Responsive shadow
    shadowOpacity: 0.2,
    shadowRadius: responsive(16, 18, 20), // Responsive shadow radius
    elevation: responsive(8, 10, 12), // Responsive elevation
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  title: {
    fontSize: responsive(20, 22, 24), // Mobile: 20, Tablet: 22, Desktop: 24
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.xl,
    letterSpacing: 0.5,
  },
  chartContainer: {
    flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile
    alignItems: isMobile ? 'center' : 'flex-end',
    justifyContent: 'space-around',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    minHeight: responsive(280, 300, 320), // Mobile: 280, Tablet: 300, Desktop: 320
    gap: isMobile ? spacing.lg : 0, // Add gap for mobile vertical layout
  },
  barContainer: {
    alignItems: 'center',
    flex: isMobile ? 0 : 1, // Don't flex on mobile
    width: isMobile ? '100%' : 'auto', // Full width on mobile
    maxWidth: isMobile ? 200 : 'auto', // Limit width on mobile
  },
  barWrapper: {
    alignItems: 'center',
    marginBottom: spacing.md,
    flexDirection: isMobile ? 'row' : 'column', // Horizontal layout on mobile
    gap: isMobile ? spacing.md : 0,
  },
  bar: {
    width: responsive(60, 70, 80), // Mobile: 60, Tablet: 70, Desktop: 80
    borderRadius: responsive(8, 10, 12), // Responsive border radius
    marginBottom: isMobile ? 0 : spacing.sm, // No margin on mobile horizontal layout
    shadowColor: '#000',
    shadowOffset: { width: 0, height: responsive(4, 5, 6) },
    shadowOpacity: 0.25,
    shadowRadius: responsive(8, 10, 12),
    elevation: responsive(6, 7, 8),
  },
  barGradient: {
    borderRadius: responsive(8, 10, 12),
    width: '100%',
    height: '100%',
  },
  barValue: {
    fontSize: responsive(14, 15, 16), // Mobile: 14, Tablet: 15, Desktop: 16
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginTop: isMobile ? 0 : spacing.xs, // No margin on mobile horizontal layout
    marginLeft: isMobile ? spacing.sm : 0, // Left margin on mobile
  },
  barLabel: {
    fontSize: responsive(16, 17, 18), // Mobile: 16, Tablet: 17, Desktop: 18
    fontWeight: '700',
    color: Colors.gray[700],
    textAlign: 'center',
    letterSpacing: 0.3,
    marginBottom: spacing.xs,
  },
  currentBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: responsive(8, 10, 12), // Responsive padding
    paddingVertical: responsive(3, 4, 4),
    borderRadius: responsive(8, 10, 12),
  },
  currentBadgeText: {
    color: 'white',
    fontSize: responsive(10, 11, 12), // Mobile: 10, Tablet: 11, Desktop: 12
    fontWeight: '700',
  },
  larkBadge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: responsive(8, 10, 12),
    paddingVertical: responsive(3, 4, 4),
    borderRadius: responsive(8, 10, 12),
  },
  larkBadgeText: {
    color: 'white',
    fontSize: responsive(10, 11, 12),
    fontWeight: '700',
  },
  arrowContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: isMobile ? 0 : 1,
    paddingHorizontal: spacing.sm,
    width: isMobile ? '100%' : 'auto',
  },
  arrow: {
    width: 0,
    height: 0,
    borderLeftWidth: responsive(15, 17, 20), // Mobile: 15, Tablet: 17, Desktop: 20
    borderRightWidth: responsive(15, 17, 20),
    borderTopWidth: responsive(20, 22, 25),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.success,
    marginBottom: spacing.sm,
    transform: isMobile ? [{ rotate: '90deg' }] : [], // Rotate arrow on mobile
  },
  savingsBox: {
    backgroundColor: Colors.success + '15',
    borderRadius: responsive(12, 14, 16), // Mobile: 12, Tablet: 14, Desktop: 16
    padding: responsive(spacing.md, spacing.lg, spacing.lg), // Responsive padding
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.success + '30',
    minWidth: isMobile ? 150 : 'auto', // Minimum width on mobile
  },
  savingsLabel: {
    fontSize: responsive(12, 13, 14), // Mobile: 12, Tablet: 13, Desktop: 14
    fontWeight: '700',
    color: Colors.success,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  savingsValue: {
    fontSize: responsive(14, 15, 16), // Mobile: 14, Tablet: 15, Desktop: 16
    fontWeight: '800',
    color: Colors.success,
    textAlign: 'center',
    marginBottom: 2,
  },
  savingsPercentage: {
    fontSize: responsive(10, 11, 12), // Mobile: 10, Tablet: 11, Desktop: 12
    fontWeight: '600',
    color: Colors.success,
    textAlign: 'center',
  },
  differenceContainer: {
    borderRadius: responsive(16, 18, 20), // Mobile: 16, Tablet: 18, Desktop: 20
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: responsive(6, 7, 8) },
    shadowOpacity: 0.4,
    shadowRadius: responsive(12, 14, 16),
    elevation: responsive(8, 10, 12),
  },
  differenceGradient: {
    borderRadius: responsive(16, 18, 20),
    padding: responsive(spacing.lg, spacing.xl, spacing.xl), // Responsive padding
    alignItems: 'center',
  },
  differenceText: {
    fontSize: responsive(16, 18, 20), // Mobile: 16, Tablet: 18, Desktop: 20
    fontWeight: '800',
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
    marginBottom: spacing.xs,
  },
  differenceSubtext: {
    fontSize: responsive(12, 13, 14), // Mobile: 12, Tablet: 13, Desktop: 14
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});