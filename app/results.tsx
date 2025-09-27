import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { tools, LARK_PRICE_PER_USER } from "@/constants/tools";
import { useSimulatorStore } from "@/store/simulator-store";
import { useAdvancedSimulatorStore } from "@/store/advanced-simulator-store";
import { ResultsSummary } from "@/components/ResultsSummary";
import { PersonalizedStoryPreview } from "@/components/PersonalizedStoryPreview";
import { DocumentGeneratorControls } from "@/components/DocumentGeneratorControls";
import { VisualCostComparison } from "@/components/VisualCostComparison";
import { CTASection } from "@/components/CTASection";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Colors from "@/constants/colors";
import { getResponsiveDimensions, spacing } from "@/constants/responsive";
import { generateStoryProposal, generateFormalProposal, openDocumentInNewTab } from "@/utils/documentGenerator";

export default function ResultsScreen() {
  const { 
    selectedTools: selectedToolIds, 
    userCount, 
    resetSelection,
    calculateAnnualCost
  } = useSimulatorStore();
  
  const advancedStore = useAdvancedSimulatorStore();
  const [isReady, setIsReady] = useState(false);

  const {
    isDesktop,
    containerWidth,
    horizontalPadding,
    verticalPadding,
    cardPadding,
    bodySize,
  } = getResponsiveDimensions();

  useEffect(() => {
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  // Get full tool objects with pricing
  const selectedTools = selectedToolIds
    .map(id => {
      const tool = tools.find(t => t.id === id);
      if (!tool) return null;
      
      return {
        id: tool.id,
        name: tool.name,
        pricePerUser: tool.pricePerUser,
        totalMonthlyCost: tool.pricePerUser * userCount
      };
    })
    .filter(Boolean) as Array<{
      id: string;
      name: string;
      pricePerUser: number;
      totalMonthlyCost: number;
    }>;
  
  // Sort tools by cost (highest first)
  selectedTools.sort((a, b) => b.totalMonthlyCost - a.totalMonthlyCost);
  
  // Calculate costs
  const currentMonthlyCost = selectedTools.reduce(
    (total, tool) => total + tool.totalMonthlyCost,
    0
  );
  
  const larkMonthlyCost = LARK_PRICE_PER_USER * userCount;
  const monthlySavings = currentMonthlyCost - larkMonthlyCost;
  const annualSavings = calculateAnnualCost(monthlySavings);
  
  // Calculate ROI metrics
  const reductionPercentage = currentMonthlyCost > 0 
    ? Math.round((monthlySavings / currentMonthlyCost) * 100)
    : 0;
  
  const roi = larkMonthlyCost > 0
    ? Math.round((annualSavings / (larkMonthlyCost * 12)) * 100)
    : 0;
    
  const paybackPeriod = annualSavings > 0
    ? Math.ceil((larkMonthlyCost * 12) / annualSavings * 12)
    : 0;

  // Prepare metrics for ResultsSummary
  const summaryMetrics = [
    {
      id: 'cost_reduction',
      label: '年間削減コスト',
      value: annualSavings.toLocaleString(),
      prefix: '¥',
      highlight: true,
    },
    {
      id: 'reduction_rate',
      label: '削減率',
      value: reductionPercentage,
      suffix: '%',
    },
    {
      id: 'roi',
      label: 'ROI',
      value: roi,
      suffix: '%',
    },
    {
      id: 'payback_period',
      label: '投資回収期間',
      value: paybackPeriod,
      suffix: 'ヶ月',
    },
  ];

  const handleReset = () => {
    resetSelection();
    router.replace("/");
  };

  const handleGenerateStoryProposal = () => {
    // Prepare user inputs
    const userInputs = {
      companyName: advancedStore.companyName,
      industry: advancedStore.industry || 'IT',
      employeeCount: userCount,
      selectedTools,
      currentChallenges: advancedStore.currentChallenges.filter(c => c.selected).map(c => c.label),
      expectedImprovements: advancedStore.expectedImprovements.filter(i => i.selected).map(i => i.label),
    };

    // Prepare calculation results
    const calculationResults = {
      currentMonthlyCost,
      larkMonthlyCost,
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod,
      reductionPercentage,
    };

    // Generate story data (simplified version)
    const storyData = {
      persona: {
        role: 'プロジェクトマネージャー',
        name: '山田太郎',
      },
      beforeScenarioDetailed: '毎日、メール、チャット、ドキュメント管理ツールを切り替えながら業務を行い、情報の検索と共有に多くの時間を費やしています。会議の準備と議事録作成にも時間がかかり、本来のプロジェクト管理業務に集中できない状況です。',
      afterScenarioDetailed: 'Larkを導入してから、すべての情報が一元化され、必要な情報に瞬時にアクセスできるようになりました。AI議事録機能により会議の効率も大幅に向上し、プロジェクトの進捗管理と戦略立案に集中できる時間が増えました。',
      keyResults: [
        `${userCount}名の従業員の生産性が平均30%向上`,
        '情報検索時間を月間100時間削減',
        'プロジェクト遅延率が40%改善',
      ],
    };

    const htmlContent = generateStoryProposal(userInputs, calculationResults, storyData);
    openDocumentInNewTab(htmlContent);
  };

  const handleGenerateFormalProposal = () => {
    // Prepare user inputs
    const userInputs = {
      companyName: advancedStore.companyName,
      industry: advancedStore.industry || 'IT',
      employeeCount: userCount,
      selectedTools,
      currentChallenges: advancedStore.currentChallenges.filter(c => c.selected).map(c => c.label),
      expectedImprovements: advancedStore.expectedImprovements.filter(i => i.selected).map(i => i.label),
    };

    // Prepare calculation results
    const calculationResults = {
      currentMonthlyCost,
      larkMonthlyCost,
      monthlySavings,
      annualSavings,
      roi,
      paybackPeriod,
      reductionPercentage,
    };

    const htmlContent = generateFormalProposal(userInputs, calculationResults);
    openDocumentInNewTab(htmlContent);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header 
        title="Lark 詳細シミュレーション結果" 
        subtitle="貴社だけの導入計画書"
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding, paddingVertical: verticalPadding }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.contentContainer, { width: isDesktop ? containerWidth : '100%', alignSelf: 'center' }]}>
          {/* Section 1: Results Summary */}
          <ResultsSummary
            annualSavings={annualSavings}
            savingsPercentage={reductionPercentage}
            roi={roi}
            paybackPeriod={paybackPeriod}
          />

          {/* Section 2: Visual Cost Comparison */}
          <View style={styles.section}>
            <VisualCostComparison
              currentMonthlyCost={currentMonthlyCost}
              employeeCount={userCount}
              selectedTools={selectedTools.map(tool => ({ toolId: tool.id, monthlyFee: tool.totalMonthlyCost }))}
            />
          </View>

          {/* Section 3: Personalized Story Preview */}
          <PersonalizedStoryPreview
            industry={advancedStore.industry || 'IT'}
            selectedProblems={advancedStore.currentChallenges
              .filter(c => c.selected)
              .map(c => c.id === 'other' && c.customText ? c.customText : c.label)
            }
            employeeCount={userCount}
            onGenerateStory={handleGenerateStoryProposal}
          />

          {/* Section 4: Document Generation Controls */}
          <DocumentGeneratorControls
            onGenerateStoryProposal={handleGenerateStoryProposal}
            onGenerateFormalProposal={handleGenerateFormalProposal}
          />

          {/* Section 5: CTA Section */}
          <CTASection />
          
          <View style={[styles.footer, { gap: isDesktop ? spacing.md : spacing.sm }]}>
            <Button
              title="新しいシミュレーション"
              onPress={handleReset}
              variant="outline"
              size="small"
              style={styles.resetButton}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100] as string,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "web" ? spacing.xl : spacing.xxl * 2,
    alignItems: 'center',
  },
  contentContainer: {
    maxWidth: '100%',
  },
  section: {
    marginBottom: spacing.lg,
  },
  footer: {
    marginTop: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.xl,
    width: '100%',
  },
  resetButton: {
    alignSelf: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.text,
  },
});