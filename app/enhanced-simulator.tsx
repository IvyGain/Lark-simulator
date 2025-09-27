import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { isDesktop, spacing, getResponsiveDimensions } from '@/constants/responsive';
import Header from '@/components/Header';
import { EnhancedEmployeeInput } from '@/components/EnhancedEmployeeInput';
import CategorySection from '@/components/CategorySection';
import { ChallengeSelector } from '@/components/ChallengeSelector';
import { ImprovementSelector } from '@/components/ImprovementSelector';
import Button from '@/components/Button';
import { useAdvancedSimulatorStore } from '@/store/advanced-simulator-store';
import { toolsByCategory, categoryTranslations } from '@/constants/tools';
import { Ionicons } from '@expo/vector-icons';

export default function EnhancedSimulatorScreen() {
  const router = useRouter();
  const { horizontalPadding } = getResponsiveDimensions();
  
  const {
    employeeCount,
    selectedTools,
    currentChallenges,
    expectedImprovements,
    setEmployeeCount,
    addTool,
    removeTool,
    toggleChallenge,
    updateChallengeCustomText,
    toggleImprovement,
    calculateResults,
    resetAll,
  } = useAdvancedSimulatorStore();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // 最終ステップで計算実行して結果画面へ
      calculateResults();
      router.push('/enhanced-results');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return employeeCount > 0;
      case 2: return selectedTools.length > 0;
      case 3: return currentChallenges.some(c => c.selected);
      case 4: return expectedImprovements.some(i => i.selected);
      default: return true;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return '従業員数を設定してください';
      case 2: return '現在使用中のツールを選択してください';
      case 3: return '現在抱えている課題を教えてください';
      case 4: return 'Larkに期待することを選択してください';
      default: return 'Larkコストシミュレーター';
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return 'スライダーまたは直接入力で人数を調整してください';
      case 2: return '複数選択可能です。該当するツールをクリックしてください';
      case 3: return '現在の業務で困っていることを選択してください（複数選択可）';
      case 4: return 'Lark導入で実現したいことを選択してください（複数選択可）';
      default: return '';
    }
  };

  // クイック版スタイルのツール選択用データ変換
  const getSelectedToolsForQuickStyle = () => {
    const toolIds: string[] = [];
    selectedTools.forEach(toolDetail => {
      // toolDetailからtoolIdを取得してtoolsByCategory内で検索
      for (const category of Object.values(toolsByCategory)) {
        const foundTool = category.find(t => t.name === toolDetail.toolId || t.id === toolDetail.toolId);
        if (foundTool) {
          toolIds.push(foundTool.id);
          break;
        }
      }
    });
    return toolIds;
  };

  const handleToolToggle = (toolId: string) => {
    // toolsByCategory からツール情報を取得
    let foundTool = null;
    for (const category of Object.values(toolsByCategory)) {
      const tool = category.find(t => t.id === toolId);
      if (tool) {
        foundTool = tool;
        break;
      }
    }

    if (!foundTool) return;

    // 既に選択されているかチェック
    const existingTool = selectedTools.find(t => 
      t.toolId === foundTool.name || t.toolId === foundTool.id
    );

    if (existingTool) {
      // 削除
      removeTool(existingTool.toolId);
    } else {
      // 追加
      addTool({
        toolId: foundTool.name,
        monthlyFee: foundTool.pricePerUser,
        annualFee: foundTool.pricePerUser * 12,
        isAnnualBilling: false,
      });
    }
  };

  // プログレスインジケーター
  const ProgressIndicator = () => (
    <View style={styles.progressContainer}>
      {Array.from({ length: totalSteps }, (_, index) => (
        <React.Fragment key={index}>
          <View style={[
            styles.progressStep,
            index + 1 <= currentStep && styles.progressStepActive,
            index + 1 < currentStep && styles.progressStepCompleted,
          ]}>
            <Text style={[
              styles.progressStepText,
              index + 1 <= currentStep && styles.progressStepTextActive,
            ]}>
              {index + 1}
            </Text>
          </View>
          {index < totalSteps - 1 && (
            <View style={[
              styles.progressLine,
              index + 1 < currentStep && styles.progressLineCompleted,
            ]} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
            <Header 
              title={getStepTitle()}
              subtitle={getStepSubtitle()}
            />

            <ProgressIndicator />

            <View style={styles.stepContent}>
              {/* ステップ1: 従業員数設定 */}
              {currentStep === 1 && (
                <View style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <Ionicons name="people" size={32} color={Colors.primary} />
                    <Text style={styles.stepCardTitle}>従業員数の設定</Text>
                  </View>
                  <EnhancedEmployeeInput
                    value={employeeCount}
                    onChange={setEmployeeCount}
                    min={1}
                    max={1000}
                  />
                </View>
              )}

              {/* ステップ2: ツール選択 */}
              {currentStep === 2 && (
                <View style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <Ionicons name="apps" size={32} color={Colors.primary} />
                    <Text style={styles.stepCardTitle}>使用中のツール選択</Text>
                  </View>
                  
                  <View style={styles.toolCategories}>
                    {Object.keys(toolsByCategory).map((category) => (
                      <CategorySection
                        key={category}
                        category={categoryTranslations[category] || category}
                        tools={toolsByCategory[category]}
                        selectedTools={getSelectedToolsForQuickStyle()}
                        onToggleTool={handleToolToggle}
                      />
                    ))}
                  </View>

                  {selectedTools.length > 0 && (
                    <View style={styles.selectionSummary}>
                      <View style={styles.selectionInfo}>
                        <Ionicons name="checkmark-circle" size={24} color={Colors.success} />
                        <Text style={styles.selectionText}>
                          {selectedTools.length}個のツールを選択中
                        </Text>
                      </View>
                      <Text style={styles.selectionDetail}>
                        月額概算: ¥{selectedTools.reduce((total, tool) => total + (tool.monthlyFee * employeeCount), 0).toLocaleString()}
                      </Text>
                    </View>
                  )}
                </View>
              )}

              {/* ステップ3: 現在の課題 */}
              {currentStep === 3 && (
                <View style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <Ionicons name="warning" size={32} color={Colors.warning} />
                    <Text style={styles.stepCardTitle}>現在抱えている課題</Text>
                  </View>
                  <ChallengeSelector
                    challenges={currentChallenges}
                    onToggle={toggleChallenge}
                    onUpdateCustomText={updateChallengeCustomText}
                  />
                </View>
              )}

              {/* ステップ4: 期待する改善効果 */}
              {currentStep === 4 && (
                <View style={styles.stepCard}>
                  <View style={styles.stepHeader}>
                    <Ionicons name="star" size={32} color={Colors.success} />
                    <Text style={styles.stepCardTitle}>Larkに期待すること</Text>
                  </View>
                  <ImprovementSelector
                    improvements={expectedImprovements}
                    onToggle={toggleImprovement}
                  />
                </View>
              )}
            </View>

            {/* ナビゲーションボタン */}
            <View style={styles.navigationContainer}>
              <View style={styles.navigationButtons}>
                {currentStep > 1 && (
                  <Button
                    title="前へ"
                    onPress={handleBack}
                    variant="outline"
                    style={styles.navButton}
                  />
                )}
                
                <Button
                  title={currentStep === totalSteps ? 'シミュレーション実行' : '次へ'}
                  onPress={handleNext}
                  variant="primary"
                  disabled={!canProceed()}
                  style={[styles.navButton, currentStep === 1 && styles.navButtonFull]}
                />
              </View>

              {/* ステップ情報 */}
              <View style={styles.stepInfo}>
                <Text style={styles.stepInfoText}>
                  {currentStep} / {totalSteps}
                </Text>
                <Text style={styles.stepInfoLabel}>
                  {currentStep === totalSteps ? '最終確認' : `ステップ ${currentStep}`}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.md,
    maxWidth: isDesktop ? 1000 : '100%',
    width: '100%',
    alignSelf: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  progressStep: {
    width: isDesktop ? 40 : 32,
    height: isDesktop ? 40 : 32,
    borderRadius: isDesktop ? 20 : 16,
    backgroundColor: Colors.gray[300] as string,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressStepActive: {
    backgroundColor: Colors.primary,
  },
  progressStepCompleted: {
    backgroundColor: Colors.success,
  },
  progressStepText: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.white,
  },
  progressStepTextActive: {
    color: Colors.white,
  },
  progressLine: {
    width: isDesktop ? 60 : 40,
    height: 2,
    backgroundColor: Colors.gray[300] as string,
    marginHorizontal: spacing.xs,
  },
  progressLineCompleted: {
    backgroundColor: Colors.success,
  },
  stepContent: {
    flex: 1,
    marginBottom: spacing.xl,
  },
  stepCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: isDesktop ? 32 : 24,
    marginBottom: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  stepCardTitle: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '700',
    color: Colors.gray[900],
    marginLeft: spacing.md,
  },
  toolCategories: {
    marginBottom: spacing.lg,
  },
  selectionSummary: {
    backgroundColor: Colors.success + '10',
    borderRadius: 16,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: Colors.success + '20',
    alignItems: 'center',
  },
  selectionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  selectionText: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.success,
    marginLeft: spacing.sm,
  },
  selectionDetail: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[700],
    fontWeight: '500',
  },
  navigationContainer: {
    marginTop: spacing.lg,
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  navButton: {
    flex: 1,
  },
  navButtonFull: {
    flex: 1,
  },
  stepInfo: {
    alignItems: 'center',
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  stepInfoText: {
    fontSize: isDesktop ? 32 : 28,
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  stepInfoLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    fontWeight: '500',
  },
});