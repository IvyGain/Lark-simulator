import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

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

interface ApprovalDetailsBoxProps {
  onDetailsChange: (details: ApprovalDetails) => void;
  initialDetails?: ApprovalDetails;
}

export function ApprovalDetailsBox({ onDetailsChange, initialDetails }: ApprovalDetailsBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<'standard' | 'quick' | 'custom'>('quick');
  
  // シンプルな初期値
  const getDefaultDetails = (): ApprovalDetails => ({
    department: '情報システム部',
    requestor: '',
    requestDate: new Date().toISOString().split('T')[0],
    implementationPeriod: '3ヶ月以内',
    approvers: [
      { position: '部門長', name: '', department: '情報システム部' },
      { position: 'CIO/CTO', name: '', department: '経営企画部' },
      { position: 'CEO', name: '', department: '経営層' }
    ],
    budgetInfo: {
      totalAmount: 'シミュレーション結果参照',
      budgetSource: '運営予算',
      accountingPeriod: '2025年度'
    },
    riskAssessment: '段階的導入により最小化',
    alternativeOptions: '詳細稟議書内で分析済み'
  });

  const [details, setDetails] = useState<ApprovalDetails>(initialDetails || getDefaultDetails());

  const handleDetailsUpdate = (newDetails: ApprovalDetails) => {
    setDetails(newDetails);
    onDetailsChange(newDetails);
  };

  // テンプレート選択時の処理
  const applyTemplate = (template: 'standard' | 'quick' | 'custom') => {
    setSelectedTemplate(template);
    
    if (template === 'quick') {
      // クイック設定：最小限の入力で完了
      handleDetailsUpdate({
        ...getDefaultDetails(),
        requestor: details.requestor // 名前は保持
      });
    } else if (template === 'standard') {
      // 標準設定：一般的な承認フロー
      handleDetailsUpdate({
        ...details,
        approvers: [
          { position: '課長', name: '', department: details.department },
          { position: '部長', name: '', department: details.department },
          { position: '役員', name: '', department: '経営層' }
        ],
        riskAssessment: '移行計画とトレーニングにより対応',
        alternativeOptions: '費用対効果の観点からLarkが最適'
      });
    }
    // custom の場合は現在の値を保持
  };

  const implementationPeriods = ['即座', '1ヶ月以内', '3ヶ月以内', '6ヶ月以内'];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <Text style={styles.toggleTitle}>
          ✅ 承認プロセス設定 {isExpanded ? '▼' : '▶'}
        </Text>
        <Text style={styles.toggleSubtitle}>
          承認者情報をシンプルに設定
        </Text>
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.detailsContent}>
          {/* テンプレート選択 */}
          <View style={styles.templateSection}>
            <Text style={styles.templateTitle}>設定方法を選択</Text>
            <View style={styles.templateButtons}>
              <TouchableOpacity
                style={[styles.templateButton, selectedTemplate === 'quick' && styles.selectedTemplate]}
                onPress={() => applyTemplate('quick')}
              >
                <Text style={[styles.templateButtonText, selectedTemplate === 'quick' && styles.selectedTemplateText]}>
                  🚀 クイック設定
                </Text>
                <Text style={styles.templateDescription}>最小限の入力で完了</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.templateButton, selectedTemplate === 'standard' && styles.selectedTemplate]}
                onPress={() => applyTemplate('standard')}
              >
                <Text style={[styles.templateButtonText, selectedTemplate === 'standard' && styles.selectedTemplateText]}>
                  📋 標準設定
                </Text>
                <Text style={styles.templateDescription}>一般的な承認フロー</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.templateButton, selectedTemplate === 'custom' && styles.selectedTemplate]}
                onPress={() => applyTemplate('custom')}
              >
                <Text style={[styles.templateButtonText, selectedTemplate === 'custom' && styles.selectedTemplateText]}>
                  ⚙️ カスタム
                </Text>
                <Text style={styles.templateDescription}>詳細に設定</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 必須項目のみ */}
          <View style={styles.essentialSection}>
            <Text style={styles.sectionTitle}>必須項目</Text>
            
            <View style={styles.inputRow}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>申請者名</Text>
                <TextInput
                  style={styles.textInput}
                  value={details.requestor}
                  onChangeText={(value) => handleDetailsUpdate({ ...details, requestor: value })}
                  placeholder="山田太郎"
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>部門</Text>
                <TextInput
                  style={styles.textInput}
                  value={details.department}
                  onChangeText={(value) => handleDetailsUpdate({ ...details, department: value })}
                  placeholder="情報システム部"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>導入時期</Text>
              <View style={styles.periodButtons}>
                {implementationPeriods.map((period) => (
                  <TouchableOpacity
                    key={period}
                    style={[
                      styles.periodButton,
                      details.implementationPeriod === period && styles.selectedPeriod
                    ]}
                    onPress={() => handleDetailsUpdate({ ...details, implementationPeriod: period })}
                  >
                    <Text style={[
                      styles.periodButtonText,
                      details.implementationPeriod === period && styles.selectedPeriodText
                    ]}>
                      {period}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* カスタム設定時のみ表示 */}
          {selectedTemplate === 'custom' && (
            <View style={styles.customSection}>
              <Text style={styles.sectionTitle}>承認者設定</Text>
              
              {details.approvers.map((approver, index) => (
                <View key={index} style={styles.approverRow}>
                  <Text style={styles.approverPosition}>{approver.position}</Text>
                  <TextInput
                    style={[styles.textInput, styles.approverInput]}
                    value={approver.name}
                    onChangeText={(value) => {
                      const newApprovers = [...details.approvers];
                      newApprovers[index] = { ...newApprovers[index], name: value };
                      handleDetailsUpdate({ ...details, approvers: newApprovers });
                    }}
                    placeholder="氏名"
                  />
                </View>
              ))}
            </View>
          )}

          {/* 設定完了メッセージ */}
          <View style={styles.statusMessage}>
            <Text style={styles.statusIcon}>✅</Text>
            <Text style={styles.statusText}>
              {selectedTemplate === 'quick' 
                ? 'クイック設定が適用されました' 
                : selectedTemplate === 'standard'
                ? '標準的な承認フローが設定されました'
                : '承認フローをカスタマイズしてください'}
            </Text>
          </View>
        </View>
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
  toggleButton: {
    padding: spacing.lg,
  },
  toggleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: spacing.xs,
  },
  toggleSubtitle: {
    fontSize: 14,
    color: Colors.gray[600],
  },
  detailsContent: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  templateSection: {
    marginBottom: spacing.lg,
  },
  templateTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  templateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  templateButton: {
    flex: 1,
    backgroundColor: Colors.gray[100] as string,
    padding: spacing.sm,
    borderRadius: 8,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  selectedTemplate: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  templateButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 2,
  },
  selectedTemplateText: {
    color: Colors.white,
  },
  templateDescription: {
    fontSize: 10,
    color: Colors.gray[600],
  },
  essentialSection: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  inputGroup: {
    flex: 1,
    marginHorizontal: spacing.xs,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  textInput: {
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 6,
    padding: spacing.sm,
    fontSize: 14,
    color: Colors.text,
    backgroundColor: Colors.white,
  },
  periodButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  periodButton: {
    backgroundColor: Colors.gray[100] as string,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  selectedPeriod: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  periodButtonText: {
    fontSize: 12,
    color: Colors.text,
  },
  selectedPeriodText: {
    color: Colors.white,
    fontWeight: '500',
  },
  customSection: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.gray[200],
  },
  approverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  approverPosition: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.primary,
    width: 80,
  },
  approverInput: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  statusMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success + '20',
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.md,
  },
  statusIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  statusText: {
    fontSize: 14,
    color: Colors.success,
    fontWeight: '500',
  },
});