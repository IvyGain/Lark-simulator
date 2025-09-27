import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';
import { spacing } from '../constants/responsive';
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
        after: 'Larkで全ての情報が一元管理され、検索一つで必要な情報にアクセス'
      },
      'コミュニケーションの非効率': {
        before: 'メールやチャットが乱立し、重要な連絡を見逃すことも',
        after: 'Larkの統合コミュニケーションで、優先度別に整理された効率的なやり取り'
      },
      '会議の多さ': {
        before: '一日の大半を会議に費やし、実務時間が圧迫される',
        after: 'Lark DocsとAI議事録で、会議時間を50%削減し、創造的な業務に集中'
      },
    };

    // ストーリーデータの生成
    const persona = personaTemplates[industry] || personaTemplates['IT'];
    const mainProblem = selectedProblems[0] || '情報の分散';
    const scenario = problemScenarios[mainProblem] || problemScenarios['情報の分散'];

    setTimeout(() => {
      setStoryData({
        persona,
        beforeScenarioSummary: scenario.before,
        afterScenarioSummary: scenario.after,
        keyResults: [
          `${employeeCount}名の従業員の生産性が平均30%向上`,
          '情報検索時間を月間100時間削減',
          'プロジェクト遅延率が40%改善'
        ]
      });
      setIsGenerating(false);
    }, 1000);
  };

  useEffect(() => {
    generateStory();
  }, [industry, selectedProblems, employeeCount]);

  if (isGenerating) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>ストーリーを生成中...</Text>
      </View>
    );
  }

  if (!storyData) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.storyCard}>
        <View style={styles.personaSection}>
          <Text style={styles.personaRole}>{storyData.persona.role}</Text>
          <Text style={styles.personaName}>{storyData.persona.name}</Text>
        </View>

        <View style={styles.scenarioSection}>
          <View style={styles.beforeSection}>
            <Text style={styles.scenarioLabel}>現在の課題</Text>
            <Text style={styles.scenarioText}>{storyData.beforeScenarioSummary}</Text>
          </View>

          <View style={styles.arrowContainer}>
            <Text style={styles.arrow}>↓</Text>
          </View>

          <View style={styles.afterSection}>
            <Text style={styles.scenarioLabel}>Lark導入後</Text>
            <Text style={styles.scenarioText}>{storyData.afterScenarioSummary}</Text>
          </View>
        </View>

        {storyData.keyResults && (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>期待される効果</Text>
            {storyData.keyResults.map((result, index) => (
              <Text key={index} style={styles.resultItem}>• {result}</Text>
            ))}
          </View>
        )}
      </View>

      {onGenerateStory && (
        <Button
          title="📖 ストーリー仕立ての提案書を詳しく見る"
          onPress={onGenerateStory}
          variant="primary"
          size="medium"
        />
      )}
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
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: spacing.sm,
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  storyCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  personaSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: spacing.md,
    marginBottom: spacing.lg,
  },
  personaRole: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: spacing.xs,
  },
  personaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  scenarioSection: {
    marginBottom: spacing.lg,
  },
  beforeSection: {
    backgroundColor: Colors.dangerLight,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  afterSection: {
    backgroundColor: Colors.successLight,
    padding: spacing.md,
    borderRadius: 8,
  },
  scenarioLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  scenarioText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: spacing.xs,
  },
  arrow: {
    fontSize: 24,
    color: Colors.primary,
  },
  resultsSection: {
    backgroundColor: Colors.primaryLight,
    padding: spacing.md,
    borderRadius: 8,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  resultItem: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: spacing.xs,
    lineHeight: 20,
  },
});