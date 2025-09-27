import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';
import Button from './Button';
import { ApprovalDetailsBox } from './ApprovalDetailsBox';

interface ApprovalDetails {
  department: string;
  requestor: string;
  requestDate: string;
  implementationPeriod: string;
  approvers: Array<{
    position: string;
    name: string;
    department: string;
  }>;
  budgetInfo: {
    totalAmount: string;
    budgetSource: string;
    accountingPeriod: string;
  };
  riskAssessment: string;
  alternativeOptions: string;
}

interface DetailedInputs {
  currentChallenges: string[];
  expectedImprovements: string[];
  additionalNotes: string;
  decisionMakers: string;
  implementationTimeline: string;
  approvalDetails?: ApprovalDetails;
}

interface EnhancedDocumentGeneratorProps {
  onGenerateStoryProposal: (details?: DetailedInputs) => void;
  onGenerateFormalProposal: (details?: DetailedInputs) => void;
  isGeneratingDoc?: boolean;
  docGenType?: 'story' | 'formal' | null;
}

export function EnhancedDocumentGenerator({
  onGenerateStoryProposal,
  onGenerateFormalProposal,
  isGeneratingDoc = false,
  docGenType = null
}: EnhancedDocumentGeneratorProps) {
  const [showDetailedInput, setShowDetailedInput] = useState(false);
  const [showStoryDetailInput, setShowStoryDetailInput] = useState(false);
  const [showApproverInput, setShowApproverInput] = useState(false);
  const [approvalDetails, setApprovalDetails] = useState<ApprovalDetails | undefined>();
  const [detailedInputs, setDetailedInputs] = useState<DetailedInputs>({
    currentChallenges: [],
    expectedImprovements: [],
    additionalNotes: '',
    decisionMakers: '',
    implementationTimeline: '3ヶ月以内'
  });

  const challengeOptions = [
    '情報が複数のツールに分散している',
    'コミュニケーションが非効率',
    '会議が多すぎて生産性が低い',
    'ファイル管理が煩雑',
    'プロジェクト進捗の可視化が困難',
    'リモートワークでの連携が難しい',
    'セキュリティ管理が複雑',
    'コスト管理が困難'
  ];

  const improvementOptions = [
    'コミュニケーション効率の向上',
    '情報共有の迅速化',
    'プロジェクト管理の最適化',
    '会議時間の削減',
    'ドキュメント管理の一元化',
    'セキュリティ強化',
    'コスト削減',
    '生産性向上'
  ];

  const toggleChallenge = (challenge: string) => {
    setDetailedInputs(prev => ({
      ...prev,
      currentChallenges: prev.currentChallenges.includes(challenge)
        ? prev.currentChallenges.filter(c => c !== challenge)
        : [...prev.currentChallenges, challenge]
    }));
  };

  const toggleImprovement = (improvement: string) => {
    setDetailedInputs(prev => ({
      ...prev,
      expectedImprovements: prev.expectedImprovements.includes(improvement)
        ? prev.expectedImprovements.filter(i => i !== improvement)
        : [...prev.expectedImprovements, improvement]
    }));
  };

  const handleGenerate = (type: 'story' | 'formal') => {
    let inputs;
    if (type === 'story') {
      inputs = showStoryDetailInput ? {
        ...detailedInputs,
        approvalDetails: approvalDetails
      } : undefined;
      onGenerateStoryProposal(inputs);
    } else {
      inputs = showDetailedInput ? {
        ...detailedInputs,
        approvalDetails: approvalDetails
      } : undefined;
      onGenerateFormalProposal(inputs);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>稟議書・提案書の生成</Text>
      <Text style={styles.description}>
        シミュレーション結果を元に、目的に合わせたドキュメントを作成できます
      </Text>


      {/* Document Generation Buttons */}
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonHeader}>
            <Text style={styles.buttonIcon}>📖</Text>
            <Text style={styles.buttonTitle}>ストーリー提案書</Text>
          </View>
          <Text style={styles.buttonDescription}>
            顧客向けプレゼンに最適。感情に訴える導入事例中心の提案書
          </Text>
          
          {/* Story Detail Toggle */}
          <TouchableOpacity
            style={styles.storyToggle}
            onPress={() => setShowStoryDetailInput(!showStoryDetailInput)}
          >
            <Text style={styles.storyToggleText}>
              詳細を入力してより魅力的なストーリーを作成 {showStoryDetailInput ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {showStoryDetailInput && (
            <ScrollView style={styles.storyInputContainer} showsVerticalScrollIndicator={false}>
              {/* Current Challenges */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>現在の課題（複数選択可）</Text>
                <View style={styles.optionsContainer}>
                  {challengeOptions.map((challenge, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        detailedInputs.currentChallenges.includes(challenge) && styles.selectedOption
                      ]}
                      onPress={() => toggleChallenge(challenge)}
                    >
                      <Text style={[
                        styles.optionText,
                        detailedInputs.currentChallenges.includes(challenge) && styles.selectedOptionText
                      ]}>
                        {challenge}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Expected Improvements */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>期待する改善効果（複数選択可）</Text>
                <View style={styles.optionsContainer}>
                  {improvementOptions.map((improvement, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.optionButton,
                        detailedInputs.expectedImprovements.includes(improvement) && styles.selectedOption
                      ]}
                      onPress={() => toggleImprovement(improvement)}
                    >
                      <Text style={[
                        styles.optionText,
                        detailedInputs.expectedImprovements.includes(improvement) && styles.selectedOptionText
                      ]}>
                        {improvement}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Additional Notes */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>追加要望・特記事項</Text>
                <TextInput
                  style={styles.textInput}
                  multiline
                  numberOfLines={3}
                  placeholder="導入に関する特別な要望や条件があれば記載してください"
                  value={detailedInputs.additionalNotes}
                  onChangeText={(text) => setDetailedInputs(prev => ({ ...prev, additionalNotes: text }))}
                />
              </View>
            </ScrollView>
          )}
          
          <Button
            title={isGeneratingDoc && docGenType === 'story' ? "生成中..." : "生成する"}
            onPress={() => handleGenerate('story')}
            variant="primary"
            size="medium"
            disabled={isGeneratingDoc}
          />
        </View>

        <View style={styles.buttonWrapper}>
          <View style={styles.buttonHeader}>
            <Text style={styles.buttonIcon}>💼</Text>
            <Text style={styles.buttonTitle}>詳細稟議書</Text>
          </View>
          <Text style={styles.buttonDescription}>
            経営陣向け稟議に最適。ROI・コスト分析重視のロジカル資料
          </Text>
          {/* Approver Information Toggle */}
          <TouchableOpacity
            style={styles.approverToggle}
            onPress={() => setShowApproverInput(!showApproverInput)}
          >
            <Text style={styles.approverToggleText}>
              詳細を入力して定番の稟議書を作成 {showApproverInput ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {showApproverInput && (
            <ScrollView style={styles.approverInputContainer} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
              {/* 基本情報 */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>📝 基本情報</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>申請部門</Text>
                  <TextInput
                    style={styles.textInput}
                    value={approvalDetails?.department || ''}
                    onChangeText={(value) => setApprovalDetails(prev => ({
                      ...prev,
                      department: value,
                      requestor: prev?.requestor || '',
                      requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                      implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                      approvers: prev?.approvers || [
                        { position: '部門長', name: '', department: '' },
                        { position: '取締役', name: '', department: '' },
                        { position: '代表取締役', name: '', department: '' }
                      ],
                      budgetInfo: prev?.budgetInfo || {
                        totalAmount: '',
                        budgetSource: '運営予算',
                        accountingPeriod: '2025年度'
                      },
                      riskAssessment: prev?.riskAssessment || '',
                      alternativeOptions: prev?.alternativeOptions || ''
                    }))}
                    placeholder="例：経営企画部"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>申請者</Text>
                  <TextInput
                    style={styles.textInput}
                    value={approvalDetails?.requestor || ''}
                    onChangeText={(value) => setApprovalDetails(prev => ({
                      ...prev,
                      requestor: value,
                      department: prev?.department || '',
                      requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                      implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                      approvers: prev?.approvers || [
                        { position: '部門長', name: '', department: '' },
                        { position: '取締役', name: '', department: '' },
                        { position: '代表取締役', name: '', department: '' }
                      ],
                      budgetInfo: prev?.budgetInfo || {
                        totalAmount: '',
                        budgetSource: '運営予算',
                        accountingPeriod: '2025年度'
                      },
                      riskAssessment: prev?.riskAssessment || '',
                      alternativeOptions: prev?.alternativeOptions || ''
                    }))}
                    placeholder="例：山田太郎"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>申請日</Text>
                  <TextInput
                    style={styles.textInput}
                    value={approvalDetails?.requestDate || new Date().toISOString().split('T')[0]}
                    onChangeText={(value) => setApprovalDetails(prev => ({
                      ...prev,
                      requestDate: value,
                      department: prev?.department || '',
                      requestor: prev?.requestor || '',
                      implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                      approvers: prev?.approvers || [
                        { position: '部門長', name: '', department: '' },
                        { position: '取締役', name: '', department: '' },
                        { position: '代表取締役', name: '', department: '' }
                      ],
                      budgetInfo: prev?.budgetInfo || {
                        totalAmount: '',
                        budgetSource: '運営予算',
                        accountingPeriod: '2025年度'
                      },
                      riskAssessment: prev?.riskAssessment || '',
                      alternativeOptions: prev?.alternativeOptions || ''
                    }))}
                    placeholder="YYYY-MM-DD"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>実施予定期間</Text>
                  <View style={styles.optionsContainer}>
                    {['即座', '1ヶ月以内', '3ヶ月以内', '6ヶ月以内', '1年以内'].map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={[
                          styles.optionButton,
                          approvalDetails?.implementationPeriod === period && styles.selectedOption
                        ]}
                        onPress={() => setApprovalDetails(prev => ({
                          ...prev,
                          implementationPeriod: period,
                          department: prev?.department || '',
                          requestor: prev?.requestor || '',
                          requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                          approvers: prev?.approvers || [
                            { position: '部門長', name: '', department: '' },
                            { position: '取締役', name: '', department: '' },
                            { position: '代表取締役', name: '', department: '' }
                          ],
                          budgetInfo: prev?.budgetInfo || {
                            totalAmount: '',
                            budgetSource: '運営予算',
                            accountingPeriod: '2025年度'
                          },
                          riskAssessment: prev?.riskAssessment || '',
                          alternativeOptions: prev?.alternativeOptions || ''
                        }))}
                      >
                        <Text style={[
                          styles.optionText,
                          approvalDetails?.implementationPeriod === period && styles.selectedOptionText
                        ]}>
                          {period}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* 決裁者情報 */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>👥 決裁者情報</Text>
                
                {(approvalDetails?.approvers || [
                  { position: '部門長', name: '', department: '' },
                  { position: '取締役', name: '', department: '' },
                  { position: '代表取締役', name: '', department: '' }
                ]).map((approver, index) => (
                  <View key={index} style={styles.approverGroup}>
                    <Text style={styles.approverTitle}>{approver.position}</Text>
                    <View style={styles.approverRow}>
                      <TextInput
                        style={[styles.textInput, styles.approverNameInput]}
                        value={approver.name}
                        onChangeText={(value) => {
                          const newApprovers = [...(approvalDetails?.approvers || [
                            { position: '部門長', name: '', department: '' },
                            { position: '取締役', name: '', department: '' },
                            { position: '代表取締役', name: '', department: '' }
                          ])];
                          newApprovers[index] = { ...newApprovers[index], name: value };
                          setApprovalDetails(prev => ({
                            ...prev,
                            approvers: newApprovers,
                            department: prev?.department || '',
                            requestor: prev?.requestor || '',
                            requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                            implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                            budgetInfo: prev?.budgetInfo || {
                              totalAmount: '',
                              budgetSource: '運営予算',
                              accountingPeriod: '2025年度'
                            },
                            riskAssessment: prev?.riskAssessment || '',
                            alternativeOptions: prev?.alternativeOptions || ''
                          }));
                        }}
                        placeholder="氏名"
                      />
                      <TextInput
                        style={[styles.textInput, styles.approverDeptInput]}
                        value={approver.department}
                        onChangeText={(value) => {
                          const newApprovers = [...(approvalDetails?.approvers || [
                            { position: '部門長', name: '', department: '' },
                            { position: '取締役', name: '', department: '' },
                            { position: '代表取締役', name: '', department: '' }
                          ])];
                          newApprovers[index] = { ...newApprovers[index], department: value };
                          setApprovalDetails(prev => ({
                            ...prev,
                            approvers: newApprovers,
                            department: prev?.department || '',
                            requestor: prev?.requestor || '',
                            requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                            implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                            budgetInfo: prev?.budgetInfo || {
                              totalAmount: '',
                              budgetSource: '運営予算',
                              accountingPeriod: '2025年度'
                            },
                            riskAssessment: prev?.riskAssessment || '',
                            alternativeOptions: prev?.alternativeOptions || ''
                          }));
                        }}
                        placeholder="所属"
                      />
                    </View>
                  </View>
                ))}
              </View>

              {/* 予算情報 */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>💰 予算情報</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>総投資額（年間）</Text>
                  <TextInput
                    style={styles.textInput}
                    value={approvalDetails?.budgetInfo?.totalAmount || ''}
                    onChangeText={(value) => setApprovalDetails(prev => ({
                      ...prev,
                      budgetInfo: {
                        ...prev?.budgetInfo,
                        totalAmount: value,
                        budgetSource: prev?.budgetInfo?.budgetSource || '運営予算',
                        accountingPeriod: prev?.budgetInfo?.accountingPeriod || '2025年度'
                      },
                      department: prev?.department || '',
                      requestor: prev?.requestor || '',
                      requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                      implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                      approvers: prev?.approvers || [
                        { position: '部門長', name: '', department: '' },
                        { position: '取締役', name: '', department: '' },
                        { position: '代表取締役', name: '', department: '' }
                      ],
                      riskAssessment: prev?.riskAssessment || '',
                      alternativeOptions: prev?.alternativeOptions || ''
                    }))}
                    placeholder="例：1,704,000"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>予算区分</Text>
                  <View style={styles.optionsContainer}>
                    {['運営予算', '設備投資予算', '特別予算', 'その他'].map((source) => (
                      <TouchableOpacity
                        key={source}
                        style={[
                          styles.optionButton,
                          approvalDetails?.budgetInfo?.budgetSource === source && styles.selectedOption
                        ]}
                        onPress={() => setApprovalDetails(prev => ({
                          ...prev,
                          budgetInfo: {
                            ...prev?.budgetInfo,
                            budgetSource: source,
                            totalAmount: prev?.budgetInfo?.totalAmount || '',
                            accountingPeriod: prev?.budgetInfo?.accountingPeriod || '2025年度'
                          },
                          department: prev?.department || '',
                          requestor: prev?.requestor || '',
                          requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                          implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                          approvers: prev?.approvers || [
                            { position: '部門長', name: '', department: '' },
                            { position: '取締役', name: '', department: '' },
                            { position: '代表取締役', name: '', department: '' }
                          ],
                          riskAssessment: prev?.riskAssessment || '',
                          alternativeOptions: prev?.alternativeOptions || ''
                        }))}
                      >
                        <Text style={[
                          styles.optionText,
                          approvalDetails?.budgetInfo?.budgetSource === source && styles.selectedOptionText
                        ]}>
                          {source}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>会計年度</Text>
                  <View style={styles.optionsContainer}>
                    {['2025年度', '2026年度', '複数年度'].map((period) => (
                      <TouchableOpacity
                        key={period}
                        style={[
                          styles.optionButton,
                          approvalDetails?.budgetInfo?.accountingPeriod === period && styles.selectedOption
                        ]}
                        onPress={() => setApprovalDetails(prev => ({
                          ...prev,
                          budgetInfo: {
                            ...prev?.budgetInfo,
                            accountingPeriod: period,
                            totalAmount: prev?.budgetInfo?.totalAmount || '',
                            budgetSource: prev?.budgetInfo?.budgetSource || '運営予算'
                          },
                          department: prev?.department || '',
                          requestor: prev?.requestor || '',
                          requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                          implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                          approvers: prev?.approvers || [
                            { position: '部門長', name: '', department: '' },
                            { position: '取締役', name: '', department: '' },
                            { position: '代表取締役', name: '', department: '' }
                          ],
                          riskAssessment: prev?.riskAssessment || '',
                          alternativeOptions: prev?.alternativeOptions || ''
                        }))}
                      >
                        <Text style={[
                          styles.optionText,
                          approvalDetails?.budgetInfo?.accountingPeriod === period && styles.selectedOptionText
                        ]}>
                          {period}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {/* リスク評価 */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>⚠️ リスク評価・対策</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={approvalDetails?.riskAssessment || ''}
                  onChangeText={(value) => setApprovalDetails(prev => ({
                    ...prev,
                    riskAssessment: value,
                    department: prev?.department || '',
                    requestor: prev?.requestor || '',
                    requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                    implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                    approvers: prev?.approvers || [
                      { position: '部門長', name: '', department: '' },
                      { position: '取締役', name: '', department: '' },
                      { position: '代表取締役', name: '', department: '' }
                    ],
                    budgetInfo: prev?.budgetInfo || {
                      totalAmount: '',
                      budgetSource: '運営予算',
                      accountingPeriod: '2025年度'
                    },
                    alternativeOptions: prev?.alternativeOptions || ''
                  }))}
                  placeholder="導入に伴うリスクとその対策を記述してください&#10;例：&#10;・導入初期の業務効率低下 → 段階的導入とトレーニング実施&#10;・データ移行リスク → バックアップ体制の確立"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>

              {/* 代替案検討 */}
              <View style={styles.inputSection}>
                <Text style={styles.sectionTitle}>🔄 代替案の検討</Text>
                <TextInput
                  style={[styles.textInput, styles.textArea]}
                  value={approvalDetails?.alternativeOptions || ''}
                  onChangeText={(value) => setApprovalDetails(prev => ({
                    ...prev,
                    alternativeOptions: value,
                    department: prev?.department || '',
                    requestor: prev?.requestor || '',
                    requestDate: prev?.requestDate || new Date().toISOString().split('T')[0],
                    implementationPeriod: prev?.implementationPeriod || '3ヶ月以内',
                    approvers: prev?.approvers || [
                      { position: '部門長', name: '', department: '' },
                      { position: '取締役', name: '', department: '' },
                      { position: '代表取締役', name: '', department: '' }
                    ],
                    budgetInfo: prev?.budgetInfo || {
                      totalAmount: '',
                      budgetSource: '運営予算',
                      accountingPeriod: '2025年度'
                    },
                    riskAssessment: prev?.riskAssessment || ''
                  }))}
                  placeholder="検討した他の選択肢とその比較結果を記述してください&#10;例：&#10;・現状維持：コスト削減効果なし&#10;・他社製品：機能面でLarkに劣る&#10;・部分導入：統合効果が限定的"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </ScrollView>
          )}
          
          <Button
            title={isGeneratingDoc && docGenType === 'formal' ? "生成中..." : "生成する"}
            onPress={() => handleGenerate('formal')}
            variant="secondary"
            size="medium"
            disabled={isGeneratingDoc}
          />
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
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 14,
    color: Colors.gray[600],
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 20,
  },
  toggleContainer: {
    backgroundColor: Colors.primary + '10',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  toggleText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  detailedInputContainer: {
    maxHeight: 400,
    marginBottom: spacing.lg,
  },
  inputSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    backgroundColor: Colors.gray[100] as string,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 20,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.text,
  },
  selectedOptionText: {
    color: Colors.white,
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 8,
    padding: spacing.md,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.white,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    marginBottom: spacing.lg,
  },
  buttonWrapper: {
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 10,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  buttonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  buttonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  buttonDescription: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  approverToggle: {
    backgroundColor: Colors.info + '10',
    padding: spacing.sm,
    borderRadius: 6,
    marginBottom: spacing.md,
  },
  approverToggleText: {
    fontSize: 14,
    color: Colors.info,
    fontWeight: '600',
    textAlign: 'center',
  },
  approverInputContainer: {
    backgroundColor: Colors.gray[50] as string,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  timelineOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  timelineOption: {
    backgroundColor: Colors.gray[100] as string,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  selectedTimelineOption: {
    backgroundColor: Colors.info,
    borderColor: Colors.info,
  },
  timelineOptionText: {
    fontSize: 12,
    color: Colors.text,
  },
  selectedTimelineOptionText: {
    color: Colors.white,
    fontWeight: '500',
  },
  storyToggle: {
    backgroundColor: Colors.primary + '10',
    padding: spacing.sm,
    borderRadius: 6,
    marginBottom: spacing.md,
  },
  storyToggleText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
  storyInputContainer: {
    backgroundColor: Colors.gray[50] as string,
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
    paddingTop: spacing.sm,
  },
  approverGroup: {
    backgroundColor: Colors.gray[50] as string,
    padding: spacing.sm,
    borderRadius: 6,
    marginBottom: spacing.sm,
  },
  approverTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  approverRow: {
    flexDirection: 'row',
  },
  approverNameInput: {
    flex: 1,
    marginRight: spacing.xs,
  },
  approverDeptInput: {
    flex: 1,
    marginLeft: spacing.xs,
  },
});