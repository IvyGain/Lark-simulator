import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import Button from '@/components/Button';
import Header from '@/components/Header';
import { AdvancedCostComparison } from '@/components/AdvancedCostComparison';
import { ProposalTemplateGenerator } from '@/components/ProposalTemplateGenerator';
import { FormalProposalGenerator } from '@/components/FormalProposalGenerator';
import { useAdvancedSimulatorStore, CalculationResult } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

export default function TestResultsScreen() {
  const router = useRouter();
  const { setEmployeeCount, addTool, toggleChallenge, toggleImprovement, calculateResults, calculationResult } = useAdvancedSimulatorStore();

  useEffect(() => {
    // テスト用のダミーデータを設定
    setEmployeeCount(100);
    
    // テスト用ツールを追加
    addTool({
      toolId: 'Slack',
      monthlyFee: 850,
      annualFee: 850 * 12 * 0.9, // 10%割引
      isAnnualBilling: false
    });
    
    addTool({
      toolId: 'Zoom',
      monthlyFee: 2000,
      annualFee: 2000 * 12 * 0.85, // 15%割引
      isAnnualBilling: true
    });
    
    addTool({
      toolId: 'Google Workspace',
      monthlyFee: 1360,
      annualFee: 1360 * 12,
      isAnnualBilling: false
    });

    // テスト用課題を選択
    toggleChallenge('info-fragmentation');
    toggleChallenge('communication-delay');
    toggleChallenge('tool-cost');

    // テスト用改善効果を選択
    toggleImprovement('cost-reduction');
    toggleImprovement('efficiency');
    toggleImprovement('info-centralization');

    // 計算実行
    calculateResults();
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(amount);
  };

  if (!calculationResult) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />
        <Header title="テスト結果" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>計算中...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const selectedChallenges = ['情報共有の分散', 'コミュニケーションの遅延', 'ツールコストの増大'];
  const selectedImprovements = ['コスト削減', '業務効率化', '情報一元化'];
  const selectedTools = [
    { toolId: 'Slack', monthlyFee: 850, annualFee: 850 * 12 * 0.9, isAnnualBilling: false },
    { toolId: 'Zoom', monthlyFee: 2000, annualFee: 2000 * 12 * 0.85, isAnnualBilling: true },
    { toolId: 'Google Workspace', monthlyFee: 1360, annualFee: 1360 * 12, isAnnualBilling: false }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Header title="テスト: 詳細シミュレーション結果" />
      
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
        <AdvancedCostComparison result={calculationResult} employeeCount={100} />

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
          employeeCount={100}
          selectedTools={selectedTools}
          challenges={selectedChallenges}
          improvements={selectedImprovements}
        />

        {/* 正式稟議書生成 */}
        <FormalProposalGenerator
          result={calculationResult}
          employeeCount={100}
          selectedTools={selectedTools}
          challenges={selectedChallenges}
          improvements={selectedImprovements}
        />

        {/* アクションボタン */}
        <View style={styles.actionButtons}>
          <Button
            title="メインに戻る"
            onPress={() => router.push('/')}
            variant="primary"
            style={styles.actionButton}
          />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: Colors.gray[600],
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
});