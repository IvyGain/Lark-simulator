import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

export function LarkImpactSection() {
  return (
    <View style={styles.container}>
      {/* Hero Message */}
      <View style={styles.heroSection}>
        <View style={styles.heroTextContainer}>
          <Text style={styles.heroTitle}>チャット以上、想像以上。</Text>
          <Text style={styles.heroSubtitle}>仕事はスマホ1つで完結。</Text>
        </View>
        <View style={styles.allInOneContainer}>
          <Text style={styles.allInOneTitle}>All in one</Text>
          <View style={styles.allInOneWheel}>
            <View style={styles.centerCircle}>
              <Text style={styles.centerText}>チャット</Text>
            </View>
            {/* Surrounding Icons */}
            <View style={[styles.wheelItem, { top: 10, left: 60 }]}>
              <Text style={styles.wheelIcon}>📄</Text>
              <Text style={styles.wheelLabel}>ドキュメント</Text>
            </View>
            <View style={[styles.wheelItem, { top: 40, right: 10 }]}>
              <Text style={styles.wheelIcon}>📹</Text>
              <Text style={styles.wheelLabel}>ビデオ会議</Text>
            </View>
            <View style={[styles.wheelItem, { bottom: 40, right: 10 }]}>
              <Text style={styles.wheelIcon}>📅</Text>
              <Text style={styles.wheelLabel}>カレンダー</Text>
            </View>
            <View style={[styles.wheelItem, { bottom: 10, left: 60 }]}>
              <Text style={styles.wheelIcon}>📊</Text>
              <Text style={styles.wheelLabel}>プロジェクト管理</Text>
            </View>
            <View style={[styles.wheelItem, { top: 40, left: 10 }]}>
              <Text style={styles.wheelIcon}>📧</Text>
              <Text style={styles.wheelLabel}>メール</Text>
            </View>
          </View>
        </View>
        <View style={styles.benefitsContainer}>
          <View style={styles.benefitBubble}>
            <Text style={styles.benefitText}>あらゆる業界、</Text>
          </View>
          <View style={styles.benefitBubble}>
            <Text style={styles.benefitText}>あらゆる職種、</Text>
          </View>
          <View style={styles.benefitBubble}>
            <Text style={styles.benefitText}>あらゆる人が、</Text>
          </View>
          <View style={[styles.benefitBubble, styles.finalBubble]}>
            <Text style={styles.benefitText}>簡単に使える。</Text>
          </View>
        </View>
      </View>

      {/* Problem Solver Section */}
      <View style={styles.problemSolverSection}>
        <Text style={styles.problemTitle}>仕事の悩み、</Text>
        <Text style={styles.problemSubtitle}>ぜんぶLarkで解決。</Text>
        
        <View style={styles.solutionGrid}>
          <View style={styles.solutionCard}>
            <Text style={styles.questionIcon}>Q</Text>
            <Text style={styles.question}>会議時間を短くするには？</Text>
            <View style={styles.answer}>
              <Text style={styles.answerBrand}>🐦 Lark</Text>
              <Text style={styles.answerText}>で会議時間</Text>
            </View>
            <View style={styles.resultContainer}>
              <Text style={styles.resultNumber}>39%</Text>
              <View style={styles.resultBadge}>
                <Text style={styles.resultBadgeText}>短縮</Text>
              </View>
            </View>
          </View>

          <View style={styles.solutionCard}>
            <Text style={styles.questionIcon}>Q</Text>
            <Text style={styles.question}>ツールコストを削減するには？</Text>
            <View style={styles.answer}>
              <Text style={styles.answerBrand}>🐦 Lark</Text>
              <Text style={styles.answerText}>でツールコスト</Text>
            </View>
            <View style={styles.resultContainer}>
              <Text style={styles.resultNumber}>80%</Text>
              <View style={styles.resultBadge}>
                <Text style={styles.resultBadgeText}>カット</Text>
              </View>
            </View>
          </View>

          <View style={styles.solutionCard}>
            <Text style={styles.questionIcon}>Q</Text>
            <Text style={styles.question}>ファイルはどこ？</Text>
            <View style={styles.answer}>
              <Text style={styles.answerBrand}>🐦 Lark</Text>
              <Text style={styles.answerText}>で作成キーワード</Text>
            </View>
            <View style={styles.resultContainer}>
              <Text style={styles.resultNumber}>1</Text>
              <Text style={styles.resultUnit}>発</Text>
              <View style={styles.resultBadge}>
                <Text style={styles.resultBadgeText}>検索</Text>
              </View>
            </View>
          </View>

          <View style={styles.solutionCard}>
            <Text style={styles.questionIcon}>Q</Text>
            <Text style={styles.question}>DXを最短で行うには？</Text>
            <View style={styles.answer}>
              <Text style={styles.answerBrand}>🐦 Lark</Text>
              <Text style={styles.answerText}>で社内DXが</Text>
            </View>
            <View style={styles.resultContainer}>
              <Text style={styles.resultNumber}>1</Text>
              <Text style={styles.resultSubtext}>ストップに</Text>
              <View style={styles.resultBadge}>
                <Text style={styles.resultBadgeText}>ONE STOP</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* All-in-One Features */}
      <View style={styles.featuresSection}>
        <Text style={styles.featuresTitle}>統合型DXツール「Lark」のオールインワン機能</Text>
        
        <View style={styles.iconsRow}>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>💬</Text>
            <Text style={styles.featureLabel}>チャット</Text>
          </View>
          <Text style={styles.plusIcon}>+</Text>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>📄</Text>
            <Text style={styles.featureLabel}>ドキュメント</Text>
          </View>
          <Text style={styles.plusIcon}>+</Text>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>📹</Text>
            <Text style={styles.featureLabel}>ビデオ会議</Text>
          </View>
          <Text style={styles.plusIcon}>+</Text>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureLabel}>自動議事録</Text>
          </View>
        </View>

        <View style={styles.iconsRow}>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>📅</Text>
            <Text style={styles.featureLabel}>カレンダー</Text>
          </View>
          <Text style={styles.plusIcon}>+</Text>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>📧</Text>
            <Text style={styles.featureLabel}>メール</Text>
          </View>
          <Text style={styles.plusIcon}>+</Text>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>✅</Text>
            <Text style={styles.featureLabel}>承認&申請</Text>
          </View>
          <Text style={styles.plusIcon}>+</Text>
          <View style={styles.iconGroup}>
            <Text style={styles.featureIcon}>📊</Text>
            <Text style={styles.featureLabel}>データベース</Text>
          </View>
        </View>

        <View style={styles.equalsContainer}>
          <Text style={styles.equalsSign}>=</Text>
          <View style={styles.larkLogoContainer}>
            <Text style={styles.larkLogo}>🐦 Lark</Text>
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
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  // Hero Section
  heroSection: {
    backgroundColor: Colors.primary + '05',
    padding: spacing.lg,
    borderBottomWidth: 3,
    borderBottomColor: Colors.primary,
  },
  heroTextContainer: {
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    marginBottom: spacing.xs,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  allInOneContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  allInOneTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.md,
  },
  allInOneWheel: {
    width: 120,
    height: 120,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 10,
  },
  centerText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  wheelItem: {
    position: 'absolute',
    alignItems: 'center',
  },
  wheelIcon: {
    fontSize: 16,
    marginBottom: 2,
  },
  wheelLabel: {
    fontSize: 8,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    width: 40,
  },
  benefitsContainer: {
    alignItems: 'flex-end',
    marginTop: spacing.md,
  },
  benefitBubble: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.xs,
  },
  finalBubble: {
    backgroundColor: Colors.success,
  },
  benefitText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  // Problem Solver Section
  problemSolverSection: {
    padding: spacing.lg,
    backgroundColor: Colors.gray[50] as string,
  },
  problemTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
  },
  problemSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  solutionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  solutionCard: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: spacing.sm,
    width: '48%',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  questionIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  question: {
    fontSize: 11,
    color: Colors.text,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  answerBrand: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.primary,
    marginRight: spacing.xs,
  },
  answerText: {
    fontSize: 11,
    color: Colors.text,
  },
  resultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: Colors.primary,
  },
  resultUnit: {
    fontSize: 16,
    color: Colors.primary,
    marginLeft: 2,
  },
  resultSubtext: {
    fontSize: 10,
    color: Colors.primary,
    marginLeft: spacing.xs,
  },
  resultBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginLeft: spacing.xs,
  },
  resultBadgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  // Features Section
  featuresSection: {
    padding: spacing.lg,
    backgroundColor: Colors.white,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    flexWrap: 'wrap',
  },
  iconGroup: {
    alignItems: 'center',
    marginHorizontal: spacing.xs,
  },
  featureIcon: {
    fontSize: 20,
    marginBottom: spacing.xs,
  },
  featureLabel: {
    fontSize: 10,
    color: Colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
  plusIcon: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
    marginHorizontal: spacing.xs,
  },
  equalsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  equalsSign: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginRight: spacing.md,
  },
  larkLogoContainer: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 25,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  larkLogo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});