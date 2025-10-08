import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { AdvancedCostComparison } from '@/components/AdvancedCostComparison';
import { ProposalTemplateGenerator } from '@/components/ProposalTemplateGenerator';
import { FormalProposalGenerator } from '@/components/FormalProposalGenerator';
import { useAdvancedSimulatorStore } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

export default function AdvancedResultsScreen() {
  const router = useRouter();
  const { 
    calculationResult, 
    employeeCount, 
    selectedTools, 
    currentChallenges, 
    expectedImprovements,
    resetAll
  } = useAdvancedSimulatorStore();

  if (!calculationResult) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="計算結果" />
        <View style={styles.errorContainer}>
          <Ionicons name="warning" size={48} color={Colors.warning} />
          <Text style={styles.errorTitle}>計算結果がありません</Text>
          <Text style={styles.errorDescription}>
            シミュレーションを実行してから結果を確認してください
          </Text>
          <Button
            title="シミュレーションに戻る"
            onPress={() => router.push('/advanced-input')}
            variant="primary"
            style={styles.backButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const selectedChallenges = currentChallenges
    .filter(c => c.selected)
    .map(c => c.id === 'other' && c.customText ? c.customText : c.label);

  const selectedImprovements = expectedImprovements
    .filter(i => i.selected)
    .map(i => i.label);

  const handleNewSimulation = () => {
    Alert.alert(
      '新しいシミュレーション',
      '現在のデータをリセットして新しいシミュレーションを開始しますか？',
      [
        { text: 'キャンセル', style: 'cancel' },
        { 
          text: 'リセット', 
          style: 'destructive',
          onPress: () => {
            resetAll();
            router.push('/advanced-input');
          }
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="詳細シミュレーション結果" />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* サマリーカード */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Ionicons name="analytics" size={24} color={Colors.primary} />
            <Text style={styles.summaryTitle}>シミュレーション結果サマリー</Text>
          </View>
          
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>年間削減額</Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>
                {formatCurrency(calculationResult.annualSavings)}
              </Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>削減率</Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>
                {Math.round(calculationResult.savingsPercentage)}%
              </Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>ROI</Text>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>
                {Math.round(calculationResult.roi)}%
              </Text>
            </View>
            
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>投資回収期間</Text>
              <Text style={[styles.summaryValue, { color: Colors.primary }]}>
                {Math.round(calculationResult.paybackPeriod)}ヶ月
              </Text>
            </View>
          </View>
        </View>

        {/* 詳細コスト比較 */}
        <AdvancedCostComparison result={calculationResult} employeeCount={employeeCount} />

        {/* 業務効率化効果 */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="time" size={20} color={Colors.primary} />
            <Text style={styles.cardTitle}>業務効率化効果</Text>
          </View>
          
          <View style={styles.effectGrid}>
            <View style={styles.effectItem}>
              <Text style={styles.effectLabel}>年間工数削減</Text>
              <Text style={styles.effectValue}>
                {Math.round(calculationResult.laborHoursSaved).toLocaleString()}時間
              </Text>
            </View>
            
            <View style={styles.effectItem}>
              <Text style={styles.effectLabel}>人件費換算削減額</Text>
              <Text style={styles.effectValue}>
                {formatCurrency(calculationResult.laborCostSaved)}
              </Text>
            </View>
          </View>
          
          <Text style={styles.effectNote}>
            ※ ツール連携作業時間の削減効果を平均時給￥3,000で換算
          </Text>
        </View>

        {/* ユースケース提案 */}
        {calculationResult.useCases.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="bulb" size={20} color={Colors.primary} />
              <Text style={styles.cardTitle}>ユースケース提案</Text>
            </View>
            
            {calculationResult.useCases.map((useCase, index) => (
              <View key={index} style={styles.useCaseItem}>
                <View style={styles.useCaseHeader}>
                  <Text style={styles.useCaseNumber}>{index + 1}</Text>
                  <Text style={styles.useCaseChallenge}>{useCase.challenge}</Text>
                </View>
                <Text style={styles.useCaseSolution}>
                  <Text style={styles.useCaseLabel}>解決策: </Text>
                  {useCase.solution}
                </Text>
                <Text style={styles.useCaseFeature}>
                  <Text style={styles.useCaseLabel}>活用機能: </Text>
                  {useCase.feature}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* 提案書生成 */}
        <ProposalTemplateGenerator
          result={calculationResult}
          employeeCount={employeeCount}
          selectedTools={selectedTools}
          challenges={selectedChallenges}
          improvements={selectedImprovements}
        />

        {/* 正式稟議書生成 */}
        <FormalProposalGenerator
          result={calculationResult}
          employeeCount={employeeCount}
          selectedTools={selectedTools}
          challenges={selectedChallenges}
          improvements={selectedImprovements}
        />

        {/* アクションボタン */}
        <View style={styles.actionButtons}>
          <Button
            title="新しいシミュレーション"
            onPress={handleNewSimulation}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="トップに戻る"
            onPress={() => router.push('/')}
            variant="primary"
            style={styles.actionButton}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            この結果は入力された情報に基づく試算です。詳細な導入検討については営業担当にお問い合わせください。
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray[100] as string,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: isDesktop ? 32 : 16,
    paddingBottom: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.gray[900],
    marginTop: 16,
    marginBottom: 8,
  },
  errorDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  backButton: {
    minWidth: 200,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: isDesktop ? 24 : 20,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginLeft: 8,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryItem: {
    width: isDesktop ? '23%' : '48%',
    marginBottom: isDesktop ? 0 : 16,
  },
  summaryLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '700',
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: isDesktop ? 24 : 20,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.gray[900],
    marginLeft: 8,
  },
  effectGrid: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: isDesktop ? 32 : 16,
    marginBottom: 12,
  },
  effectItem: {
    flex: 1,
  },
  effectLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  effectValue: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  effectNote: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[500],
    fontStyle: 'italic',
  },
  useCaseItem: {
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  useCaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  useCaseNumber: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  useCaseChallenge: {
    fontSize: isDesktop ? 16 : 14,
    fontWeight: '600',
    color: Colors.gray[900],
    flex: 1,
  },
  useCaseSolution: {
    fontSize: isDesktop ? 14 : 13,
    color: Colors.gray[700],
    lineHeight: isDesktop ? 20 : 18,
    marginBottom: 4,
  },
  useCaseFeature: {
    fontSize: isDesktop ? 14 : 13,
    color: Colors.gray[700],
    lineHeight: isDesktop ? 20 : 18,
  },
  useCaseLabel: {
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  actionButton: {
    flex: isDesktop ? 1 : undefined,
  },
  footer: {
    backgroundColor: Colors.info + '10',
    borderRadius: 8,
    padding: 16,
  },
  footerText: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.info,
    textAlign: 'center',
    lineHeight: isDesktop ? 18 : 16,
  },
});