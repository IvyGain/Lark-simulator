import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

export function LarkInfoSection() {
  const features = [
    {
      category: 'メッセージング',
      items: ['チャット', 'グループ', 'スレッド']
    },
    {
      category: 'ビデオ会議',
      items: ['HD通話', '画面共有', '録画']
    },
    {
      category: 'ドキュメント',
      items: ['共同編集', 'バージョン管理']
    },
    {
      category: 'タスク管理',
      items: ['プロジェクト', 'ガンットチャート']
    },
    {
      category: 'カレンダー',
      items: ['スケジュール', '予定調整']
    },
    {
      category: 'ストレージ',
      items: ['ファイル共有', 'クラウド保管']
    }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Larkについて</Text>
      <Text style={styles.description}>
        Larkは、メッセージング、ビデオ通話、ドキュメント管理、タスク管理などの機能を1つのプラットフォームに統合したオールインワンのコラボレーションツールです。業務のツールを統合することで、大幅なコスト削減が可能です。
      </Text>

      <Text style={styles.featuresTitle}>Larkの主な機能</Text>
      <View style={styles.featuresGrid}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <Text style={styles.featureCategory}>{feature.category}</Text>
            {feature.items.map((item, itemIndex) => (
              <Text key={itemIndex} style={styles.featureItem}>{item}</Text>
            ))}
          </View>
        ))}
      </View>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  featureCard: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.sm,
    width: '48%',
    minWidth: 140,
  },
  featureCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  featureItem: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 2,
  },
  highlightBox: {
    backgroundColor: Colors.info + '20',
    borderLeftWidth: 4,
    borderLeftColor: Colors.info,
    padding: spacing.md,
    borderRadius: 8,
  },
  highlightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.info,
    marginBottom: spacing.xs,
  },
  highlightText: {
    fontSize: 14,
    color: Colors.text,
    lineHeight: 18,
  },
});