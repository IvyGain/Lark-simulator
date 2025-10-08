import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '../constants/colors';
import { spacing, isDesktop } from '../constants/responsive';
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

  const handleGenerateDocument = (type: 'story_proposal' | 'formal_proposal') => {
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

  const getPreviewContent = (type: 'story' | 'formal') => {
    if (type === 'story') {
      return {
        title: 'ストーリー提案書プレビュー',
        sections: [
          '1. エグゼクティブサマリー',
          '2. 現状の課題とペインポイント',
          '3. Lark導入による変革ストーリー',
          '4. 具体的な改善事例',
          '5. 投資対効果とROI分析',
          '6. 導入ロードマップ',
          '7. 次のステップ'
        ]
      };
    } else {
      return {
        title: '詳細稟議書プレビュー',
        sections: [
          '1. 投資提案概要',
          '2. 現状分析と課題定義',
          '3. ソリューション詳細',
          '4. 財務分析（ROI、NPV、回収期間）',
          '5. リスク分析と対策',
          '6. 実装計画とタイムライン',
          '7. 承認要請'
        ]
      };
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={[Colors.warning + '15', Colors.warning + '25']}
        style={styles.headerSection}
      >
        <Text style={styles.headerIcon}>📋</Text>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </LinearGradient>

      {/* Generator Buttons */}
      <View style={styles.buttonsContainer}>
        {generatorButtons.map((button, index) => (
          <LinearGradient
            key={button.generatorType}
            colors={
              button.style === 'primary' 
                ? [Colors.primary + '10', Colors.primary + '20']
                : [Colors.gray[50], Colors.gray[100]]
            }
            style={styles.buttonWrapper}
          >
            <View style={styles.buttonContent}>
              {/* Button Header */}
              <View style={styles.buttonHeader}>
                <Text style={styles.buttonIcon}>{button.icon}</Text>
                <View style={styles.buttonTitleContainer}>
                  <Text style={styles.buttonTitle}>{button.label}</Text>
                  {button.style === 'primary' && (
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedText}>おすすめ</Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Button Description */}
              <Text style={styles.buttonDescription}>{button.description}</Text>

              {/* Features List */}
              <View style={styles.featuresList}>
                {button.generatorType === 'story_proposal' ? (
                  <>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>✨</Text>
                      <Text style={styles.featureText}>感情に訴えるストーリー形式</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>🎯</Text>
                      <Text style={styles.featureText}>具体的な改善事例を掲載</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>📊</Text>
                      <Text style={styles.featureText}>視覚的なグラフとチャート</Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>💰</Text>
                      <Text style={styles.featureText}>詳細な財務分析とROI</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>📈</Text>
                      <Text style={styles.featureText}>リスク分析と対策</Text>
                    </View>
                    <View style={styles.featureItem}>
                      <Text style={styles.featureBullet}>📋</Text>
                      <Text style={styles.featureText}>実装計画とタイムライン</Text>
                    </View>
                  </>
                )}
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.previewButton}
                  onPress={() => handlePreview(button.generatorType === 'story_proposal' ? 'story' : 'formal')}
                >
                  <Text style={styles.previewButtonText}>プレビューを見る</Text>
                </TouchableOpacity>

                <View style={styles.generateButtonContainer}>
                  {isGeneratingDoc && docGenType === (button.generatorType === 'story_proposal' ? 'story' : 'formal') ? (
                    <LinearGradient
                      colors={[Colors.gray[300], Colors.gray[400]]}
                      style={styles.generateButtonLoading}
                    >
                      <Text style={styles.generateButtonLoadingText}>生成中...</Text>
                    </LinearGradient>
                  ) : (
                    <LinearGradient
                      colors={
                        button.style === 'primary'
                          ? [Colors.primary, Colors.primary + 'DD']
                          : [Colors.gray[600], Colors.gray[700]]
                      }
                      style={styles.generateButton}
                    >
                      <TouchableOpacity
                        style={styles.generateButtonContent}
                        onPress={() => handleGenerateDocument(button.generatorType)}
                      >
                        <Text style={styles.generateButtonText}>今すぐ生成</Text>
                        <Text style={styles.generateButtonIcon}>→</Text>
                      </TouchableOpacity>
                    </LinearGradient>
                  )}
                </View>
              </View>
            </View>
          </LinearGradient>
        ))}
      </View>

      {/* Preview Modal */}
      <Modal
        visible={showPreview}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPreview(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={[Colors.primary + '10', Colors.primary + '20']}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>{getPreviewContent(previewType).title}</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowPreview(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView style={styles.modalBody}>
              <Text style={styles.previewIntro}>
                このドキュメントには以下の内容が含まれます：
              </Text>
              
              {getPreviewContent(previewType).sections.map((section, index) => (
                <View key={index} style={styles.previewSection}>
                  <View style={styles.sectionBullet}>
                    <Text style={styles.sectionNumber}>{index + 1}</Text>
                  </View>
                  <Text style={styles.sectionText}>{section.replace(/^\d+\.\s*/, '')}</Text>
                </View>
              ))}

              <View style={styles.previewFooter}>
                <LinearGradient
                  colors={[Colors.success + '15', Colors.success + '25']}
                  style={styles.previewNote}
                >
                  <Text style={styles.previewNoteIcon}>💡</Text>
                  <Text style={styles.previewNoteText}>
                    生成されるドキュメントは、入力されたシミュレーション結果に基づいて
                    カスタマイズされた内容となります。
                  </Text>
                </LinearGradient>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: spacing.xl,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.warning + '30',
  },
  headerIcon: {
    fontSize: isDesktop ? 48 : 40,
    marginRight: spacing.lg,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    lineHeight: isDesktop ? 24 : 20,
  },
  buttonsContainer: {
    padding: spacing.xl,
    gap: spacing.lg,
  },
  buttonWrapper: {
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonContent: {
    padding: spacing.lg,
  },
  buttonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonIcon: {
    fontSize: isDesktop ? 40 : 32,
    marginRight: spacing.md,
  },
  buttonTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  recommendedBadge: {
    backgroundColor: Colors.warning,
    borderRadius: 12,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  recommendedText: {
    fontSize: isDesktop ? 12 : 10,
    fontWeight: 'bold',
    color: Colors.white,
  },
  buttonDescription: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.text,
    marginBottom: spacing.lg,
    lineHeight: isDesktop ? 24 : 20,
  },
  featuresList: {
    marginBottom: spacing.lg,
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureBullet: {
    fontSize: isDesktop ? 16 : 14,
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[700],
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary + '50',
  },
  previewButtonText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  generateButtonContainer: {
    flex: 1,
    marginLeft: spacing.md,
  },
  generateButton: {
    borderRadius: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  generateButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  generateButtonText: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: 'bold',
    color: Colors.white,
    marginRight: spacing.sm,
  },
  generateButtonIcon: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.white,
    fontWeight: 'bold',
  },
  generateButtonLoading: {
    borderRadius: 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },
  generateButtonLoadingText: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: 'bold',
    color: Colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    width: '100%',
    maxWidth: isDesktop ? 600 : 400,
    maxHeight: '80%',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary + '20',
  },
  modalTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  closeButton: {
    padding: spacing.sm,
    borderRadius: 20,
    backgroundColor: Colors.gray[200],
  },
  closeButtonText: {
    fontSize: isDesktop ? 18 : 16,
    color: Colors.gray[600],
    fontWeight: 'bold',
  },
  modalBody: {
    padding: spacing.lg,
  },
  previewIntro: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.text,
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  previewSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionBullet: {
    width: isDesktop ? 28 : 24,
    height: isDesktop ? 28 : 24,
    borderRadius: isDesktop ? 14 : 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  sectionNumber: {
    fontSize: isDesktop ? 12 : 10,
    fontWeight: 'bold',
    color: Colors.white,
  },
  sectionText: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.text,
    flex: 1,
    lineHeight: isDesktop ? 22 : 18,
  },
  previewFooter: {
    marginTop: spacing.xl,
  },
  previewNote: {
    borderRadius: 12,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.success + '30',
  },
  previewNoteIcon: {
    fontSize: isDesktop ? 24 : 20,
    marginRight: spacing.md,
  },
  previewNoteText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.text,
    flex: 1,
    lineHeight: isDesktop ? 20 : 16,
  },
});