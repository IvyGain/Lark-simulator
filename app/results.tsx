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
    padding: 24, // Increased from 20
    paddingBottom: 60, // Increased from 40
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40, // Increased from 32
    paddingTop: 12, // Increased from 8
  },
  backButton: {
    padding: 16, // Increased from 12
    borderRadius: 12, // Increased from 8
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 }, // Enhanced shadow
    shadowOpacity: 0.15, // Increased from 0.1
    shadowRadius: 8, // Increased from 4
    elevation: 4, // Increased from 2
  },
  backButtonText: {
    color: Colors.gray[700],
    fontSize: 18, // Increased from 16
    fontWeight: '700', // Increased from '600'
  },
  badges: {
    flexDirection: 'row',
    gap: 16, // Increased from 12
  },
  badge: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20, // Increased from 16
    paddingVertical: 12, // Increased from 8
    borderRadius: 24, // Increased from 20
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 }, // Enhanced shadow
    shadowOpacity: 0.3, // Increased from 0.2
    shadowRadius: 8, // Increased from 4
    elevation: 6, // Increased from 3
  },
  badgeText: {
    fontSize: 16, // Increased from 14
    fontWeight: '800', // Increased from '700'
    color: Colors.white,
  },
  summarySection: {
    marginBottom: 48, // Increased from 32 - This is the most important section
    transform: [{ scale: 1.05 }], // Slightly larger scale for emphasis
  },
  visualSection: {
    marginBottom: 40, // Increased from 32
    transform: [{ scale: 1.02 }], // Slightly larger for visual impact
  },
  breakdownSection: {
    marginBottom: 40, // Increased from 32
  },
  ctaSection: {
    borderRadius: 28, // Increased from 24
    padding: 6, // Increased from 4
    marginTop: 48, // Increased from 32
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 16 }, // Enhanced shadow
    shadowOpacity: 0.35, // Increased from 0.25
    shadowRadius: 28, // Increased from 20
    elevation: 16, // Increased from 12
    transform: [{ scale: 1.03 }], // Slightly larger for prominence
  },
  ctaContent: {
    backgroundColor: Colors.white,
    borderRadius: 24, // Increased from 20
    padding: 40, // Increased from 32
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 32, // Increased from 28 - Make this much more prominent
    fontWeight: '900', // Increased from '800'
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20, // Increased from 16
    lineHeight: 40, // Increased from 36
  },
  ctaSubtitle: {
    fontSize: 20, // Increased from 18
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 40, // Increased from 32
    lineHeight: 28, // Increased from 24
    fontWeight: '600', // Increased from '500'
  },
  ctaButtons: {
    width: '100%',
    gap: 20, // Increased from 16
  },
  primaryButton: {
    borderRadius: 20, // Increased from 16
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 }, // Enhanced shadow
    shadowOpacity: 0.5, // Increased from 0.4
    shadowRadius: 16, // Increased from 12
    elevation: 12, // Increased from 8
    transform: [{ scale: 1.02 }], // Slightly larger for emphasis
  },
  primaryButtonInner: {
    paddingVertical: 24, // Increased from 20
    paddingHorizontal: 40, // Increased from 32
    alignItems: 'center',
    borderRadius: 20, // Increased from 16
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 22, // Increased from 20
    fontWeight: '800', // Increased from '700'
  },
  secondaryButton: {
    borderWidth: 3, // Increased from 2
    borderColor: Colors.primary,
    paddingVertical: 22, // Increased from 18
    paddingHorizontal: 40, // Increased from 32
    borderRadius: 20, // Increased from 16
    alignItems: 'center',
    backgroundColor: Colors.white,
    shadowColor: Colors.gray[300],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 20, // Increased from 18
    fontWeight: '700', // Increased from '600'
  },
  errorText: {
    fontSize: 20, // Increased from 18
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 32, // Increased from 24
  },
});