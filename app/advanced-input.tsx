import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import { FormSection } from '@/components/FormSection';
import { EmployeeCountInput } from '@/components/EmployeeCountInput';
import { ToolFeeInput } from '@/components/ToolFeeInput';
import { ChallengeSelector } from '@/components/ChallengeSelector';
import { ImprovementSelector } from '@/components/ImprovementSelector';
import Button from '@/components/Button';
import { useAdvancedSimulatorStore } from '@/store/advanced-simulator-store';
import Colors from '@/constants/colors';
import { isDesktop, spacing, getResponsiveDimensions } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';

export default function AdvancedInputScreen() {
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
    updateToolFee,
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
      // 計算を実行して結果画面へ
      calculateResults();
      router.push('/advanced-results');
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return employeeCount > 0;
      case 2:
        return selectedTools.length > 0;
      case 3:
        return currentChallenges.some(c => c.selected);
      case 4:
        return expectedImprovements.some(i => i.selected);
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FormSection
            title="ステップ1: 基本情報"
            description="まず、貴社の従業員数を入力してください"
          >
            <EmployeeCountInput
              value={employeeCount}
              onChange={setEmployeeCount}
            />
          </FormSection>
        );
      
      case 2:
        return (
          <FormSection
            title="ステップ2: 利用中のツール"
            description="現在利用している業務ツールと費用を入力してください"
          >
            <ToolFeeInput
              selectedTools={selectedTools}
              onAdd={addTool}
              onRemove={removeTool}
              onUpdate={updateToolFee}
            />
          </FormSection>
        );
      
      case 3:
        return (
          <FormSection
            title="ステップ3: 現状の課題"
            description="現在抱えている業務上の課題を選択してください"
          >
            <ChallengeSelector
              challenges={currentChallenges}
              onToggle={toggleChallenge}
              onUpdateCustomText={updateChallengeCustomText}
            />
          </FormSection>
        );
      
      case 4:
        return (
          <FormSection
            title="ステップ4: 期待する効果"
            description="Lark導入により期待する改善効果を選択してください"
          >
            <ImprovementSelector
              improvements={expectedImprovements}
              onToggle={toggleImprovement}
            />
          </FormSection>
        );
      
      default:
        return null;
    }
  };

  const renderProgressBar = () => {
    return (
      <View style={styles.progressContainer}>
        {[...Array(totalSteps)].map((_, index) => (
          <View
            key={index}
            style={[
              styles.progressStep,
              index < currentStep && styles.progressStepCompleted,
              index === currentStep - 1 && styles.progressStepActive,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { paddingHorizontal: horizontalPadding }]}>
          <Header
            title="Lark乗り換えシミュレーター"
            subtitle="詳細版"
          />

          {renderProgressBar()}

          {renderStepContent()}

          <View style={styles.navigation}>
            {currentStep > 1 && (
              <TouchableOpacity
                style={styles.backButton}
                onPress={handlePrevious}
              >
                <Ionicons name="arrow-back" size={20} color={Colors.gray600} />
                <Text style={styles.backButtonText}>戻る</Text>
              </TouchableOpacity>
            )}
            
            <Button
              title={currentStep === totalSteps ? '結果を見る' : '次へ'}
              onPress={handleNext}
              variant="primary"
              disabled={!canProceed()}
              style={styles.nextButton}
            />
          </View>

          {currentStep === 1 && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetAll}
            >
              <Text style={styles.resetButtonText}>入力内容をリセット</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.md,
    maxWidth: isDesktop ? 800 : '100%',  
    width: '100%',
    alignSelf: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    marginVertical: 24,
    gap: 8,
  },
  progressStep: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.gray200,
    borderRadius: 2,
  },
  progressStepCompleted: {
    backgroundColor: Colors.primary,
  },
  progressStepActive: {
    backgroundColor: Colors.primary,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  backButtonText: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray600,
    marginLeft: 4,
  },
  nextButton: {
    flex: 1,
    marginLeft: 16,
  },
  resetButton: {
    alignSelf: 'center',
    padding: 12,
    marginTop: 8,
  },
  resetButtonText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray500,
    textDecorationLine: 'underline',
  },
});