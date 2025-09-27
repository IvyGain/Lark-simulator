import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';
import { SubsidyPlan, SubsidyInfo } from '../store/unified-store';

interface SubsidyPlanBoxProps {
  subsidyPlan: SubsidyPlan | null;
  isLoading: boolean;
  onSearchSubsidies: () => void;
  prefecture: string;
  city: string;
  onPrefectureChange: (prefecture: string) => void;
  onCityChange: (city: string) => void;
}

export function SubsidyPlanBox({ 
  subsidyPlan, 
  isLoading,
  onSearchSubsidies,
  prefecture,
  city,
  onPrefectureChange,
  onCityChange
}: SubsidyPlanBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);

  // 初期状態では所在地入力画面を表示
  useEffect(() => {
    setShowLocationInput(!prefecture || !subsidyPlan);
  }, [prefecture, subsidyPlan]);

  const formatCurrency = (amount: number) => `¥${amount.toLocaleString()}`;
  const formatDeadline = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP');
  };

  const prefectureOptions = [
    '東京都', '大阪府', '愛知県', '神奈川県', '埼玉県', 
    '千葉県', '兵庫県', '福岡県', '北海道', '京都府',
    '静岡県', '広島県', '茨城県', '新潟県', '宮城県',
    'その他'
  ];

  const handleSearch = () => {
    if (prefecture) {
      setShowLocationInput(false);
      onSearchSubsidies();
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>補助金・助成金情報を検索中...</Text>
          <Text style={styles.loadingSubtext}>
            最新の国・地方自治体の補助金・助成金制度を確認しています
          </Text>
        </View>
      </View>
    );
  }

  if (showLocationInput || (!subsidyPlan && !prefecture)) {
    return (
      <View style={styles.container}>
        <View style={styles.locationInputContainer}>
          <Text style={styles.locationInputTitle}>💰 補助金・助成金活用プラン</Text>
          <Text style={styles.locationInputSubtitle}>
            本社所在地を入力すると、国・地方自治体の最新補助金制度を調査し、最適な活用プランをご提案します
          </Text>
          <Text style={styles.locationInputNote}>
            ※ 地域により異なる補助金・助成金制度の情報を正確にお調べするため、まず所在地をお教えください
          </Text>
          
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>本社所在地（都道府県）</Text>
            <View style={styles.prefectureGrid}>
              {prefectureOptions.map((pref) => (
                <TouchableOpacity
                  key={pref}
                  style={[
                    styles.prefectureButton,
                    prefecture === pref && styles.prefectureButtonSelected
                  ]}
                  onPress={() => onPrefectureChange(pref)}
                >
                  <Text style={[
                    styles.prefectureButtonText,
                    prefecture === pref && styles.prefectureButtonTextSelected
                  ]}>
                    {pref}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>市区町村（任意）</Text>
            <TextInput
              style={styles.cityInput}
              value={city}
              onChangeText={onCityChange}
              placeholder="例：渋谷区、大阪市"
              placeholderTextColor={Colors.gray[400]}
            />
          </View>

          <TouchableOpacity 
            style={[styles.searchButton, !prefecture && styles.searchButtonDisabled]} 
            onPress={handleSearch}
            disabled={!prefecture}
          >
            <Text style={styles.searchButtonText}>補助金・助成金プランをリサーチ</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!subsidyPlan || subsidyPlan.applicableSubsidies.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.noSubsidyContainer}>
          <Text style={styles.noSubsidyTitle}>📋 補助金・助成金検索結果</Text>
          <Text style={styles.noSubsidyText}>
            適用可能な補助金・助成金が見つかりませんでした
          </Text>
          <TouchableOpacity 
            style={styles.editLocationButton} 
            onPress={() => setShowLocationInput(true)}
          >
            <Text style={styles.editLocationButtonText}>所在地を変更する</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>💰 補助金・助成金活用プラン</Text>
            <TouchableOpacity 
              style={styles.editLocationButton}
              onPress={() => setShowLocationInput(true)}
            >
              <Text style={styles.editLocationButtonText}>
                {prefecture || '所在地を設定'}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerStats}>
            <Text style={styles.subsidyAmount}>
              {formatCurrency(subsidyPlan.totalSubsidyAmount)}
            </Text>
            <Text style={styles.subsidyLabel}>補助金・助成金総額</Text>
          </View>
        </View>
        <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
      </TouchableOpacity>

      {/* サマリー情報（常に表示） */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>実質導入費用</Text>
            <Text style={styles.summaryValue}>
              {formatCurrency(subsidyPlan.netImplementationCost)}
            </Text>
            <Text style={styles.summarySubtext}>
              （通常の{Math.round((1 - subsidyPlan.netImplementationCost / (subsidyPlan.netImplementationCost + subsidyPlan.totalSubsidyAmount)) * 100)}%割引）
            </Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>補助金・助成金適用後ROI</Text>
            <Text style={styles.summaryValue}>
              {subsidyPlan.roiWithSubsidy === Infinity ? '∞' : `${subsidyPlan.roiWithSubsidy}%`}
            </Text>
            <Text style={styles.summarySubtext}>
              回収期間: {subsidyPlan.paybackWithSubsidy}ヶ月
            </Text>
          </View>
        </View>
        
        <View style={styles.timelineContainer}>
          <Text style={styles.timelineText}>{subsidyPlan.implementationTimeline}</Text>
        </View>
      </View>

      {/* 詳細情報（展開時のみ） */}
      {isExpanded && (
        <ScrollView style={styles.detailsContainer} showsVerticalScrollIndicator={false}>
          {/* プラン概要セクション */}
          <View style={styles.planOverviewSection}>
            <Text style={styles.sectionTitle}>📋 補助金・助成金活用プラン概要</Text>
            <View style={styles.overviewGrid}>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>通常導入費用</Text>
                <Text style={styles.overviewValue}>
                  {formatCurrency(subsidyPlan.netImplementationCost + subsidyPlan.totalSubsidyAmount)}
                </Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>補助金・助成金総額</Text>
                <Text style={[styles.overviewValue, styles.subsidyAmountText]}>
                  -{formatCurrency(subsidyPlan.totalSubsidyAmount)}
                </Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>実質負担額</Text>
                <Text style={[styles.overviewValue, styles.finalCostText]}>
                  {formatCurrency(subsidyPlan.netImplementationCost)}
                </Text>
              </View>
              <View style={styles.overviewItem}>
                <Text style={styles.overviewLabel}>削減率</Text>
                <Text style={[styles.overviewValue, styles.savingsPercentageText]}>
                  {Math.round((subsidyPlan.totalSubsidyAmount / (subsidyPlan.netImplementationCost + subsidyPlan.totalSubsidyAmount)) * 100)}%
                </Text>
              </View>
            </View>
          </View>

          {/* 投資回収分析セクション */}
          <View style={styles.roiAnalysisSection}>
            <Text style={styles.sectionTitle}>📈 投資回収分析</Text>
            <View style={styles.roiComparisonContainer}>
              <View style={styles.roiComparisonItem}>
                <Text style={styles.roiComparisonLabel}>補助金・助成金なし</Text>
                <Text style={styles.roiComparisonValue}>
                  ROI: {Math.round(((subsidyPlan.netImplementationCost + subsidyPlan.totalSubsidyAmount) / (subsidyPlan.netImplementationCost + subsidyPlan.totalSubsidyAmount)) * 100)}%
                </Text>
                <Text style={styles.roiComparisonSubtext}>
                  回収期間: {Math.ceil(24)}ヶ月 (想定)
                </Text>
              </View>
              <View style={styles.roiArrow}>
                <Text style={styles.roiArrowText}>→</Text>
              </View>
              <View style={styles.roiComparisonItem}>
                <Text style={styles.roiComparisonLabel}>補助金・助成金活用</Text>
                <Text style={[styles.roiComparisonValue, styles.improvedRoi]}>
                  ROI: {subsidyPlan.roiWithSubsidy === Infinity ? '∞' : `${subsidyPlan.roiWithSubsidy}%`}
                </Text>
                <Text style={[styles.roiComparisonSubtext, styles.improvedRoi]}>
                  回収期間: {subsidyPlan.paybackWithSubsidy}ヶ月
                </Text>
              </View>
            </View>
          </View>

          {/* 申請スケジュール */}
          <View style={styles.scheduleSection}>
            <Text style={styles.sectionTitle}>📅 申請スケジュール</Text>
            <View style={styles.timelineContainer}>
              {subsidyPlan.applicableSubsidies.map((subsidy, index) => {
                const deadline = new Date(subsidy.applicationDeadline);
                const today = new Date();
                const daysLeft = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                const isUrgent = daysLeft <= 30;
                
                return (
                  <View key={subsidy.id} style={styles.timelineItem}>
                    <View style={[styles.timelineDot, isUrgent ? styles.urgentDot : styles.normalDot]} />
                    <View style={styles.timelineContent}>
                      <Text style={styles.timelineTitle}>{subsidy.name}</Text>
                      <Text style={[styles.timelineDeadline, isUrgent && styles.urgentText]}>
                        締切: {formatDeadline(subsidy.applicationDeadline)} 
                        {isUrgent && ' ⚠️緊急'}
                        {!isUrgent && ` (あと${daysLeft}日)`}
                      </Text>
                      <Text style={styles.timelineAmount}>
                        推定額: {formatCurrency(subsidy.estimatedAmount)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>

          <Text style={styles.sectionTitle}>💰 適用可能な補助金・助成金制度</Text>
          
          {subsidyPlan.applicableSubsidies.map((subsidy, index) => (
            <View key={subsidy.id} style={styles.subsidyCard}>
              <View style={styles.subsidyHeader}>
                <View style={styles.subsidyTitleRow}>
                  <Text style={styles.subsidyName}>{subsidy.name}</Text>
                  <View style={[
                    styles.subsidyTypeBadge,
                    subsidy.type === 'national' ? styles.nationalBadge : styles.localBadge
                  ]}>
                    <Text style={styles.subsidyTypeText}>
                      {subsidy.type === 'national' ? '国庫' : '地方'}
                    </Text>
                  </View>
                </View>
                <View style={styles.subsidyAmountContainer}>
                  <Text style={styles.subsidyAmountLabel}>推定支給額</Text>
                  <Text style={styles.subsidyAmountValue}>
                    {formatCurrency(subsidy.estimatedAmount)}
                  </Text>
                  <Text style={styles.subsidyMaxAmount}>
                    (上限: {formatCurrency(subsidy.maxAmount)})
                  </Text>
                </View>
              </View>

              <View style={styles.subsidyDetails}>
                <View style={styles.subsidyDetailRow}>
                  <Text style={styles.subsidyDetailLabel}>補助率:</Text>
                  <Text style={styles.subsidyDetailValue}>
                    {Math.round(subsidy.subsidyRate * 100)}% (上限: {formatCurrency(subsidy.maxAmount)})
                  </Text>
                </View>
                
                <View style={styles.subsidyDetailRow}>
                  <Text style={styles.subsidyDetailLabel}>申請期限:</Text>
                  <Text style={[
                    styles.subsidyDetailValue,
                    new Date(subsidy.applicationDeadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) 
                      ? styles.urgentDeadline : null
                  ]}>
                    {formatDeadline(subsidy.applicationDeadline)}
                    {new Date(subsidy.applicationDeadline) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && ' ⚠️'}
                  </Text>
                </View>

                <View style={styles.subsidyDetailColumn}>
                  <Text style={styles.subsidyDetailLabel}>対象分野:</Text>
                  <View style={styles.targetTypesContainer}>
                    {subsidy.targetType.map((type, idx) => (
                      <View key={idx} style={styles.targetTypeTag}>
                        <Text style={styles.targetTypeText}>{type}</Text>
                      </View>
                    ))}
                  </View>
                </View>

                <View style={styles.subsidyDetailColumn}>
                  <Text style={styles.subsidyDetailLabel}>主な要件:</Text>
                  {subsidy.requirements.map((req, idx) => (
                    <Text key={idx} style={styles.requirementText}>• {req}</Text>
                  ))}
                </View>

                {/* 申請の流れ */}
                <View style={styles.applicationProcessSection}>
                  <Text style={styles.processTitle}>📋 申請の流れ</Text>
                  <View style={styles.processSteps}>
                    {subsidy.type === 'national' ? (
                      <>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>1</Text>
                          <Text style={styles.processStepText}>GビズIDプライム取得（2週間）</Text>
                        </View>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>2</Text>
                          <Text style={styles.processStepText}>IT導入支援事業者選定・相談</Text>
                        </View>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>3</Text>
                          <Text style={styles.processStepText}>事業計画書作成・申請</Text>
                        </View>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>4</Text>
                          <Text style={styles.processStepText}>審査・交付決定（1-2ヶ月）</Text>
                        </View>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>5</Text>
                          <Text style={styles.processStepText}>システム導入・実績報告</Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>1</Text>
                          <Text style={styles.processStepText}>事前相談・申請書作成</Text>
                        </View>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>2</Text>
                          <Text style={styles.processStepText}>{subsidy.prefecture}庁への申請</Text>
                        </View>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>3</Text>
                          <Text style={styles.processStepText}>審査・交付決定</Text>
                        </View>
                        <View style={styles.processStep}>
                          <Text style={styles.processStepNumber}>4</Text>
                          <Text style={styles.processStepText}>事業実施・完了報告</Text>
                        </View>
                      </>
                    )}
                  </View>
                </View>

                {/* 必要書類 */}
                <View style={styles.documentsSection}>
                  <Text style={styles.documentsTitle}>📄 主な必要書類</Text>
                  <View style={styles.documentsList}>
                    {subsidy.type === 'national' ? (
                      <>
                        <Text style={styles.documentItem}>• 交付申請書</Text>
                        <Text style={styles.documentItem}>• 事業計画書</Text>
                        <Text style={styles.documentItem}>• 法人登記簿謄本</Text>
                        <Text style={styles.documentItem}>• 決算書（直近2期分）</Text>
                        <Text style={styles.documentItem}>• 見積書・仕様書</Text>
                        <Text style={styles.documentItem}>• 労働基準法遵守の誓約書</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.documentItem}>• 申請書</Text>
                        <Text style={styles.documentItem}>• 事業計画書</Text>
                        <Text style={styles.documentItem}>• 法人登記簿謄本</Text>
                        <Text style={styles.documentItem}>• 決算書</Text>
                        <Text style={styles.documentItem}>• 見積書</Text>
                      </>
                    )}
                  </View>
                </View>

                {/* 注意事項 */}
                <View style={styles.notesSection}>
                  <Text style={styles.notesTitle}>⚠️ 重要な注意事項</Text>
                  <View style={styles.notesList}>
                    <Text style={styles.noteItem}>• 交付決定前の発注・契約は補助対象外</Text>
                    <Text style={styles.noteItem}>• 実績報告書の提出期限を厳守</Text>
                    <Text style={styles.noteItem}>• 取得財産は5年間の管理義務あり</Text>
                    {subsidy.type === 'national' && (
                      <Text style={styles.noteItem}>• 賃上げ目標の達成が必要</Text>
                    )}
                  </View>
                </View>

                <Text style={styles.subsidySource}>出典: {subsidy.source}</Text>
              </View>
            </View>
          ))}

          <View style={styles.actionContainer}>
            <TouchableOpacity 
              style={styles.refreshButton} 
              onPress={onSearchSubsidies}
            >
              <Text style={styles.refreshButtonText}>最新情報を再検索</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
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
  },
  loadingContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: Colors.gray[600],
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  noSubsidyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  noSubsidyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  noSubsidyText: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  searchButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  headerStats: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  subsidyAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.success,
    marginRight: spacing.sm,
  },
  subsidyLabel: {
    fontSize: 12,
    color: Colors.gray[600],
  },
  expandIcon: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  summaryContainer: {
    padding: spacing.lg,
    backgroundColor: Colors.success + '10',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.success,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.success,
    marginBottom: spacing.xs,
  },
  summarySubtext: {
    fontSize: 10,
    color: Colors.success,
    textAlign: 'center',
  },
  timelineContainer: {
    backgroundColor: Colors.white,
    padding: spacing.sm,
    borderRadius: 6,
    alignItems: 'center',
  },
  timelineText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  detailsContainer: {
    maxHeight: 600,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.md,
  },
  subsidyCard: {
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  subsidyHeader: {
    marginBottom: spacing.sm,
  },
  subsidyTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  subsidyName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  subsidyTypeBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 10,
  },
  nationalBadge: {
    backgroundColor: Colors.primary,
  },
  localBadge: {
    backgroundColor: Colors.info,
  },
  subsidyTypeText: {
    fontSize: 10,
    color: Colors.white,
    fontWeight: '600',
  },
  subsidyDetails: {
    gap: spacing.xs,
  },
  subsidyDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subsidyDetailColumn: {
    marginTop: spacing.xs,
  },
  subsidyDetailLabel: {
    fontSize: 12,
    color: Colors.gray[600],
    fontWeight: '500',
  },
  subsidyDetailValue: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  urgentDeadline: {
    color: Colors.error,
    fontWeight: 'bold',
  },
  targetTypesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: spacing.xs,
  },
  targetTypeTag: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  targetTypeText: {
    fontSize: 10,
    color: Colors.primary,
    fontWeight: '500',
  },
  requirementText: {
    fontSize: 11,
    color: Colors.text,
    marginTop: 2,
  },
  moreRequirements: {
    fontSize: 10,
    color: Colors.gray[500],
    fontStyle: 'italic',
    marginTop: 2,
  },
  subsidySource: {
    fontSize: 9,
    color: Colors.gray[400],
    marginTop: spacing.xs,
    fontStyle: 'italic',
  },
  actionContainer: {
    marginTop: spacing.md,
    alignItems: 'center',
  },
  refreshButton: {
    backgroundColor: Colors.gray[200] as string,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  refreshButtonText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  // 新しいスタイル
  planOverviewSection: {
    backgroundColor: Colors.primary + '10',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewItem: {
    width: '48%',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  overviewLabel: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subsidyAmountText: {
    color: Colors.success,
  },
  finalCostText: {
    color: Colors.primary,
  },
  savingsPercentageText: {
    color: Colors.success,
  },
  roiAnalysisSection: {
    backgroundColor: Colors.info + '10',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.lg,
  },
  roiComparisonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  roiComparisonItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
  },
  roiArrow: {
    paddingHorizontal: spacing.sm,
  },
  roiArrowText: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  roiComparisonLabel: {
    fontSize: 12,
    color: Colors.gray[600],
    marginBottom: spacing.xs,
  },
  roiComparisonValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  roiComparisonSubtext: {
    fontSize: 11,
    color: Colors.gray[600],
  },
  improvedRoi: {
    color: Colors.success,
  },
  scheduleSection: {
    marginBottom: spacing.lg,
  },
  timelineContainer2: {
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 8,
    padding: spacing.md,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    alignItems: 'flex-start',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: spacing.sm,
  },
  normalDot: {
    backgroundColor: Colors.primary,
  },
  urgentDot: {
    backgroundColor: Colors.error,
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  timelineDeadline: {
    fontSize: 11,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  timelineAmount: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '500',
  },
  urgentText: {
    color: Colors.error,
    fontWeight: '600',
  },
  subsidyAmountContainer: {
    alignItems: 'center',
    marginTop: spacing.xs,
  },
  subsidyAmountLabel: {
    fontSize: 11,
    color: Colors.gray[600],
    marginBottom: 2,
  },
  subsidyAmountValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.success,
  },
  subsidyMaxAmount: {
    fontSize: 10,
    color: Colors.gray[500],
    marginTop: 2,
  },
  applicationProcessSection: {
    backgroundColor: Colors.white,
    padding: spacing.sm,
    borderRadius: 6,
    marginTop: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  processTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  processSteps: {
    marginLeft: spacing.xs,
  },
  processStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.xs,
  },
  processStepNumber: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.white,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: spacing.xs,
    minWidth: 16,
    textAlign: 'center',
  },
  processStepText: {
    fontSize: 11,
    color: Colors.text,
    flex: 1,
    lineHeight: 16,
  },
  documentsSection: {
    backgroundColor: Colors.gray[50] as string,
    padding: spacing.sm,
    borderRadius: 6,
    marginTop: spacing.sm,
  },
  documentsTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  documentsList: {
    marginLeft: spacing.xs,
  },
  documentItem: {
    fontSize: 10,
    color: Colors.text,
    marginBottom: 2,
    lineHeight: 14,
  },
  notesSection: {
    backgroundColor: Colors.error + '10',
    padding: spacing.sm,
    borderRadius: 6,
    marginTop: spacing.sm,
  },
  notesTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.error,
    marginBottom: spacing.xs,
  },
  notesList: {
    marginLeft: spacing.xs,
  },
  noteItem: {
    fontSize: 10,
    color: Colors.error,
    marginBottom: 2,
    lineHeight: 14,
  },
  // 所在地入力画面のスタイル
  locationInputContainer: {
    padding: spacing.xl,
  },
  locationInputTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  locationInputSubtitle: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  locationInputNote: {
    fontSize: 12,
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xl,
    fontStyle: 'italic',
    backgroundColor: Colors.primaryLight,
    padding: spacing.sm,
    borderRadius: 6,
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  prefectureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  prefectureButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderRadius: 20,
    backgroundColor: Colors.white,
    minWidth: 80,
    alignItems: 'center',
    margin: spacing.xs,
  },
  prefectureButtonSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  prefectureButtonText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  prefectureButtonTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  cityInput: {
    fontSize: 16,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    backgroundColor: Colors.white,
    color: Colors.text,
  },
  searchButtonDisabled: {
    backgroundColor: Colors.gray[300] as string,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  editLocationButton: {
    backgroundColor: Colors.gray[100] as string,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
  },
  editLocationButtonText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
});