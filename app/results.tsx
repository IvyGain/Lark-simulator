import React, { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Linking, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient'
import Colors from '@/constants/colors'
import { useUnifiedStore } from '@/store/unified-store'
import { tools } from '@/constants/tools'
import { ResultsSummary } from '@/components/ResultsSummary'
import { ToolsBreakdownTable } from '@/components/ToolsBreakdownTable'
import { VisualCostComparison } from '@/components/VisualCostComparison'
import { CostComparisonBarChart } from '@/components/CostComparisonBarChart'

const { width: screenWidth } = Dimensions.get('window')

export default function ResultsPage() {
  const router = useRouter()
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  const heroAnim = useRef(new Animated.Value(0)).current
  
  const {
    selectedTools,
    employeeCount,
    calculationResults,
    companyName,
    industry,
    reset
  } = useUnifiedStore()

  // Animate page entrance
  useEffect(() => {
    Animated.stagger(200, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(heroAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  // Get selected tools with pricing information
  const getSelectedToolsWithPrices = () => {
    return selectedTools.map(selectedTool => {
      const tool = tools.find(t => t.id === selectedTool.toolId)
      if (tool && tool.pricingPlans[selectedTool.planIndex]) {
        const plan = tool.pricingPlans[selectedTool.planIndex]
        return {
          tool: {
            ...tool,
            pricePerUser: plan.pricePerUser,
            planName: plan.name
          },
          totalMonthlyCost: plan.pricePerUser * employeeCount
        }
      }
      return null
    }).filter((item): item is NonNullable<typeof item> => item !== null)
  }

  const selectedToolsWithPrices = getSelectedToolsWithPrices()

  // Use calculation results from store
  const currentMonthlyCost = calculationResults?.currentMonthlyCost || 0
  const larkMonthlyCost = calculationResults?.larkMonthlyCost || 0
  const monthlySavings = calculationResults?.monthlySavings || 0
  const annualSavings = calculationResults?.annualSavings || 0
  const reductionPercentage = calculationResults?.savingsPercentage || 0
  const roi = calculationResults?.roi || 0
  const paybackPeriod = calculationResults?.paybackPeriod || 0

  const summaryMetrics = {
    annualCostReduction: annualSavings,
    reductionRate: reductionPercentage,
    roi: roi,
    paybackPeriod: paybackPeriod
  }

  const handleReset = () => {
    reset()
    router.push('/')
  }

  const handlePrimaryButtonPress = () => {
    console.log('Primary CTA pressed - Lark Free Install')
    Linking.openURL('https://www.customercloud.co/lark-ivygain')
  }

  const handleSecondaryButtonPress = () => {
    console.log('Secondary CTA pressed - Consultation')
    Linking.openURL('https://ivygain-project.jp.larksuite.com/scheduler/1077edbc8cd5e47a')
  }

  const handleProposalButtonPress = () => {
    console.log('Proposal CTA pressed - Proposal Creation')
    Linking.openURL('https://www.customercloud.co/lark-ivygain')
  }

  if (!calculationResults) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>計算結果が見つかりません</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleReset}>
            <Text style={styles.backButtonText}>戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Header */}
          <View style={styles.header}>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              style={styles.headerGradient}
            >
              <View style={styles.headerContent}>
                <View style={styles.brandSection}>
                  <Text style={styles.brandLogo}>Lark</Text>
                  <Text style={styles.brandTagline}>コスト削減シミュレーション</Text>
                </View>
                <TouchableOpacity style={styles.backButtonHeader} onPress={handleReset}>
                  <Text style={styles.backButtonHeaderText}>戻る</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>

          {/* Hero Section */}
          <Animated.View style={[styles.heroSection, { opacity: heroAnim }]}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(255, 255, 255, 0.85)']}
              style={styles.heroGradient}
            >
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>
                  年間 ¥{annualSavings.toLocaleString()} の削減効果
                </Text>
                <Text style={styles.heroSubtitle}>
                  {companyName || '貴社'}のコスト最適化シミュレーション結果
                </Text>
                
                {/* Metrics Grid */}
                <View style={styles.metricsGrid}>
                  <View style={styles.metricCard}>
                    <LinearGradient
                      colors={[Colors.primary, Colors.secondary]}
                      style={styles.metricGradient}
                    >
                      <Text style={styles.metricValue}>{reductionPercentage.toFixed(1)}%</Text>
                      <Text style={styles.metricLabel}>コスト削減率</Text>
                    </LinearGradient>
                  </View>
                  
                  <View style={styles.metricCard}>
                    <LinearGradient
                      colors={[Colors.accent, '#FF6B6B']}
                      style={styles.metricGradient}
                    >
                      <Text style={styles.metricValue}>{roi.toFixed(1)}%</Text>
                      <Text style={styles.metricLabel}>ROI</Text>
                    </LinearGradient>
                  </View>
                  
                  <View style={styles.metricCard}>
                    <LinearGradient
                      colors={['#4ECDC4', '#44A08D']}
                      style={styles.metricGradient}
                    >
                      <Text style={styles.metricValue}>{paybackPeriod.toFixed(1)}</Text>
                      <Text style={styles.metricLabel}>投資回収期間（月）</Text>
                    </LinearGradient>
                  </View>
                  
                  <View style={styles.metricCard}>
                    <LinearGradient
                      colors={['#667eea', '#764ba2']}
                      style={styles.metricGradient}
                    >
                      <Text style={styles.metricValue}>¥{monthlySavings.toLocaleString()}</Text>
                      <Text style={styles.metricLabel}>月間削減額</Text>
                    </LinearGradient>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Content */}
          <View style={styles.content}>
            {/* Summary Section */}
            <View style={styles.summarySection}>
              <ResultsSummary metrics={summaryMetrics} />
            </View>

            {/* Visual Comparison */}
            <View style={styles.visualSection}>
              <VisualCostComparison 
                currentCost={currentMonthlyCost}
                larkCost={larkMonthlyCost}
                savings={monthlySavings}
              />
            </View>

            {/* Chart Section */}
            <View style={styles.chartSection}>
              <CostComparisonBarChart 
                currentCost={currentMonthlyCost}
                larkCost={larkMonthlyCost}
                savings={monthlySavings}
              />
            </View>

            {/* Tools Breakdown */}
            <View style={styles.breakdownSection}>
              <ToolsBreakdownTable selectedToolsWithPrices={selectedToolsWithPrices} />
            </View>

            {/* Simulation Details */}
            <View style={styles.simulationSection}>
              <View style={styles.simulationCard}>
                <Text style={styles.simulationTitle}>シミュレーション詳細</Text>
                <View style={styles.simulationContent}>
                  <View style={styles.simulationRow}>
                    <Text style={styles.simulationLabel}>会社名</Text>
                    <Text style={styles.simulationValue}>{companyName || '未設定'}</Text>
                  </View>
                  <View style={styles.simulationRow}>
                    <Text style={styles.simulationLabel}>業界</Text>
                    <Text style={styles.simulationValue}>{industry || '未設定'}</Text>
                  </View>
                  <View style={styles.simulationRow}>
                    <Text style={styles.simulationLabel}>従業員数</Text>
                    <Text style={styles.simulationValue}>{employeeCount}人</Text>
                  </View>
                  <View style={styles.simulationRow}>
                    <Text style={styles.simulationLabel}>選択ツール数</Text>
                    <Text style={styles.simulationValue}>{selectedTools.length}個</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.editButton} onPress={handleReset}>
                  <Text style={styles.editButtonText}>条件を変更する</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Trust Elements Section */}
            <View style={styles.trustSection}>
              <Text style={styles.trustTitle}>なぜLarkが選ばれるのか</Text>
              <View style={styles.trustGrid}>
                <View style={styles.trustCard}>
                  <Text style={styles.trustIcon}>🔒</Text>
                  <Text style={styles.trustLabel}>セキュリティ</Text>
                  <Text style={styles.trustDescription}>エンタープライズ級のセキュリティ</Text>
                </View>
                <View style={styles.trustCard}>
                  <Text style={styles.trustIcon}>🌍</Text>
                  <Text style={styles.trustLabel}>グローバル対応</Text>
                  <Text style={styles.trustDescription}>世界中で利用可能</Text>
                </View>
              </View>
            </View>

            {/* Professional Support Section */}
            <View style={styles.professionalSection}>
              <Text style={styles.professionalTitle}>プロフェッショナル導入サポート</Text>
              <View style={styles.professionalContent}>
                <View style={styles.benefitCard}>
                  <Text style={styles.benefitIcon}>⚡</Text>
                  <Text style={styles.benefitTitle}>導入期間短縮</Text>
                  <Text style={styles.benefitDescription}>
                    専門チームによる迅速な導入支援で、通常の50%の期間で運用開始が可能です。
                  </Text>
                </View>
                
                <View style={styles.benefitCard}>
                  <Text style={styles.benefitIcon}>📈</Text>
                  <Text style={styles.benefitTitle}>ユーザー定着率向上</Text>
                  <Text style={styles.benefitDescription}>
                    継続的なトレーニングとサポートにより、95%以上のユーザー定着率を実現します。
                  </Text>
                </View>
                
                <View style={styles.benefitCard}>
                  <Text style={styles.benefitIcon}>💰</Text>
                  <Text style={styles.benefitTitle}>ROI最大化戦略</Text>
                  <Text style={styles.benefitDescription}>
                    データ分析に基づく最適化提案で、投資対効果を最大限に引き出します。
                  </Text>
                </View>
              </View>

              {/* Support Details Section */}
              <View style={styles.supportDetailsSection}>
                <Text style={styles.supportDetailsTitle}>導入支援の詳細内容</Text>
                <Text style={styles.supportDetailsDescription}>
                  Larkの最大効率を発揮するためのノウハウを活かした無料相談構築設計をご支援します。
                </Text>
                <View style={styles.supportDetailsList}>
                  <View style={styles.supportDetailsItem}>
                    <Text style={styles.supportDetailsIcon}>🏗️</Text>
                    <Text style={styles.supportDetailsText}>業務基盤システム構築代行</Text>
                  </View>
                  <View style={styles.supportDetailsItem}>
                    <Text style={styles.supportDetailsIcon}>📊</Text>
                    <Text style={styles.supportDetailsText}>データ移行・初期設定の代行</Text>
                  </View>
                  <View style={styles.supportDetailsItem}>
                    <Text style={styles.supportDetailsIcon}>🎓</Text>
                    <Text style={styles.supportDetailsText}>社員向けオンボーディング研修・運用サポート</Text>
                  </View>
                  <View style={styles.supportDetailsItem}>
                    <Text style={styles.supportDetailsIcon}>🛡️</Text>
                    <Text style={styles.supportDetailsText}>導入後3ヶ月間の無料サポート</Text>
                  </View>
                  <View style={styles.supportDetailsItem}>
                    <Text style={styles.supportDetailsIcon}>⚙️</Text>
                    <Text style={styles.supportDetailsText}>カスタマイズ・運用最適化支援</Text>
                  </View>
                </View>
              </View>

              {/* Authority Section */}
              <View style={styles.authoritySection}>
                <Text style={styles.authorityTitle}>導入実績と専門性</Text>
                <View style={styles.authorityStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>500+</Text>
                    <Text style={styles.statLabel}>企業導入実績</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>98%</Text>
                    <Text style={styles.statLabel}>顧客満足度</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statNumber}>24/7</Text>
                    <Text style={styles.statLabel}>サポート体制</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* CTA Section */}
            <LinearGradient
              colors={[Colors.primary, Colors.secondary, Colors.accent]}
              style={styles.ctaSection}
            >
              <View style={styles.ctaContent}>
                <Text style={styles.ctaTitle}>
                  今すぐLarkで{'\n'}コスト削減を始めませんか？
                </Text>
                <Text style={styles.ctaSubtitle}>
                  年間¥{annualSavings.toLocaleString()}の削減効果を実現し、{'\n'}
                  業務効率を大幅に向上させましょう
                </Text>
                
                <View style={styles.ctaButtons}>
                  <TouchableOpacity 
                    style={styles.primaryButton}
                    onPress={handlePrimaryButtonPress}
                  >
                    <LinearGradient
                      colors={['#FFFFFF', '#F8F9FA']}
                      style={styles.primaryButtonInner}
                    >
                      <Text style={styles.primaryButtonText}>
                        Larkの無料インストールはこちら
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.secondaryButton}
                    onPress={handleSecondaryButtonPress}
                  >
                    <Text style={styles.secondaryButtonText}>
                      導入に関するご質問・無料相談
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    style={styles.proposalButton}
                    onPress={handleProposalButtonPress}
                  >
                    <Text style={styles.proposalButtonText}>
                      稟議書を作成する
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContainer: {
    flex: 1,
  },
  header: {
    paddingTop: 50,
  },
  headerGradient: {
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandSection: {
    flex: 1,
  },
  brandLogo: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  backButtonHeader: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  backButtonHeaderText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  heroSection: {
    marginTop: -10,
  },
  heroGradient: {
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    gap: 12,
  },
  metricCard: {
    width: '48%',
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  metricGradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.white,
    marginBottom: 4,
    textAlign: 'center',
  },
  metricLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
  content: {
    padding: 24,
    paddingTop: 0,
  },
  summarySection: {
    marginBottom: 32,
  },
  visualSection: {
    marginBottom: 32,
  },
  chartSection: {
    marginBottom: 32,
  },
  breakdownSection: {
    marginBottom: 32,
  },
  simulationSection: {
    marginBottom: 32,
  },
  simulationCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  simulationTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 20,
  },
  simulationContent: {
    marginBottom: 20,
  },
  simulationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[100],
  },
  simulationLabel: {
    fontSize: 16,
    color: Colors.gray[600],
    fontWeight: '600',
  },
  simulationValue: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '700',
  },
  editButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  editButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  trustSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  trustTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  trustGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  trustCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
  },
  trustIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  trustLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  trustDescription: {
    fontSize: 12,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  professionalSection: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  professionalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  professionalContent: {
    marginBottom: 24,
  },
  benefitCard: {
    backgroundColor: Colors.gray[50],
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.gray[100],
  },
  benefitIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  benefitTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    lineHeight: 20,
  },
  authoritySection: {
    backgroundColor: 'rgba(79, 70, 229, 0.05)',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.1)',
  },
  authorityTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 16,
  },
  authorityStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.gray[600],
    textAlign: 'center',
    fontWeight: '600',
  },
  ctaSection: {
    borderRadius: 24,
    padding: 6,
    marginBottom: 40,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 16,
  },
  ctaContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontWeight: '600',
  },
  ctaButtons: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  primaryButtonInner: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderRadius: 16,
  },
  primaryButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '800',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  proposalButton: {
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  proposalButtonText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  supportDetailsSection: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  supportDetailsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#059669',
    textAlign: 'center',
    marginBottom: 12,
  },
  supportDetailsDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 20,
  },
  supportDetailsList: {
    gap: 12,
  },
  supportDetailsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  supportDetailsIcon: {
    fontSize: 16,
    marginRight: 12,
    width: 24,
    textAlign: 'center',
  },
  supportDetailsText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    flex: 1,
  },
});