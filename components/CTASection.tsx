import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop, spacing } from '@/constants/responsive';
import Button from '@/components/Button';
import { Ionicons } from '@expo/vector-icons';

interface CTASectionProps {
  annualSavings?: number;
  employeeCount?: number;
}

export const CTASection: React.FC<CTASectionProps> = ({
  annualSavings,
  employeeCount,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.container}>
      {/* 助成金案内バナー */}
      <View style={styles.subsidyBanner}>
        <View style={styles.subsidyIcon}>
          <Ionicons name="gift" size={28} color={Colors.white} />
        </View>
        <View style={styles.subsidyContent}>
          <Text style={styles.subsidyTitle}>助成金活用で最大75%キャッシュバック！</Text>
          <Text style={styles.subsidyDescription}>
            Lark導入には各種助成金が活用できます。詳しい情報は研修ページでご確認ください。
          </Text>
        </View>
      </View>

      {/* メインCTAボタン */}
      <View style={styles.ctaButtons}>
        <Button
          title="【Lark導入研修】"
          onPress={() => {
            // TODO: 研修ページへの遷移
            console.log('研修ページへ遷移');
          }}
          variant="secondary"
          size="large"
          style={styles.trainingButton}
        />
        
        <Button
          title="詳細を問い合わせる"
          onPress={() => {
            // TODO: 問い合わせフォームへの遷移
            console.log('問い合わせフォームへ遷移');
          }}
          variant="primary"
          size="large"
          style={styles.inquiryButton}
        />
      </View>

      {/* 無料相談案内 */}
      <View style={styles.consultationBanner}>
        <View style={styles.consultationIcon}>
          <Ionicons name="chatbubbles" size={24} color={Colors.primary} />
        </View>
        <View style={styles.consultationContent}>
          <Text style={styles.consultationTitle}>無料相談受付中</Text>
          <Text style={styles.consultationDescription}>
            導入に関するご質問や具体的な活用方法について、専門スタッフが無料でサポートいたします。
          </Text>
          {annualSavings && employeeCount && (
            <Text style={styles.consultationHighlight}>
              {employeeCount}名規模での年間{formatCurrency(annualSavings)}削減の詳細をご説明します
            </Text>
          )}
        </View>
      </View>

      {/* 特典・メリット */}
      <View style={styles.benefitsContainer}>
        <Text style={styles.benefitsTitle}>導入支援の内容</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.benefitText}>助成金申請サポート（最大75%補助）</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.benefitText}>データ移行・初期設定の代行</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.benefitText}>社員向け研修・運用サポート</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color={Colors.success} />
            <Text style={styles.benefitText}>導入後3ヶ月間の無料サポート</Text>
          </View>
        </View>
      </View>

      {/* フッター */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          このシミュレーション結果は目安です。実際の導入効果や助成金の詳細については、
          お気軽にお問い合わせください。
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
  },
  subsidyBanner: {
    backgroundColor: Colors.warning,
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  subsidyIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.warning + 'DD',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  subsidyContent: {
    flex: 1,
  },
  subsidyTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '800',
    color: Colors.white,
    marginBottom: spacing.xs,
  },
  subsidyDescription: {
    fontSize: isDesktop ? 14 : 13,
    color: Colors.white,
    lineHeight: isDesktop ? 20 : 18,
    opacity: 0.95,
  },
  ctaButtons: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  trainingButton: {
    flex: isDesktop ? 1 : undefined,
    backgroundColor: Colors.secondary,
  },
  inquiryButton: {
    flex: isDesktop ? 1 : undefined,
  },
  consultationBanner: {
    backgroundColor: Colors.primary + '10',
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.primary + '20',
  },
  consultationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  consultationContent: {
    flex: 1,
  },
  consultationTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  consultationDescription: {
    fontSize: isDesktop ? 14 : 13,
    color: Colors.gray[700],
    lineHeight: isDesktop ? 20 : 18,
    marginBottom: spacing.xs,
  },
  consultationHighlight: {
    fontSize: isDesktop ? 14 : 13,
    fontWeight: '600',
    color: Colors.primary,
    lineHeight: isDesktop ? 20 : 18,
  },
  benefitsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  benefitsTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  benefitsList: {
    gap: spacing.sm,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  benefitText: {
    fontSize: isDesktop ? 14 : 13,
    color: Colors.gray[700],
    marginLeft: spacing.sm,
    flex: 1,
  },
  footer: {
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 8,
    padding: spacing.md,
  },
  footerText: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[600],
    textAlign: 'center',
    lineHeight: isDesktop ? 18 : 16,
  },
});