import React, { useEffect, useRef } from 'react'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native'
import { ResultsSummary } from '@/components/ResultsSummary'
import { ToolsBreakdownTable } from '@/components/ToolsBreakdownTable'
import { VisualCostComparison } from '@/components/VisualCostComparison'
import { LinearGradient } from 'expo-linear-gradient'

import { useUnifiedStore } from '@/store/unified-store'
import { tools } from '@/constants/tools'
import Colors from '@/constants/colors'

export default function ResultsPage() {
  const router = useRouter()
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(50)).current
  
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
    Animated.parallel([
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
    }).filter(Boolean)
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
    // Add haptic feedback or navigation logic here
    console.log('Primary CTA pressed')
  }

  const handleSecondaryButtonPress = () => {
    // Add haptic feedback or navigation logic here
    console.log('Secondary CTA pressed')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const handleGenerateStoryProposal = () => {
    const userInputs = {
      industry: industry,
      teamSize: employeeCount,
      selectedProblems: ['コミュニケーション効率化', 'ツール統合'],
      selectedTools: selectedToolsWithPrices.map(item => item.tool.name),
      monthlyBudget: currentMonthlyCost
    }
    
    console.log('Generating story proposal with:', userInputs)
    // Navigate to story proposal page or trigger generation
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
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      <ScrollView style={styles.container}>
        <Animated.View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={handleReset}>
              <Text style={styles.backButtonText}>← 最初に戻る</Text>
            </TouchableOpacity>
            
            <View style={styles.badges}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>年間 {formatCurrency(annualSavings)} 削減</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{reductionPercentage.toFixed(1)}% コスト削減</Text>
              </View>
            </View>
          </View>

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

          {/* Tools Breakdown Section */}
          <View style={styles.breakdownSection}>
            <ToolsBreakdownTable 
              selectedTools={selectedToolsWithPrices}
              larkPricePerUser={larkMonthlyCost / employeeCount}
              userCount={employeeCount}
            />
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
                50名規模で年間¥2,508,000の削減効果を実現
              </Text>
              
              <View style={styles.ctaButtons}>
                <TouchableOpacity 
                  onPress={handlePrimaryButtonPress}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={['#4F46E5', '#7C3AED']}
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
              </View>
            </View>
          </LinearGradient>
        </Animated.View>
      </ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 8,
  },
  backButton: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  backButtonText: {
    color: Colors.gray[700],
    fontSize: 16,
    fontWeight: '600',
  },
  badges: {
    flexDirection: 'row',
    gap: 12,
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.white,
  },
  summarySection: {
    marginBottom: 32,
  },
  visualSection: {
    marginBottom: 32,
  },
  breakdownSection: {
    marginBottom: 32,
  },
  ctaSection: {
    borderRadius: 24,
    padding: 4,
    marginTop: 32,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
  },
  ctaContent: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  ctaSubtitle: {
    fontSize: 18,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
    fontWeight: '500',
  },
  ctaButtons: {
    width: '100%',
    gap: 16,
  },
  primaryButton: {
    borderRadius: 16,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonInner: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderRadius: 16,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignItems: 'center',
    backgroundColor: Colors.white,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 18,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
});