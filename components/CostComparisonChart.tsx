import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

interface Tool {
  id: string;
  name: string;
  pricePerUser: number;
  customMonthlyFee?: number;
}

interface CostComparisonChartProps {
  selectedTools: Tool[];
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
  
  // Calculate actual current tools cost (ANNUAL)
  const calculateMonthlyCost = (tool: Tool) => {
    return tool.customMonthlyFee || (tool.pricePerUser * employeeCount);
  };
  
  const currentToolsMonthlyCost = selectedTools.reduce((sum, tool) => sum + calculateMonthlyCost(tool), 0);
  const currentToolsAnnualCost = currentToolsMonthlyCost * 12;
  const larkAnnualCost = larkCost * 12;
  
  // Calculate bar heights as percentages (using annual costs)
  const maxCost = Math.max(currentToolsAnnualCost, larkAnnualCost);
  const currentToolsHeight = (currentToolsAnnualCost / maxCost) * 100;
  const larkHeight = (larkAnnualCost / maxCost) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>コスト比較</Text>
      
      <View style={styles.chartContainer}>
        <View style={styles.barsContainer}>
          {/* Current Tools Bar */}
          <View style={styles.barWrapper}>
            <View style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  styles.currentToolsBar,
                  { height: `${currentToolsHeight}%` }
                ]} 
              />
            </View>
            <Text style={styles.barLabel}>現在のツール</Text>
            <Text style={styles.barValue}>¥{currentToolsAnnualCost.toLocaleString()}/年</Text>
            <Text style={styles.barSubValue}>(月間 ¥{currentToolsMonthlyCost.toLocaleString()})</Text>
          </View>

          {/* Lark Bar */}
          <View style={styles.barWrapper}>
            <View style={styles.barContainer}>
              <View 
                style={[
                  styles.bar, 
                  styles.larkBar,
                  { height: `${larkHeight}%` }
                ]} 
              />
            </View>
            <Text style={styles.barLabel}>Larkに統合</Text>
            <Text style={styles.barValue}>¥{larkAnnualCost.toLocaleString()}/年</Text>
            <Text style={styles.barSubValue}>(月間 ¥{larkCost.toLocaleString()})</Text>
          </View>
        </View>
      </View>

      {/* Savings Highlight */}
      <View style={styles.savingsContainer}>
        <View style={styles.savingsBox}>
          <Text style={styles.savingsLabel}>年間削減効果</Text>
          <Text style={styles.savingsAmount}>¥{savingsAmount.toLocaleString()}/年</Text>
          <Text style={styles.savingsSubtext}>月間 ¥{Math.round(savingsAmount/12).toLocaleString()}/月</Text>
        </View>
        <View style={styles.percentageBox}>
          <Text style={styles.percentageValue}>{Math.round(savingsPercentage)}%</Text>
          <Text style={styles.percentageLabel}>削減</Text>
        </View>
      </View>

      {/* Tools Breakdown and Lark Details Side by Side */}
      <View style={styles.comparisonSection}>
        {/* Left Side - Current Tools Breakdown */}
        <View style={styles.leftSection}>
          <Text style={styles.sectionTitle}>現在のツール内訳</Text>
          <Text style={styles.sectionSubtitle}>利用者数：{employeeCount}人</Text>
          
          <View style={styles.toolsListContainer}>
            {selectedTools.map((tool, index) => {
              const monthlyCost = calculateMonthlyCost(tool);
              const annualCost = monthlyCost * 12;
              const userCost = Math.round(monthlyCost / employeeCount);
              const userAnnualCost = Math.round(annualCost / employeeCount);
              
              return (
                <View key={tool.id} style={styles.toolRow}>
                  <View style={styles.toolNameContainer}>
                    <Text style={styles.toolName}>{tool.name}</Text>
                  </View>
                  <View style={styles.toolCostContainer}>
                    <Text style={styles.toolUserCost}>¥{userCost}/人/月</Text>
                    <Text style={styles.toolTotalCost}>¥{monthlyCost.toLocaleString()}/月</Text>
                    <Text style={styles.toolMonthlyCost}>(年間: ¥{annualCost.toLocaleString()})</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Right Side - Lark Plan Details */}
        <View style={styles.rightSection}>
          <View style={styles.larkPlanHeader}>
            <Text style={styles.larkPlanTitle}>🚀 Larkプラン</Text>
            <Text style={styles.larkPlanPrice}>¥1,420/人/月</Text>
            <Text style={styles.larkPlanPriceSubtext}>（¥17,040/人/年）</Text>
            <Text style={styles.larkPlanTagline}>全機能統合プラットフォーム</Text>
          </View>

          <View style={styles.larkFeaturesContainer}>
            {/* Expanded Hero Message */}
            <View style={styles.larkHeroSectionExpanded}>
              <Text style={styles.larkHeroTitleExpanded}>チャット以上、想像以上。</Text>
              <Text style={styles.larkHeroSubtitleExpanded}>仕事はスマホ1つで完結。</Text>
              <Text style={styles.larkHeroDescriptionExpanded}>仕事の悩み、ぜんぶLarkで解決。</Text>
            </View>

            {/* Problem Solver Section - Expanded */}
            <View style={styles.larkProblemSectionExpanded}>
              <View style={styles.larkSolutionGridExpanded}>
                <View style={styles.larkSolutionCard}>
                  <Text style={styles.larkQuestionIcon}>Q</Text>
                  <Text style={styles.larkQuestion}>会議時間を短くするには？</Text>
                  <View style={styles.larkAnswer}>
                    <Text style={styles.larkAnswerBrand}>🐦 Lark</Text>
                    <Text style={styles.larkAnswerText}>で会議時間</Text>
                  </View>
                  <View style={styles.larkResultContainer}>
                    <Text style={styles.larkResultNumber}>39%</Text>
                    <View style={styles.larkResultBadge}>
                      <Text style={styles.larkResultBadgeText}>短縮</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.larkSolutionCard}>
                  <Text style={styles.larkQuestionIcon}>Q</Text>
                  <Text style={styles.larkQuestion}>ツールコストを削減するには？</Text>
                  <View style={styles.larkAnswer}>
                    <Text style={styles.larkAnswerBrand}>🐦 Lark</Text>
                    <Text style={styles.larkAnswerText}>でツールコスト</Text>
                  </View>
                  <View style={styles.larkResultContainer}>
                    <Text style={styles.larkResultNumber}>80%</Text>
                    <View style={styles.larkResultBadge}>
                      <Text style={styles.larkResultBadgeText}>カット</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.larkSolutionCard}>
                  <Text style={styles.larkQuestionIcon}>Q</Text>
                  <Text style={styles.larkQuestion}>ファイルはどこ？</Text>
                  <View style={styles.larkAnswer}>
                    <Text style={styles.larkAnswerBrand}>🐦 Lark</Text>
                    <Text style={styles.larkAnswerText}>で作成キーワード</Text>
                  </View>
                  <View style={styles.larkResultContainer}>
                    <Text style={styles.larkResultNumber}>1</Text>
                    <Text style={styles.larkResultUnit}>発</Text>
                    <View style={styles.larkResultBadge}>
                      <Text style={styles.larkResultBadgeText}>検索</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.larkSolutionCard}>
                  <Text style={styles.larkQuestionIcon}>Q</Text>
                  <Text style={styles.larkQuestion}>DXを最短で行うには？</Text>
                  <View style={styles.larkAnswer}>
                    <Text style={styles.larkAnswerBrand}>🐦 Lark</Text>
                    <Text style={styles.larkAnswerText}>で社内DXが</Text>
                  </View>
                  <View style={styles.larkResultContainer}>
                    <Text style={styles.larkResultNumber}>1</Text>
                    <Text style={styles.larkResultSubtext}>ストップに</Text>
                    <View style={styles.larkResultBadge}>
                      <Text style={styles.larkResultBadgeText}>ONE STOP</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            {/* All-in-One Features */}
            <View style={styles.larkFeaturesShowcase}>
              <Text style={styles.larkFeaturesTitle}>統合型DXツール「Lark」のオールインワン機能</Text>
              
              <View style={styles.larkIconsRow}>
                <View style={styles.larkIconGroup}>
                  <Text style={styles.larkFeatureIcon}>💬</Text>
                  <Text style={styles.larkFeatureLabel}>チャット</Text>
                </View>
                <Text style={styles.larkPlusIcon}>+</Text>
                <View style={styles.larkIconGroup}>
                  <Text style={styles.larkFeatureIcon}>📄</Text>
                  <Text style={styles.larkFeatureLabel}>ドキュメント</Text>
                </View>
                <Text style={styles.larkPlusIcon}>+</Text>
                <View style={styles.larkIconGroup}>
                  <Text style={styles.larkFeatureIcon}>📹</Text>
                  <Text style={styles.larkFeatureLabel}>ビデオ会議</Text>
                </View>
              </View>

              <View style={styles.larkIconsRow}>
                <View style={styles.larkIconGroup}>
                  <Text style={styles.larkFeatureIcon}>🤖</Text>
                  <Text style={styles.larkFeatureLabel}>自動議事録</Text>
                </View>
                <Text style={styles.larkPlusIcon}>+</Text>
                <View style={styles.larkIconGroup}>
                  <Text style={styles.larkFeatureIcon}>📅</Text>
                  <Text style={styles.larkFeatureLabel}>カレンダー</Text>
                </View>
                <Text style={styles.larkPlusIcon}>+</Text>
                <View style={styles.larkIconGroup}>
                  <Text style={styles.larkFeatureIcon}>📧</Text>
                  <Text style={styles.larkFeatureLabel}>メール</Text>
                </View>
              </View>

              <View style={styles.larkEqualsContainer}>
                <Text style={styles.larkEqualsSign}>=</Text>
                <View style={styles.larkLogoContainer}>
                  <Text style={styles.larkLogo}>🐦 Lark</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  chartContainer: {
    height: 200,
    marginBottom: spacing.lg,
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 140,
    paddingHorizontal: spacing.lg,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 120,
  },
  barContainer: {
    height: 100,
    width: 60,
    justifyContent: 'flex-end',
    marginBottom: spacing.sm,
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 10,
  },
  currentToolsBar: {
    backgroundColor: Colors.gray[600] as string,
  },
  larkBar: {
    backgroundColor: Colors.primary,
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  barValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  barSubValue: {
    fontSize: 12,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  savingsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.success + '20',
    borderRadius: 8,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  savingsBox: {
    flex: 1,
  },
  savingsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.success,
    marginBottom: spacing.xs,
  },
  savingsAmount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.success,
  },
  savingsSubtext: {
    fontSize: 12,
    color: Colors.success,
    marginTop: spacing.xs,
  },
  percentageBox: {
    backgroundColor: Colors.success,
    borderRadius: 25,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minWidth: 80,
    alignItems: 'center',
  },
  percentageValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  percentageLabel: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
  },
  comparisonSection: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  leftSection: {
    flex: 1,
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 8,
    padding: spacing.md,
    marginRight: spacing.sm,
  },
  rightSection: {
    flex: 1,
    backgroundColor: Colors.primary + '05',
    borderRadius: 8,
    padding: spacing.md,
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.gray[600],
    marginBottom: spacing.sm,
  },
  toolsListContainer: {
    marginVertical: spacing.xs,
  },
  // Lark Plan Styles
  larkPlanHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '20',
  },
  larkPlanTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  larkPlanPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  larkPlanPriceSubtext: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: spacing.xs,
  },
  larkPlanTagline: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.success,
    textAlign: 'center',
  },
  larkFeaturesContainer: {
    flex: 1,
  },
  // Lark Impact Styles
  larkHeroSectionExpanded: {
    marginBottom: spacing.lg,
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  larkHeroTitleExpanded: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  larkHeroSubtitleExpanded: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  larkHeroDescriptionExpanded: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
  },
  larkProblemSectionExpanded: {
    marginBottom: spacing.lg,
  },
  larkProblemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  larkSolutionGridExpanded: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  larkSolutionCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: spacing.md,
    width: '48%',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  larkQuestionIcon: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 4,
  },
  larkQuestion: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 6,
    fontWeight: '500',
  },
  larkAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  larkAnswerBrand: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: 6,
  },
  larkAnswerText: {
    fontSize: 11,
    color: Colors.text,
  },
  larkResultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  larkResultNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary,
  },
  larkResultUnit: {
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 2,
  },
  larkResultSubtext: {
    fontSize: 11,
    color: Colors.primary,
    marginLeft: 6,
  },
  larkResultBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginLeft: spacing.xs,
  },
  larkResultBadgeText: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: 'bold',
  },
  larkFeaturesShowcase: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.primary + '20',
  },
  larkFeaturesTitle: {
    fontSize: 18,
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
    marginHorizontal: 8,
    marginVertical: 4,
  },
  larkFeatureIcon: {
    fontSize: 32,
    marginBottom: 6,
  },
  larkFeatureLabel: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  larkPlusIcon: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  larkEqualsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  larkEqualsSign: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginRight: spacing.md,
  },
  larkLogoContainer: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 25,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  larkLogo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  // Full Width Lark Impact Section Styles
  larkImpactSectionFull: {
    backgroundColor: Colors.primary + '05',
    borderRadius: 12,
    padding: spacing.lg,
    marginVertical: spacing.lg,
    borderWidth: 2,
    borderColor: Colors.primary + '20',
  },
  larkHeroFullWidth: {
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingVertical: spacing.lg,
  },
  larkHeroTitleFull: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  larkHeroSubtitleFull: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  larkHeroDescriptionFull: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    textAlign: 'center',
  },
  larkSolutionGridFull: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  larkSolutionCardLarge: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    width: '48%',
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: Colors.primary + '30',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  larkQuestionIconLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.sm,
  },
  larkQuestionLarge: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: spacing.sm,
    fontWeight: '600',
  },
  larkAnswerLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  larkAnswerBrandLarge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: spacing.sm,
  },
  larkAnswerTextLarge: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  larkResultContainerLarge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  larkResultNumberLarge: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.primary,
  },
  larkResultUnitLarge: {
    fontSize: 20,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: 'bold',
  },
  larkResultSubtextLarge: {
    fontSize: 14,
    color: Colors.primary,
    marginLeft: spacing.sm,
    fontWeight: '600',
  },
  larkResultBadgeLarge: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginLeft: spacing.sm,
  },
  larkResultBadgeTextLarge: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  // Full Width Features Showcase
  larkFeaturesShowcaseFull: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 2,
    borderTopColor: Colors.primary + '20',
  },
  larkFeaturesTitleFull: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  larkIconsRowFull: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  larkIconGroupLarge: {
    alignItems: 'center',
    marginHorizontal: spacing.sm,
    marginVertical: spacing.xs,
  },
  larkFeatureIconLarge: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  larkFeatureLabelLarge: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    textAlign: 'center',
  },
  larkPlusIconLarge: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
    marginHorizontal: spacing.sm,
  },
  larkEqualsContainerFull: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  larkEqualsSignFull: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginRight: spacing.lg,
  },
  larkLogoContainerFull: {
    backgroundColor: Colors.primary + '15',
    borderRadius: 25,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
  },
  larkLogoFull: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  toolRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    minHeight: 40,
  },
  toolNameContainer: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  toolName: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
    flexWrap: 'wrap',
  },
  toolCostContainer: {
    alignItems: 'flex-end',
    minWidth: 80,
  },
  toolUserCost: {
    fontSize: 10,
    color: Colors.gray[600],
  },
  toolTotalCost: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
  },
  toolMonthlyCost: {
    fontSize: 10,
    color: Colors.gray[500],
    fontStyle: 'italic',
    marginTop: 2,
  },
});