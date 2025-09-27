import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';
import Button from './Button';

interface GeneratorButton {
  generatorType: 'story_proposal' | 'formal_proposal';
  label: string;
  icon: string;
  style: 'primary' | 'secondary';
  description: string;
}

interface DocumentGeneratorControlsProps {
  title?: string;
  description?: string;
  generatorButtons?: GeneratorButton[];
  onGenerateStoryProposal?: () => void;
  onGenerateFormalProposal?: () => void;
  isGeneratingDoc?: boolean;
  docGenType?: 'story' | 'formal' | null;
}

export function DocumentGeneratorControls({
  title = '稟議書・提案書の生成',
  description = 'シミュレーション結果を元に、目的に合わせた2種類のドキュメントを即座に作成できます。',
  generatorButtons = [
    {
      generatorType: 'story_proposal',
      label: 'ストーリー提案書を作成',
      icon: '📖',
      style: 'primary',
      description: '顧客へのプレゼンやチーム内の意識共有に最適。ストーリー事例を中心とした、感情に訴えかける提案書です。'
    },
    {
      generatorType: 'formal_proposal',
      label: '詳細な稟議書を作成',
      icon: '💼',
      style: 'secondary',
      description: '経営層や経理部門への上申に最適。投資対効果（ROI）やコスト分析など、データに基づいたロジカルな稟議書です。'
    }
  ],
  onGenerateStoryProposal,
  onGenerateFormalProposal,
  isGeneratingDoc = false,
  docGenType = null
}: DocumentGeneratorControlsProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewType, setPreviewType] = useState<'story' | 'formal'>('story');

  const handleGenerate = (type: 'story_proposal' | 'formal_proposal') => {
    if (type === 'story_proposal' && onGenerateStoryProposal) {
      onGenerateStoryProposal();
    } else if (type === 'formal_proposal' && onGenerateFormalProposal) {
      onGenerateFormalProposal();
    }
  };

  const handlePreview = (type: 'story' | 'formal') => {
    setPreviewType(type);
    setShowPreview(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.buttonsContainer}>
        {generatorButtons.map((button) => (
          <View key={button.generatorType} style={styles.buttonWrapper}>
            <View style={styles.buttonHeader}>
              <Text style={styles.buttonIcon}>{button.icon}</Text>
              <Text style={styles.buttonTitle}>{button.label}</Text>
            </View>
            
            <Text style={styles.buttonDescription}>{button.description}</Text>
            
            <View style={styles.actionButtons}>
              <Button
                title={isGeneratingDoc && 
                  ((button.generatorType === 'story_proposal' && docGenType === 'story') ||
                   (button.generatorType === 'formal_proposal' && docGenType === 'formal'))
                  ? "生成中..." : "生成する"}
                onPress={() => handleGenerate(button.generatorType)}
                variant={button.style}
                size="medium"
                disabled={isGeneratingDoc}
              />
              <TouchableOpacity
                style={[styles.previewButton, isGeneratingDoc && styles.previewButtonDisabled]}
                onPress={() => !isGeneratingDoc && handlePreview(button.generatorType === 'story_proposal' ? 'story' : 'formal')}
                disabled={isGeneratingDoc}
              >
                <Text style={[styles.previewButtonText, isGeneratingDoc && styles.previewButtonTextDisabled]}>
                  サンプルを見る
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      <Modal
        visible={showPreview}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {previewType === 'story' ? 'ストーリー提案書' : '詳細稟議書'}のサンプル
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowPreview(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalBody}>
              {previewType === 'story' ? (
                <View>
                  <Text style={styles.previewSection}>【導入ストーリー】</Text>
                  <Text style={styles.previewText}>
                    Web制作会社で働く鈴木様は、毎日複数のツールを切り替えながら業務を行っていました。
                    メールはGmail、チャットはSlack、ファイル共有はGoogle Drive、タスク管理はTrello...
                  </Text>
                  <Text style={styles.previewText}>
                    しかし、Larkを導入してからは、全てが一つのプラットフォームで完結。
                    情報の検索時間が80%削減され、本来の創造的な業務に集中できるようになりました。
                  </Text>
                </View>
              ) : (
                <View>
                  <Text style={styles.previewSection}>【投資対効果分析】</Text>
                  <Text style={styles.previewText}>
                    ■ 初期投資額: ¥1,704,000/年
                  </Text>
                  <Text style={styles.previewText}>
                    ■ 年間削減効果: ¥5,112,000
                  </Text>
                  <Text style={styles.previewText}>
                    ■ ROI: 200%
                  </Text>
                  <Text style={styles.previewText}>
                    ■ 投資回収期間: 4ヶ月
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonsContainer: {
    // gap removed for React Native compatibility
  },
  buttonWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: spacing.lg,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  buttonDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  previewButtonText: {
    fontSize: 14,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  previewButtonDisabled: {
    opacity: 0.5,
  },
  previewButtonTextDisabled: {
    color: Colors.textSecondary,
    textDecorationLine: 'none',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    width: '90%',
    maxWidth: 600,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeButtonText: {
    fontSize: 20,
    color: Colors.textSecondary,
  },
  modalBody: {
    padding: spacing.lg,
  },
  previewSection: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  previewText: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: spacing.sm,
    lineHeight: 22,
  },
});