import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { tools, toolsByCategory, categoryTranslations } from "@/constants/tools";
import { useUnifiedStore } from "@/store/unified-store";
import { CategorySection } from "@/components/CategorySection";
import UserCountSlider from "@/components/UserCountSlider";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { ImpactfulHook } from "@/components/ImpactfulHook";
import { CostComparisonChart } from "@/components/CostComparisonChart";
import { EnhancedDocumentGenerator } from "@/components/EnhancedDocumentGenerator";
import { LarkInfoSection } from "@/components/LarkInfoSection";
import { CallToActionSection } from "@/components/CallToActionSection";
import { CompanyInfoBox } from "@/components/CompanyInfoBox";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ResultsSummary } from "@/components/ResultsSummary";

import { generateStoryProposal, generateFormalProposal, openDocumentInNewTab } from "@/utils/documentGenerator";
import Colors from "@/constants/colors";
import { getResponsiveDimensions, spacing } from "@/constants/responsive";

const categories = Object.keys(toolsByCategory);

export default function UnifiedSimulatorScreen() {
  const {
    companyName,
    industry,
    employeeCount,
    headquarters,
    selectedTools,
    currentChallenges,
    expectedImprovements,
    calculationResults,
    mode,
    setCompanyName,
    setIndustry,
    setEmployeeCount,
    setHeadquarters,
    setMode,
    toggleTool,
    setChallenges,
    setImprovements,
    calculateResults,
    reset,
  } = useUnifiedStore();

  const [isReady, setIsReady] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isGeneratingDoc, setIsGeneratingDoc] = useState(false);
  const [docGenType, setDocGenType] = useState<'story' | 'formal' | null>(null);

  const {
    isDesktop,
    containerWidth,
    horizontalPadding,
    verticalPadding,
  } = getResponsiveDimensions();

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (selectedTools.length > 0) {
      calculateResults();
    }
  }, [selectedTools, employeeCount]);

  useEffect(() => {
    setShowResults(selectedTools.length > 0 && calculationResults !== null);
  }, [selectedTools.length, calculationResults]);

  if (!isReady) {
    return (
      <SafeAreaView style={styles.container}>
        <LoadingSpinner message="統合シミュレーターを初期化中..." />
      </SafeAreaView>
    );
  }

  const handleModeSwitch = (newMode: 'simple' | 'advanced' | 'enhanced' | 'unified') => {
    setMode(newMode);
  };

  const handleGenerateStoryProposal = async () => {
    try {
      if (!calculationResults) return;
      
      setIsGeneratingDoc(true);
      setDocGenType('story');

      const userInputs = {
        companyName: companyName || '貴社',
        industry: industry || 'IT',
        employeeCount,
        selectedTools: selectedTools.map(tool => ({
          id: tool.id,
          name: tool.name,
          pricePerUser: tool.pricePerUser,
          totalMonthlyCost: (tool.customMonthlyFee || tool.pricePerUser * employeeCount),
        })),
        currentChallenges,
        expectedImprovements,
      };

      const storyData = {
        persona: {
          role: industry === 'IT' ? 'プロジェクトマネージャー' : '部門責任者',
          name: '山田太郎',
        },
        beforeScenarioDetailed: '複数のツールを使い分けることで、情報の分散と非効率な業務フローが発生しています。毎日多くの時間を情報の検索と統合に費やし、本来の価値創造活動に集中できない状況です。',
        afterScenarioDetailed: 'Larkの統合プラットフォームにより、全ての業務が一元化され、情報へのアクセスが瞬時に行えるようになりました。チームの生産性が大幅に向上し、創造的な業務に集中できる環境が実現しました。',
        keyResults: [
          `${employeeCount}名の従業員の生産性が平均30%向上`,
          '情報検索時間を月間100時間削減',
          'プロジェクト遅延率が40%改善',
        ],
      };

      // シミュレート遅延（UX改善のため）
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const htmlContent = generateStoryProposal(userInputs, { ...calculationResults, reductionPercentage: calculationResults.savingsPercentage }, storyData);
      openDocumentInNewTab(htmlContent);
    } catch (error) {
      console.error('Story proposal generation failed:', error);
      alert('ストーリー提案書の生成に失敗しました。再試行してください。');
    } finally {
      setIsGeneratingDoc(false);
      setDocGenType(null);
    }
  };

  const handleGenerateFormalProposal = async () => {
    try {
      if (!calculationResults) return;
      
      setIsGeneratingDoc(true);
      setDocGenType('formal');

      const userInputs = {
        companyName: companyName || '貴社',
        industry: industry || 'IT',
        employeeCount,
        selectedTools: selectedTools.map(tool => ({
          id: tool.id,
          name: tool.name,
          pricePerUser: tool.pricePerUser,
          totalMonthlyCost: (tool.customMonthlyFee || tool.pricePerUser * employeeCount),
        })),
        currentChallenges,
        expectedImprovements,
      };

      // シミュレート遅延（UX改善のため）
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const htmlContent = generateFormalProposal(userInputs, { ...calculationResults, reductionPercentage: calculationResults.savingsPercentage });
      openDocumentInNewTab(htmlContent);
    } catch (error) {
      console.error('Formal proposal generation failed:', error);
      alert('正式提案書の生成に失敗しました。再試行してください。');
    } finally {
      setIsGeneratingDoc(false);
      setDocGenType(null);
    }
  };

  // Removed summaryMetrics as we're using new components

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header 
        title="コスト比較結果" 
        subtitle={`${employeeCount}人の利用者で計算`}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding, paddingVertical: verticalPadding }]}
        showsVerticalScrollIndicator={false}
      >
      <View style={[styles.contentContainer, { width: isDesktop ? containerWidth : '100%', alignSelf: 'center' }]}>
        
        {/* 衝撃的なフック */}
        <ImpactfulHook />
        
        {/* 会社情報表示 - Only show when no results */}
        {!showResults && (
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{companyName || '貴社'}</Text>
            <Text style={styles.companyDetails}>
              {industry} | {employeeCount}名 | {selectedTools.length}ツール選択中
            </Text>
          </View>
        )}
        
        {/* 結果表示 */}
        {showResults && calculationResults && (
          <>
            <ResultsSummary
              metrics={{
                annualCostReduction: calculationResults.annualSavings || 0,
                reductionRate: calculationResults.savingsPercentage || 0,
                roi: calculationResults.roi || 0,
                paybackPeriod: calculationResults.paybackPeriod || 0
              }}
              companyName={companyName}
              employeeCount={employeeCount}
            />
            
            <CompanyInfoBox
              companyName={companyName}
              industry={industry}
              employeeCount={employeeCount}
              selectedTools={selectedTools}
              onUpdateCompanyName={setCompanyName}
              onUpdateIndustry={setIndustry}
              onUpdateEmployeeCount={setEmployeeCount}
              onToggleTool={toggleTool}
              toolsByCategory={toolsByCategory}
              categoryTranslations={categoryTranslations}
            />
            
            <CostComparisonChart
              selectedTools={selectedTools}
              employeeCount={employeeCount}
              larkCost={calculationResults.larkMonthlyCost || 0}
              savingsAmount={calculationResults.annualSavings || 0}
              savingsPercentage={calculationResults.savingsPercentage || 0}
            />

            <EnhancedDocumentGenerator
              onGenerateStoryProposal={handleGenerateStoryProposal}
              onGenerateFormalProposal={handleGenerateFormalProposal}
              isGeneratingDoc={isGeneratingDoc}
              docGenType={docGenType}
            />

            <LarkInfoSection />
          </>
        )}
        
        {/* ツール再選択セクション - Only show if no results */}
        {!showResults && (
          <View style={styles.toolSelection}>
            <Text style={styles.sectionTitle}>ツール選択を調整</Text>
            <UserCountSlider 
              value={employeeCount}
              onChange={setEmployeeCount}
            />
            
            <View style={styles.selectedToolsDisplay}>
              <Text style={styles.selectionCount}>{selectedTools.length}</Text>
              <Text style={styles.selectionText}>ツールを選択中</Text>
            </View>
            
            {categories.slice(0, 2).map((category) => (
              <CategorySection
                key={category}
                category={categoryTranslations[category] || category}
                tools={toolsByCategory[category]}
                selectedTools={selectedTools.map(t => t.id)}
                onToggleTool={toggleTool}
              />
            ))}
            
            {/* アクションボタン */}
            <View style={styles.actionButtons}>
              <Button
                title="リセット"
                onPress={reset}
                variant="outline"
                size="medium"
              />
              <Button
                title="最初に戻る"
                onPress={() => router.push("/")}
                variant="secondary"
                size="medium"
              />
            </View>
          </View>
        )}
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
  },
  contentContainer: {
    flex: 1,
  },
  companyInfo: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.sm,
  },
  companyDetails: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  toolSelection: {
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
  selectedToolsDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary + '20',
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  selectionCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: spacing.sm,
  },
  selectionText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginHorizontal: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});