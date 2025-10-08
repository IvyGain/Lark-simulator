import React from 'react'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { ResultsSummary } from '@/components/ResultsSummary'
import { ToolsBreakdownTable } from '@/components/ToolsBreakdownTable'
import { VisualCostComparison } from '@/components/VisualCostComparison'

import { useSimulatorStore } from '@/store/simulator-store'
import Colors from '@/constants/colors'

export default function ResultsPage() {
  const router = useRouter()
  
  const {
    userCount,
    calculateCurrentCost,
    calculateLarkCost,
    calculateSavings,
    getSelectedToolsWithPrices,
    resetSelection
  } = useSimulatorStore()

  // Calculate costs using new store methods
  const currentMonthlyCost = calculateCurrentCost()
  const larkMonthlyCost = calculateLarkCost()
  const monthlySavings = calculateSavings()
  const annualSavings = monthlySavings * 12
  
  const reductionPercentage = currentMonthlyCost > 0 
    ? (monthlySavings / currentMonthlyCost) * 100 
    : 0
  
  const roi = larkMonthlyCost > 0 
    ? (annualSavings / (larkMonthlyCost * 12)) * 100 
    : 0
  
  const paybackPeriod = monthlySavings > 0 
    ? (larkMonthlyCost * 12) / annualSavings 
    : 0

  const selectedToolsWithPrices = getSelectedToolsWithPrices()

  const summaryMetrics = {
    annualCostReduction: annualSavings,
    reductionRate: reductionPercentage,
    roi: roi,
    paybackPeriod: paybackPeriod
  }

  const handleReset = () => {
    resetSelection()
    router.push('/')
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
      industry: 'IT',
      teamSize: userCount,
      selectedProblems: ['コミュニケーション効率化', 'ツール統合'],
      selectedTools: selectedToolsWithPrices.map(item => item.tool.name),
      monthlyBudget: currentMonthlyCost
    }

    const calculationResults = {
      currentMonthlyCost,
      larkMonthlyCost,
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod: paybackPeriod
    }

    const storyData = {
      persona: `IT業界の${userCount}名規模のチーム`,
      currentSituation: '複数のツールを使い分けることで、情報が分散し、コミュニケーションが非効率になっている',
      afterLark: 'Larkで全ての業務を統合し、チーム全体の生産性が大幅に向上',
      keyResults: [
        `${userCount}名の従業員の生産性が平均30%向上`,
        '情報検索時間を月間100時間削減',
        'プロジェクト遅延率が40%改善',
      ],
    }

    const htmlContent = generateStoryProposal(userInputs, calculationResults, storyData)
    openDocumentInNewTab(htmlContent)
  }

  const handleGenerateFormalProposal = () => {
    const userInputs = {
      industry: 'IT',
      teamSize: userCount,
      selectedProblems: ['コミュニケーション効率化', 'ツール統合'],
      selectedTools: selectedToolsWithPrices.map(item => item.tool.name),
      monthlyBudget: currentMonthlyCost
    }

    const calculationResults = {
      currentMonthlyCost,
      larkMonthlyCost,
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod: paybackPeriod
    }

    const htmlContent = generateFormalProposal(userInputs, calculationResults)
    openDocumentInNewTab(htmlContent)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleReset} style={styles.backButton}>
            <Text style={styles.backButtonText}>← 新しい比較を開始</Text>
          </TouchableOpacity>
          
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{userCount}名</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{new Date().toLocaleDateString('ja-JP')}</Text>
            </View>
          </View>
        </View>

        {/* Results Summary */}
        <ResultsSummary
          currentMonthlyCost={currentMonthlyCost}
          larkMonthlyCost={larkMonthlyCost}
          monthlySavings={monthlySavings}
          annualSavings={annualSavings}
          selectedTools={selectedToolsWithPrices}
          teamSize={userCount}
        />

        {/* Visual Cost Comparison */}
        <VisualCostComparison
          currentMonthlyCost={currentMonthlyCost}
          employeeCount={userCount}
          selectedTools={selectedToolsWithPrices.map(item => ({
            toolId: item.tool.name,
            monthlyFee: item.price
          }))}
        />

        {/* Tools Breakdown */}
        <ToolsBreakdownTable
          selectedTools={selectedToolsWithPrices}
          employeeCount={userCount}
        />

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>今すぐLarkで業務効率を革新しましょう</Text>
          <Text style={styles.ctaSubtitle}>
            {userCount}名規模で年間{formatCurrency(annualSavings)}の削減効果を実現
          </Text>
          
          <View style={styles.ctaButtons}>
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.primaryButtonText}>今すぐ無料で始める</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>専門家に相談する</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[50],
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: Colors.gray[600],
    fontSize: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: Colors.gray[200],
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.gray[700],
  },
  ctaSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 24,
    marginTop: 24,
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButtons: {
    width: '100%',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
})