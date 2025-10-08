import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/colors';
import { spacing, isDesktop } from '../constants/responsive';
import Button from './Button';

interface StoryData {
  persona: {
    role: string;
    name: string;
  };
  beforeScenarioSummary: string;
  afterScenarioSummary: string;
  keyResults?: string[];
}

interface PersonalizedStoryPreviewProps {
  title?: string;
  industry?: string;
  selectedProblems?: string[];
  employeeCount?: number;
  onGenerateStory?: () => void;
}

export function PersonalizedStoryPreview({
  title = '【貴社向け】導入シミュレーション・ストーリー',
  industry = 'IT',
  selectedProblems = [],
  employeeCount = 50,
  onGenerateStory
}: PersonalizedStoryPreviewProps) {
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // ストーリー生成ロジック
  const generateStory = () => {
    setIsGenerating(true);
    
    // 業種別のペルソナテンプレート
    const personaTemplates: Record<string, { role: string; name: string }> = {
      'IT': { role: 'Web制作会社のプロジェクトマネージャー', name: '鈴木様' },
      '製造業': { role: '製造業の生産管理責任者', name: '田中様' },
      '小売業': { role: '小売チェーンの店舗運営責任者', name: '佐藤様' },
      'サービス業': { role: 'サービス業の営業部長', name: '山田様' },
    };

    // 課題別のビフォーアフターシナリオ
    const problemScenarios: Record<string, { before: string; after: string }> = {
      '情報の分散': {
        before: '複数のツールに情報が分散し、必要な情報を探すのに時間がかかる日々',
        after: 'Larkで全ての情報が一元管理され、検索一つで必要な情報にすぐアクセス'
      },
      'コミュニケーションの非効率': {
        before: 'メール、チャット、会議ツールがバラバラで、情報共有に時間がかかる',
        after: 'Larkで全てのコミュニケーションが統合され、スムーズな情報共有を実現'
      },
      'ツールコストの増大': {
        before: '複数のツールの月額費用が積み重なり、予算を圧迫',
        after: 'Lark一つで全機能をカバーし、大幅なコスト削減を実現'
      },
      '会議の非効率': {
        before: '会議の準備や議事録作成に多くの時間を費やし、本来の業務時間が削られる',
        after: 'Larkの自動議事録機能で会議効率が向上し、本来の業務に集中できる'
      }
    };

    // 選択された課題に基づいてシナリオを生成
    const selectedProblem = selectedProblems[0] || '情報の分散';
    const scenario = problemScenarios[selectedProblem] || problemScenarios['情報の分散'];
    const persona = personaTemplates[industry] || personaTemplates['IT'];

    // キー結果を生成
    const keyResults = [
      `従業員${employeeCount}名での年間コスト削減効果`,
      '業務効率向上による時間短縮',
      'ツール統合による管理負荷軽減',
      'セキュリティ強化とガバナンス向上'
    ];

    setTimeout(() => {
      setStoryData({
        persona,
        beforeScenarioSummary: scenario.before,
        afterScenarioSummary: scenario.after,
        keyResults
      });
      setIsGenerating(false);
    }, 2000);
  };

  useEffect(() => {
    generateStory();
  }, [industry, selectedProblems, employeeCount]);

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <LinearGradient
        colors={[Colors.primary + '15', Colors.primary + '25']}
        style={styles.headerSection}
      >
        <Text style={styles.headerIcon}>📖</Text>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>業界特化型シミュレーション</Text>
        </View>
      </LinearGradient>

      {isGenerating ? (
        <View style={styles.loadingContainer}>
          <LinearGradient
            colors={[Colors.gray[50], Colors.gray[100]]}
            style={styles.loadingCard}
          >
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loadingText}>貴社向けストーリーを生成中...</Text>
            <Text style={styles.loadingSubtext}>業界特性と課題を分析しています</Text>
          </LinearGradient>
        </View>
      ) : storyData ? (
        <View style={styles.storyContainer}>
          {/* Persona Section */}
          <LinearGradient
            colors={[Colors.white, Colors.gray[50]]}
            style={styles.personaCard}
          >
            <View style={styles.personaHeader}>
              <Text style={styles.personaIcon}>👤</Text>
              <View style={styles.personaInfo}>
                <Text style={styles.personaLabel}>想定ペルソナ</Text>
                <Text style={styles.personaRole}>{storyData.persona.role}</Text>
                <Text style={styles.personaName}>{storyData.persona.name}</Text>
              </View>
            </View>
          </LinearGradient>

          {/* Scenario Comparison */}
          <View style={styles.scenarioContainer}>
            <Text style={styles.scenarioTitle}>導入前後の変化</Text>
            
            {/* Before Section */}
            <LinearGradient
              colors={[Colors.danger + '15', Colors.danger + '25']}
              style={styles.beforeCard}
            >
              <View style={styles.scenarioHeader}>
                <Text style={styles.scenarioIcon}>😰</Text>
                <View style={styles.scenarioContent}>
                  <Text style={styles.scenarioLabel}>導入前の課題</Text>
                  <Text style={styles.scenarioText}>{storyData.beforeScenarioSummary}</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Arrow */}
            <View style={styles.arrowContainer}>
              <LinearGradient
                colors={[Colors.primary, Colors.success]}
                style={styles.arrowCircle}
              >
                <Text style={styles.arrow}>↓</Text>
              </LinearGradient>
              <Text style={styles.arrowLabel}>Lark導入</Text>
            </View>

            {/* After Section */}
            <LinearGradient
              colors={[Colors.success + '15', Colors.success + '25']}
              style={styles.afterCard}
            >
              <View style={styles.scenarioHeader}>
                <Text style={styles.scenarioIcon}>😊</Text>
                <View style={styles.scenarioContent}>
                  <Text style={styles.scenarioLabel}>導入後の改善</Text>
                  <Text style={styles.scenarioText}>{storyData.afterScenarioSummary}</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Key Results */}
          {storyData.keyResults && (
            <LinearGradient
              colors={[Colors.warning + '10', Colors.warning + '20']}
              style={styles.resultsCard}
            >
              <View style={styles.resultsHeader}>
                <Text style={styles.resultsIcon}>🎯</Text>
                <Text style={styles.resultsTitle}>期待される効果</Text>
              </View>
              
              <View style={styles.resultsList}>
                {storyData.keyResults.map((result, index) => (
                  <View key={index} style={styles.resultItem}>
                    <View style={styles.resultBullet}>
                      <Text style={styles.resultNumber}>{index + 1}</Text>
                    </View>
                    <Text style={styles.resultText}>{result}</Text>
                  </View>
                ))}
              </View>
            </LinearGradient>
          )}

          {/* Action Button */}
          <View style={styles.actionContainer}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary + 'CC']}
              style={styles.actionButton}
            >
              <TouchableOpacity 
                style={styles.actionButtonContent}
                onPress={onGenerateStory}
              >
                <Text style={styles.actionButtonIcon}>📄</Text>
                <View style={styles.actionButtonText}>
                  <Text style={styles.actionButtonTitle}>詳細提案書を生成</Text>
                  <Text style={styles.actionButtonSubtitle}>カスタマイズされた提案書をダウンロード</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      ) : null}
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
    borderBottomColor: Colors.primary + '20',
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.primary,
  },
  loadingContainer: {
    padding: spacing.xl,
  },
  loadingCard: {
    borderRadius: 12,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.gray[200],
  },
  loadingText: {
    marginTop: spacing.lg,
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  loadingSubtext: {
    marginTop: spacing.xs,
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    textAlign: 'center',
  },
  storyContainer: {
    padding: spacing.xl,
  },
  personaCard: {
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: Colors.gray[200],
  },
  personaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  personaIcon: {
    fontSize: isDesktop ? 40 : 32,
    marginRight: spacing.md,
  },
  personaInfo: {
    flex: 1,
  },
  personaLabel: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.gray[600],
    marginBottom: spacing.xs,
  },
  personaRole: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  personaName: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  scenarioContainer: {
    marginBottom: spacing.xl,
  },
  scenarioTitle: {
    fontSize: isDesktop ? 22 : 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  beforeCard: {
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: Colors.danger + '30',
  },
  afterCard: {
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.md,
    borderWidth: 2,
    borderColor: Colors.success + '30',
  },
  scenarioHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  scenarioIcon: {
    fontSize: isDesktop ? 32 : 28,
    marginRight: spacing.md,
  },
  scenarioContent: {
    flex: 1,
  },
  scenarioLabel: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  scenarioText: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.text,
    lineHeight: isDesktop ? 24 : 20,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  arrowCircle: {
    width: isDesktop ? 60 : 50,
    height: isDesktop ? 60 : 50,
    borderRadius: isDesktop ? 30 : 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  arrow: {
    fontSize: isDesktop ? 28 : 24,
    color: Colors.white,
    fontWeight: 'bold',
  },
  arrowLabel: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: '600',
    color: Colors.primary,
  },
  resultsCard: {
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.xl,
    borderWidth: 2,
    borderColor: Colors.warning + '30',
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  resultsIcon: {
    fontSize: isDesktop ? 32 : 28,
    marginRight: spacing.md,
  },
  resultsTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  resultsList: {
    gap: spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultBullet: {
    width: isDesktop ? 32 : 28,
    height: isDesktop ? 32 : 28,
    borderRadius: isDesktop ? 16 : 14,
    backgroundColor: Colors.warning,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  resultNumber: {
    fontSize: isDesktop ? 14 : 12,
    fontWeight: 'bold',
    color: Colors.white,
  },
  resultText: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.text,
    flex: 1,
    lineHeight: isDesktop ? 22 : 18,
  },
  actionContainer: {
    marginTop: spacing.lg,
  },
  actionButton: {
    borderRadius: 12,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  actionButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  actionButtonIcon: {
    fontSize: isDesktop ? 32 : 28,
    marginRight: spacing.md,
  },
  actionButtonText: {
    flex: 1,
  },
  actionButtonTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: spacing.xs,
  },
  actionButtonSubtitle: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.white,
    opacity: 0.9,
  },
});