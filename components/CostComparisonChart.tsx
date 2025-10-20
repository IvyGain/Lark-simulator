import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/colors';
import { spacing, isDesktop } from '../constants/responsive';
import { tools } from '@/constants/tools';

interface SelectedToolPlan {
  toolId: string;
  planIndex: number;
}

interface CostComparisonChartProps {
  selectedTools: SelectedToolPlan[];
  employeeCount: number;
  larkCost: number;
  savingsAmount: number;
  savingsPercentage: number;
}

export function CostComparisonChart({
  selectedTools,
  employeeCount,
  larkCost,
  savingsAmount,
  savingsPercentage
}: CostComparisonChartProps) {
  const formatCurrency = (amount: number) => {
    if (isNaN(amount) || amount === null || amount === undefined) {
      return '¥0';
    }
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate total current monthly cost
  const totalCurrentMonthlyCost = selectedTools.reduce((total, selectedTool) => {
    const tool = tools.find(t => t.id === selectedTool.toolId);
    if (tool && tool.pricingPlans && tool.pricingPlans[selectedTool.planIndex]) {
      const plan = tool.pricingPlans[selectedTool.planIndex];
      return total + (plan.pricePerUser * employeeCount);
    }
    return total;
  }, 0);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <Text style={styles.mainTitle}>コスト比較分析</Text>
        <Text style={styles.subtitle}>現在のツールコストとLark導入後の詳細比較</Text>
      </View>

      {/* Summary Section */}
      <View style={styles.summaryContainer}>
        <LinearGradient
          colors={[Colors.success, Colors.success + 'DD']}
          style={styles.savingsCard}
        >
          <View style={styles.savingsContent}>
            <Text style={styles.savingsIcon}>💰</Text>
            <View style={styles.savingsDetails}>
              <Text style={styles.savingsLabel}>年間削減額</Text>
              <Text style={styles.savingsAmount}>{formatCurrency(savingsAmount)}</Text>
            </View>
            <View style={styles.savingsPercentageContainer}>
              <Text style={styles.savingsPercentage}>{savingsPercentage.toFixed(1)}%</Text>
              <Text style={styles.savingsPercentageLabel}>削減</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Comparison Section */}
      <View style={styles.comparisonSection}>
        {/* Left Side - Current Tools */}
        <View style={styles.leftSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>現在のツール</Text>
            <Text style={styles.sectionSubtitle}>{selectedTools.length}個のツールを利用中</Text>
          </View>

          <View style={styles.toolsListContainer}>
            {selectedTools.map((selectedTool) => {
              const tool = tools.find(t => t.id === selectedTool.toolId);
              if (!tool || !tool.pricingPlans || !tool.pricingPlans[selectedTool.planIndex]) {
                return null;
              }
              
              const plan = tool.pricingPlans[selectedTool.planIndex];
              const toolTotalCost = plan.pricePerUser * employeeCount;
              
              return (
                <View key={`${tool.id}-${selectedTool.planIndex}`} style={styles.toolRow}>
                  <View style={styles.toolInfo}>
                    <Text style={styles.toolName}>{tool.name}</Text>
                    <Text style={styles.toolUserCost}>
                      {formatCurrency(plan.pricePerUser)}/人/月 × {employeeCount}人
                    </Text>
                  </View>
                  <View style={styles.toolCostInfo}>
                    <Text style={styles.toolTotalCost}>{formatCurrency(toolTotalCost)}</Text>
                    <Text style={styles.toolMonthlyCost}>月額</Text>
                  </View>
                </View>
              );
            })}
          </View>

          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>合計月額コスト</Text>
            <Text style={styles.totalAmount}>{formatCurrency(totalCurrentMonthlyCost)}</Text>
            <Text style={styles.totalAnnual}>年間 {formatCurrency(totalCurrentMonthlyCost * 12)}</Text>
          </View>
        </View>

        {/* Right Side - Lark Plan Details */}
        <View style={styles.rightSection}>
          <LinearGradient
            colors={[Colors.primary + '10', Colors.primary + '20']}
            style={styles.larkPlanContainer}
          >
            <View style={styles.larkPlanHeader}>
              <Text style={styles.larkPlanIcon}>🚀</Text>
              <View style={styles.larkPlanInfo}>
                <Text style={styles.larkPlanTitle}>Larkプラン</Text>
                <Text style={styles.larkPlanTagline}>全機能統合プラットフォーム</Text>
              </View>
            </View>

            <View style={styles.larkPricingSection}>
              <Text style={styles.larkPlanPrice}>{formatCurrency(larkCost)}</Text>
              <Text style={styles.larkPlanPriceUnit}>月額</Text>
              <Text style={styles.larkPlanPriceSubtext}>年間 {formatCurrency(larkCost * 12)}</Text>
            </View>

            {/* Lark Features Showcase */}
            <View style={styles.larkFeaturesContainer}>
              <Text style={styles.larkFeaturesTitle}>統合される機能</Text>
              
              <View style={styles.larkIconsRow}>
                {[
                  { icon: '💬', label: 'チャット' },
                  { icon: '📄', label: 'ドキュメント' },
                  { icon: '📹', label: 'ビデオ会議' }
                ].map((feature, index) => (
                  <React.Fragment key={`feature-row1-${index}`}>
                    <View style={styles.larkIconGroup}>
                      <Text style={styles.larkFeatureIcon}>{feature.icon}</Text>
                      <Text style={styles.larkFeatureLabel}>{feature.label}</Text>
                    </View>
                    {index < 2 && <Text style={styles.larkPlusIcon}>+</Text>}
                  </React.Fragment>
                ))}
              </View>

              <View style={styles.larkIconsRow}>
                {[
                  { icon: '🤖', label: 'AI議事録' },
                  { icon: '📅', label: 'カレンダー' },
                  { icon: '📧', label: 'メール' }
                ].map((feature, index) => (
                  <React.Fragment key={`feature-row2-${index}`}>
                    <View style={styles.larkIconGroup}>
                      <Text style={styles.larkFeatureIcon}>{feature.icon}</Text>
                      <Text style={styles.larkFeatureLabel}>{feature.label}</Text>
                    </View>
                    {index < 2 && <Text style={styles.larkPlusIcon}>+</Text>}
                  </React.Fragment>
                ))}
              </View>

              <View style={styles.larkEqualsContainer}>
                <Text style={styles.larkEqualsSign}>=</Text>
                <View style={styles.larkLogoContainer}>
                  <Text style={styles.larkLogo}>🐦 Lark</Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </View>

      {/* Impact Statement */}
      <View style={styles.impactContainer}>
        <LinearGradient
          colors={[Colors.warning + '15', Colors.warning + '25']}
          style={styles.impactCard}
        >
          <Text style={styles.impactIcon}>⚡</Text>
          <View style={styles.impactContent}>
            <Text style={styles.impactTitle}>導入効果</Text>
            <Text style={styles.impactDescription}>
              {selectedTools.length}個のツールを1つに統合し、年間{formatCurrency(savingsAmount)}のコスト削減を実現
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
}

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
  headerSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  mainTitle: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
  },
  summaryContainer: {
    marginBottom: spacing.xl,
  },
  savingsCard: {
    borderRadius: 16,
    padding: spacing.lg,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  savingsContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  savingsIcon: {
    fontSize: isDesktop ? 48 : 40,
    marginRight: spacing.md,
  },
  savingsDetails: {
    flex: 1,
  },
  savingsLabel: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.white,
    marginBottom: spacing.xs,
    opacity: 0.9,
  },
  savingsAmount: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: '900',
    color: Colors.white,
  },
  savingsPercentageContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: spacing.md,
    minWidth: isDesktop ? 80 : 70,
  },
  savingsPercentage: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  savingsPercentageLabel: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.white,
    fontWeight: '600',
  },
  comparisonSection: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  leftSection: {
    flex: 1,
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: spacing.lg,
  },
  rightSection: {
    flex: 1,
  },
  sectionHeader: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
  },
  toolsListContainer: {
    marginBottom: spacing.lg,
  },
  toolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  toolInfo: {
    flex: 1,
  },
  toolName: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  toolUserCost: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[600],
  },
  toolCostInfo: {
    alignItems: 'flex-end',
  },
  toolTotalCost: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  toolMonthlyCost: {
    fontSize: isDesktop ? 12 : 10,
    color: Colors.gray[600],
  },
  totalSection: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gray[300],
  },
  totalLabel: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.gray[700],
    marginBottom: spacing.xs,
  },
  totalAmount: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  totalAnnual: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[600],
  },
  larkPlanContainer: {
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
  },
  larkPlanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  larkPlanIcon: {
    fontSize: isDesktop ? 40 : 32,
    marginRight: spacing.md,
  },
  larkPlanInfo: {
    flex: 1,
  },
  larkPlanTitle: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  larkPlanTagline: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.success,
  },
  larkPricingSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '20',
  },
  larkPlanPrice: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: '900',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  larkPlanPriceUnit: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    marginBottom: spacing.xs,
  },
  larkPlanPriceSubtext: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
  },
  larkFeaturesContainer: {
    flex: 1,
  },
  larkFeaturesTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  larkIconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  larkIconGroup: {
    alignItems: 'center',
    marginHorizontal: spacing.xs,
    marginVertical: spacing.xs,
  },
  larkFeatureIcon: {
    fontSize: isDesktop ? 28 : 24,
    marginBottom: spacing.xs,
  },
  larkFeatureLabel: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  larkPlusIcon: {
    fontSize: isDesktop ? 20 : 18,
    color: Colors.primary,
    fontWeight: 'bold',
    marginHorizontal: spacing.xs,
  },
  larkEqualsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  larkEqualsSign: {
    fontSize: isDesktop ? 28 : 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginRight: spacing.md,
  },
  larkLogoContainer: {
    backgroundColor: Colors.primary + '15',
    borderRadius: 20,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  larkLogo: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  impactContainer: {
    marginTop: spacing.lg,
  },
  impactCard: {
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.warning + '30',
  },
  impactIcon: {
    fontSize: isDesktop ? 40 : 32,
    marginRight: spacing.md,
  },
  impactContent: {
    flex: 1,
  },
  impactTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  impactDescription: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.text,
    lineHeight: isDesktop ? 24 : 20,
  },
});