import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Linking, Animated, TouchableOpacity } from 'react-native';
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
  // アニメーション用の参照
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleLarkInstall = () => {
    // プレスアニメーション
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Linking.openURL('https://www.customercloud.co/lark-ivygain');
  };

  const handleConsultation = () => {
    // プレスアニメーション
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Linking.openURL('https://ivygain-project.jp.larksuite.com/scheduler/1077edbc8cd5e47a');
  };

  // マウント時のアニメーション
  useEffect(() => {
    // バウンスアニメーション
    Animated.spring(bounceAnim, {
      toValue: 1,
      tension: 100,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // パルスアニメーション（無限ループ）
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulseAnimation.start();

    // シマーアニメーション（無限ループ）
    const shimmerAnimation = Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    shimmerAnimation.start();

    return () => {
      pulseAnimation.stop();
      shimmerAnimation.stop();
    };
  }, []);

  // シマーエフェクトの位置計算
  const shimmerTranslateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={styles.container}>
      {/* ヒーローセクション */}
      <View style={styles.heroSection}>
        <View style={styles.heroIcon}>
          <Ionicons name="rocket" size={32} color={Colors.white} />
        </View>
        <Text style={styles.heroTitle}>今すぐLarkで業務効率を革新しましょう</Text>
        <Text style={styles.heroSubtitle}>
          {annualSavings && employeeCount 
            ? `${employeeCount}名規模で年間${formatCurrency(annualSavings)}の削減効果を実現`
            : '数千社が選ぶ次世代コラボレーションツール'
          }
        </Text>
        
        {/* アニメーション付きヒーローCTAボタン */}
        <Animated.View
          style={[
            styles.animatedButtonContainer,
            {
              transform: [
                { scale: Animated.multiply(bounceAnim, pulseAnim) },
              ],
            },
          ]}
        >
          <TouchableOpacity
            style={styles.heroInstallButton}
            onPress={handleLarkInstall}
            activeOpacity={0.9}
          >
            {/* シマーエフェクト */}
            <Animated.View
              style={[
                styles.shimmerOverlay,
                {
                  transform: [{ translateX: shimmerTranslateX }],
                },
              ]}
            />
            <View style={styles.buttonContent}>
              <Text style={styles.heroButtonIcon}>🚀</Text>
              <Text style={styles.heroButtonText}>Larkの無料インストールはこちら</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* 特典・メリット */}
      <View style={styles.benefitsContainer}>
        <View style={styles.benefitsHeader}>
          <Ionicons name="gift" size={24} color={Colors.primary} />
          <Text style={styles.benefitsTitle}>導入支援の内容</Text>
        </View>
        <Text style={styles.benefitsDescription}>
          Larkの最大効率を発揮するためのノウハウを活かした無料相談構築設計をご支援します。
        </Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="construct" size={18} color={Colors.primary} />
            </View>
            <Text style={styles.benefitText}>業務基盤システム構築代行</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="cloud-upload" size={18} color={Colors.primary} />
            </View>
            <Text style={styles.benefitText}>データ移行・初期設定の代行</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="school" size={18} color={Colors.primary} />
            </View>
            <Text style={styles.benefitText}>社員向けオンボーディング研修・運用サポート</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="headset" size={18} color={Colors.primary} />
            </View>
            <Text style={styles.benefitText}>導入後3ヶ月間の無料サポート</Text>
          </View>
          <View style={styles.benefitItem}>
            <View style={styles.benefitIcon}>
              <Ionicons name="settings" size={18} color={Colors.primary} />
            </View>
            <Text style={styles.benefitText}>カスタマイズ・運用最適化支援</Text>
          </View>
        </View>
      </View>

      {/* 無料相談案内 */}
      <View style={styles.consultationBanner}>
        <View style={styles.consultationIcon}>
          <Ionicons name="chatbubbles" size={24} color={Colors.primary} />
        </View>
        <View style={styles.consultationContent}>
          <Text style={styles.consultationTitle}>専門スタッフによる無料相談</Text>
          <Text style={styles.consultationDescription}>
            導入に関するご質問や具体的な活用方法について、経験豊富な専門スタッフが無料でサポートいたします。
          </Text>
          <View style={styles.consultationFeatures}>
            <View style={styles.consultationFeature}>
              <Ionicons name="time" size={16} color={Colors.success} />
              <Text style={styles.consultationFeatureText}>最短30分で相談可能</Text>
            </View>
            <View style={styles.consultationFeature}>
              <Ionicons name="videocam" size={16} color={Colors.success} />
              <Text style={styles.consultationFeatureText}>オンライン・対面対応</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 導入に関するご質問・無料相談ボタン */}
      <View style={styles.ctaButtons}>
        <Button
          title="💬 導入に関するご質問・無料相談"
          onPress={handleConsultation}
          variant="secondary"
          size="large"
          style={styles.consultationButton}
        />
      </View>

      {/* フッター */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          このシミュレーション結果は目安です。実際の導入効果については、
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
  heroSection: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  heroIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '800',
    color: Colors.white,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: isDesktop ? 32 : 28,
  },
  heroSubtitle: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.white + 'E0',
    textAlign: 'center',
    lineHeight: isDesktop ? 24 : 20,
    marginBottom: spacing.lg,
  },
  animatedButtonContainer: {
    marginTop: spacing.md,
  },
  heroInstallButton: {
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    borderRadius: 16,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minWidth: isDesktop ? 280 : 250,
    overflow: 'hidden',
    position: 'relative',
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    width: 50,
    height: '100%',
    opacity: 0.7,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  heroButtonIcon: {
    fontSize: isDesktop ? 20 : 18,
    marginRight: spacing.xs,
  },
  heroButtonText: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
  },
  ctaButtons: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  installButton: {
    flex: isDesktop ? 1 : undefined,
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderRadius: 12,
  },
  consultationButton: {
    flex: isDesktop ? 1 : undefined,
    backgroundColor: Colors.secondary,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    borderRadius: 12,
  },
  benefitsContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  benefitsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  benefitsTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginLeft: spacing.sm,
  },
  benefitsDescription: {
    fontSize: isDesktop ? 15 : 14,
    color: Colors.gray[700],
    lineHeight: isDesktop ? 22 : 20,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  benefitsList: {
    gap: spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[50],
    borderRadius: 12,
    padding: spacing.md,
  },
  benefitIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  benefitText: {
    fontSize: isDesktop ? 15 : 14,
    color: Colors.gray[700],
    flex: 1,
    fontWeight: '500',
  },
  consultationBanner: {
    backgroundColor: `linear-gradient(135deg, ${Colors.primary}10, ${Colors.secondary}10)`,
    borderRadius: 16,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 2,
    borderColor: Colors.primary + '20',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  consultationIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  consultationContent: {
    flex: 1,
  },
  consultationTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.primary,
    marginBottom: spacing.sm,
  },
  consultationDescription: {
    fontSize: isDesktop ? 15 : 14,
    color: Colors.gray[700],
    lineHeight: isDesktop ? 22 : 20,
    marginBottom: spacing.md,
  },
  consultationFeatures: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: spacing.sm,
  },
  consultationFeature: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  consultationFeatureText: {
    fontSize: isDesktop ? 14 : 13,
    fontWeight: '600',
    color: Colors.success,
    marginLeft: spacing.xs,
  },
  footer: {
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 12,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  footerText: {
    fontSize: isDesktop ? 13 : 12,
    color: Colors.gray[600],
    textAlign: 'center',
    lineHeight: isDesktop ? 20 : 18,
  },
});