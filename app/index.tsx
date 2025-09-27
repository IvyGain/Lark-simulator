import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, TextInput, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { tools, toolsByCategory, categoryTranslations } from "@/constants/tools";
import { useUnifiedStore } from "@/store/unified-store";
import CategorySection from "@/components/CategorySection";
import UserCountSlider from "@/components/UserCountSlider";
import Button from "@/components/Button";
import Header from "@/components/Header";
import { ImpactfulHook } from "@/components/ImpactfulHook";
import Colors from "@/constants/colors";
import { getResponsiveDimensions, spacing } from "@/constants/responsive";

export default function ToolSelectionScreen() {
  const { 
    selectedTools, 
    employeeCount, 
    toggleTool, 
    setEmployeeCount,
    companyName,
    industry,
    headquarters,
    prefecture,
    setCompanyName,
    setIndustry,
    setHeadquarters,
    setPrefecture,
    calculateResults
  } = useUnifiedStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const {
    isDesktop,
    containerWidth,
    horizontalPadding,
    verticalPadding,
    maxContentWidth,
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

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      if (selectedTools.length === 0) {
        return;
      }
      setIsLoading(true);
      // 統合ページに遷移する前に、計算を実行
      setTimeout(() => {
        try {
          console.log("Selected tools:", selectedTools);
          console.log("Company info:", { companyName, industry, employeeCount });
          
          // 計算を実行してから遷移
          if (calculateResults) {
            calculateResults();
          }
          
          console.log("Navigating to unified-simulator...");
          setIsLoading(false);
          router.push("/unified-simulator");
        } catch (error) {
          console.error("Navigation error:", error);
          alert("画面遷移でエラーが発生しました。もう一度お試しください。");
          setIsLoading(false);
        }
      }, 500);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return companyName.trim().length > 0;
      case 2: return industry.length > 0;
      case 3: return employeeCount > 0;
      case 4: return selectedTools.length > 0;
      default: return false;
    }
  };

  // Get categories and translate them
  const categories = Object.keys(toolsByCategory);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>会社名をお聞かせください</Text>
            <Text style={styles.stepSubtitle}>シミュレーション結果を元に提案書を作成します</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>会社名</Text>
              <TextInput
                style={styles.textInput}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="株式会社サンプル"
                placeholderTextColor={Colors.gray[400]}
              />
            </View>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>業種をお選びください</Text>
            <Text style={styles.stepSubtitle}>業種に応じた最適なソリューションを提案します</Text>
            <View style={styles.industryGrid}>
              {['IT・ソフトウェア', '製造業', '商社・貿易', '建設・不動産', '医療・ヘルスケア', 'その他'].map((ind) => (
                <TouchableOpacity
                  key={ind}
                  style={[styles.industryButton, industry === ind && styles.industryButtonSelected]}
                  onPress={() => setIndustry(ind)}
                >
                  <Text style={[styles.industryButtonText, industry === ind && styles.industryButtonTextSelected]}>
                    {ind}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>従業員数をお聞かせください</Text>
            <Text style={styles.stepSubtitle}>最適なプランとコスト計算を行います</Text>
            <UserCountSlider 
              value={employeeCount}
              onChange={setEmployeeCount}
            />
          </View>
        );

      case 4:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>現在使用中のツールを選択してください</Text>
            <Text style={styles.stepSubtitle}>選択いただいたツールとLarkの料金を比較します</Text>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <CategorySection
                  key={category}
                  category={categoryTranslations[category] || category}
                  tools={toolsByCategory[category]}
                  selectedTools={selectedTools.map(tool => tool.id)}
                  onToggleTool={toggleTool}
                />
              ))}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Header 
        title="Lark導入効果シミュレーター" 
        subtitle={`ステップ ${currentStep}/4`}
      />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressInner}>
          <View style={styles.progressBar}>
            {[1, 2, 3, 4].map((step) => (
              <View
                key={step}
                style={[
                  styles.progressDot,
                  step <= currentStep ? styles.progressDotActive : styles.progressDotInactive
                ]}
              />
            ))}
          </View>
        </View>
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={[styles.scrollContent, { paddingHorizontal: horizontalPadding, paddingVertical: verticalPadding }]}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 1 && (
          <View style={{ width: isDesktop ? containerWidth : '100%', alignSelf: 'center' }}>
            <ImpactfulHook />
          </View>
        )}
        
        <View style={[{ width: isDesktop ? containerWidth : '100%', alignSelf: 'center' }]}>
          {renderStep()}
        </View>
        
        <View style={[styles.footer, { width: isDesktop ? Math.min(containerWidth, 600) : '100%', alignSelf: 'center' }]}>
          <View style={styles.buttonRow}>
            {currentStep > 1 && (
              <Button
                title="戻る"
                onPress={handleBack}
                variant="outline"
                size={isDesktop ? "large" : "medium"}
                style={styles.backButton}
              />
            )}
            <Button
              title={currentStep === 4 ? "シミュレーション結果を見る" : "次へ"}
              onPress={handleNext}
              disabled={!canProceed()}
              loading={isLoading}
              size={isDesktop ? "large" : "medium"}
              style={styles.nextButton}
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
  controlsContainer: {
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    alignItems: 'center',
  },
  controlsInner: {
    maxWidth: '100%',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Platform.OS === "web" ? spacing.xl : spacing.xxl * 2,
    alignItems: 'center',
  },
  categoriesContainer: {
    maxWidth: '100%',
  },
  footer: {
    marginTop: spacing.lg,
    alignItems: "center",
    marginBottom: spacing.xl,
    maxWidth: '100%',
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
  progressContainer: {
    paddingVertical: spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    alignItems: 'center',
  },
  progressInner: {
    alignItems: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: spacing.xs,
  },
  progressDotActive: {
    backgroundColor: Colors.primary,
  },
  progressDotInactive: {
    backgroundColor: Colors.gray[300] as string,
  },
  stepContainer: {
    padding: spacing.lg,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  stepSubtitle: {
    fontSize: 16,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  textInput: {
    fontSize: 18,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  industryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  industryButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderRadius: 25,
    backgroundColor: Colors.white,
    minWidth: 150,
    alignItems: 'center',
    margin: spacing.xs,
    flex: 1,
  },
  industryButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  industryButtonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  industryButtonTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  prefectureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  prefectureButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderRadius: 20,
    backgroundColor: Colors.white,
    minWidth: 100,
    alignItems: 'center',
    margin: spacing.xs,
  },
  prefectureButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  prefectureButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  prefectureButtonTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    flex: 1,
    marginRight: spacing.md,
  },
  nextButton: {
    flex: 2,
  },
});