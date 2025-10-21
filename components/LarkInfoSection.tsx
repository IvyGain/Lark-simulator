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

      {/* Support Details Section */}
      <View style={styles.supportSection}>
        <Text style={styles.supportTitle}>導入支援の詳細内容</Text>
        <Text style={styles.supportDescription}>
          Larkの最大効率を発揮するためのノウハウを活かした無料相談構築設計をご支援します。
        </Text>
        <View style={styles.supportList}>
          <View style={styles.supportItem}>
            <Text style={styles.supportIcon}>🏗️</Text>
            <Text style={styles.supportText}>業務基盤システム構築代行</Text>
          </View>
          <View style={styles.supportItem}>
            <Text style={styles.supportIcon}>📊</Text>
            <Text style={styles.supportText}>データ移行・初期設定の代行</Text>
          </View>
          <View style={styles.supportItem}>
            <Text style={styles.supportIcon}>🎓</Text>
            <Text style={styles.supportText}>社員向けオンボーディング研修・運用サポート</Text>
          </View>
          <View style={styles.supportItem}>
            <Text style={styles.supportIcon}>🛡️</Text>
            <Text style={styles.supportText}>導入後3ヶ月間の無料サポート</Text>
          </View>
          <View style={styles.supportItem}>
            <Text style={styles.supportIcon}>⚙️</Text>
            <Text style={styles.supportText}>カスタマイズ・運用最適化支援</Text>
          </View>
        </View>
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
  supportSection: {
    backgroundColor: 'rgba(34, 197, 94, 0.05)',
    borderRadius: 12,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.1)',
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  supportDescription: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  supportList: {
    gap: spacing.md,
  },
  supportItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  supportIcon: {
    fontSize: 16,
    marginRight: spacing.md,
    width: 24,
    textAlign: 'center',
  },
  supportText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
    flex: 1,
  },
});