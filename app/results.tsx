import React, { useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated, Dimensions } from 'react-native'
import { ResultsSummary } from '@/components/ResultsSummary'
import { ToolsBreakdownTable } from '@/components/ToolsBreakdownTable'
import { VisualCostComparison } from '@/components/VisualCostComparison'
import { CostComparisonBarChart } from '@/components/CostComparisonBarChart'
import { LinearGradient } from 'expo-linear-gradient'

import { useUnifiedStore } from '@/store/unified-store'
import { tools } from '@/constants/tools'
import Colors from '@/constants/colors'

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
    console.log('Primary CTA pressed - Start Free Trial')
    // Navigate to trial signup or external link
  }

  const handleSecondaryButtonPress = () => {
    console.log('Secondary CTA pressed - Contact Expert')
    // Navigate to contact form or external link
  }

  const handleGenerateProposal = () => {
    console.log('Generate Proposal pressed')
    // Navigate to proposal generation page
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // If no calculation results, redirect back
  if (!calculationResults || selectedTools.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.errorText}>計算結果がありません。最初からやり直してください。</Text>
          <TouchableOpacity style={styles.backButton} onPress={handleReset}>
            <Text style={styles.backButtonText}>最初に戻る</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Professional Header */}
        <Animated.View 
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['#4F46E5', '#7C3AED', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <View style={styles.brandSection}>
                <Text style={styles.brandLogo}>🐦 Lark</Text>
                <Text style={styles.brandTagline}>Business Transformation Platform</Text>
              </View>
              
              <TouchableOpacity style={styles.backButtonHeader} onPress={handleReset}>
                <Text style={styles.backButtonHeaderText}>← 新しい計算</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Hero Section */}
        <Animated.View 
          style={[
            styles.heroSection,
            {
              opacity: heroAnim,
              transform: [{ scale: heroAnim }]
            }
          ]}
        >
          <LinearGradient
            colors={['#FFFFFF', '#F8FAFC']}
            style={styles.heroGradient}
          >
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>
                🎉 コスト削減シミュレーション結果
              </Text>
              <Text style={styles.heroSubtitle}>
                {companyName || 'あなたの会社'}での Lark 導入効果
              </Text>
              
              {/* Key Metrics Cards - 4つのカードに拡張 */}
              <View style={styles.metricsGrid}>
                <View style={styles.metricCard}>
                  <LinearGradient
                    colors={[Colors.success, '#2E8B57']}
                    style={styles.metricGradient}
                  >
                    <Text style={styles.metricValue}>{formatCurrency(annualSavings)}</Text>
                    <Text style={styles.metricLabel}>年間削減額</Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.metricCard}>
                  <LinearGradient
                    colors={[Colors.primary, '#7C3AED']}
                    style={styles.metricGradient}
                  >
                    <Text style={styles.metricValue}>{reductionPercentage.toFixed(1)}%</Text>
                    <Text style={styles.metricLabel}>コスト削減率</Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.metricCard}>
                  <LinearGradient
                    colors={['#FF6B6B', '#FF8E8E']}
                    style={styles.metricGradient}
                  >
                    <Text style={styles.metricValue}>{roi.toFixed(1)}%</Text>
                    <Text style={styles.metricLabel}>ROI（投資対効果）</Text>
                  </LinearGradient>
                </View>
                
                <View style={styles.metricCard}>
                  <LinearGradient
                    colors={['#FFA726', '#FFB74D']}
                    style={styles.metricGradient}
                  >
                    <Text style={styles.metricValue}>{paybackPeriod.toFixed(1)}ヶ月</Text>
                    <Text style={styles.metricLabel}>投資回収期間</Text>
                  </LinearGradient>
                </View>
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Main Content */}
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Summary Section */}
          <View style={styles.summarySection}>
            <ResultsSummary 
              metrics={summaryMetrics}
              companyName={companyName}
              employeeCount={employeeCount}
            />
          </View>

          {/* Visual Comparison Section */}
          <View style={styles.visualSection}>
            <VisualCostComparison 
              currentMonthlyCost={currentMonthlyCost}
              larkMonthlyCost={larkMonthlyCost}
              monthlySavings={monthlySavings}
              annualSavings={annualSavings}
            />
          </View>

          {/* Simulation Results & Prerequisites Section */}
          <View style={styles.simulationSection}>
            <View style={styles.simulationCard}>
              <Text style={styles.simulationTitle}>シミュレーション結果</Text>
              <View style={styles.simulationContent}>
                <View style={styles.simulationRow}>
                  <Text style={styles.simulationLabel}>業種</Text>
                  <Text style={styles.simulationValue}>{industry || '未設定'}</Text>
                </View>
                <View style={styles.simulationRow}>
                  <Text style={styles.simulationLabel}>従業員数</Text>
                  <Text style={styles.simulationValue}>{employeeCount}名</Text>
                </View>
                <View style={styles.simulationRow}>
                  <Text style={styles.simulationLabel}>選択ツール数</Text>
                  <Text style={styles.simulationValue}>{selectedTools.length}個</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => router.push('/simulator')}
              >
                <Text style={styles.editButtonText}>前提条件を編集</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Cost Comparison Bar Chart */}
          <View style={styles.chartSection}>
            <CostComparisonBarChart 
              currentAnnualCost={currentMonthlyCost * 12}
              larkAnnualCost={larkMonthlyCost * 12}
              annualSavings={annualSavings}
            />
          </View>

          {/* Tools Breakdown Section */}
          <View style={styles.breakdownSection}>
            <ToolsBreakdownTable 
              selectedTools={selectedToolsWithPrices}
              larkPricePerUser={larkMonthlyCost / employeeCount}
              userCount={employeeCount}
            />
          </View>

          {/* Trust Elements */}
          <View style={styles.trustSection}>
            <Text style={styles.trustTitle}>🏆 なぜ Lark が選ばれるのか</Text>
            <View style={styles.trustGrid}>
              <View style={styles.trustCard}>
                <Text style={styles.trustIcon}>🚀</Text>
                <Text style={styles.trustLabel}>生産性向上</Text>
                <Text style={styles.trustDescription}>平均30%の業務効率化</Text>
              </View>
              <View style={styles.trustCard}>
                <Text style={styles.trustIcon}>🔒</Text>
                <Text style={styles.trustLabel}>エンタープライズセキュリティ</Text>
                <Text style={styles.trustDescription}>ISO27001認証取得</Text>
              </View>
              <View style={styles.trustCard}>
                <Text style={styles.trustIcon}>🌍</Text>
                <Text style={styles.trustLabel}>グローバル対応</Text>
                <Text style={styles.trustDescription}>100カ国以上で利用</Text>
              </View>
            </View>
          </View>

          {/* CTA Section */}
          <LinearGradient
            colors={['#4F46E5', '#7C3AED', '#EC4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaSection}
          >
            <View style={styles.ctaContent}>
              <Text style={styles.ctaTitle}>✨ 今すぐLarkで業務効率を革新しましょう</Text>
              <Text style={styles.ctaSubtitle}>
                {employeeCount}名規模で年間{formatCurrency(annualSavings)}の削減効果を実現
              </Text>
              
              <View style={styles.ctaButtons}>
                <TouchableOpacity 
                  onPress={handlePrimaryButtonPress}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#FFFFFF', '#F8FAFC']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.primaryButton}
                  >
                    <View style={styles.primaryButtonInner}>
                      <Text style={styles.primaryButtonText}>🚀 無料トライアルを開始</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.secondaryButton}
                  onPress={handleSecondaryButtonPress}
                  activeOpacity={0.7}
                >
                  <Text style={styles.secondaryButtonText}>💬 専門家に相談する</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.proposalButton}
                  onPress={handleGenerateProposal}
                  activeOpacity={0.7}
                >
                  <Text style={styles.proposalButtonText}>📄 稟議書を作成する</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
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
});