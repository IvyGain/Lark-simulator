import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';
import UserCountSlider from './UserCountSlider';
import CategorySection from './CategorySection';

interface Tool {
  id: string;
  name: string;
  pricePerUser: number;
  customMonthlyFee?: number;
}

interface CompanyInfoBoxProps {
  companyName: string;
  industry: string;
  employeeCount: number;
  selectedTools: Tool[];
  onUpdateCompanyName?: (name: string) => void;
  onUpdateIndustry?: (industry: string) => void;
  onUpdateEmployeeCount?: (count: number) => void;
  onToggleTool?: (toolId: string) => void;
  toolsByCategory?: Record<string, Tool[]>;
  categoryTranslations?: Record<string, string>;
}

export function CompanyInfoBox({
  companyName,
  industry,
  employeeCount,
  selectedTools = [],
  onUpdateCompanyName,
  onUpdateIndustry,
  onUpdateEmployeeCount,
  onToggleTool,
  toolsByCategory = {},
  categoryTranslations = {}
}: CompanyInfoBoxProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editCompanyName, setEditCompanyName] = useState(companyName);
  const [editIndustry, setEditIndustry] = useState(industry);
  const [editEmployeeCount, setEditEmployeeCount] = useState(employeeCount);
  
  const industryOptions = [
    'IT・ソフトウェア',
    '製造業', 
    '商社・貿易',
    '建設・不動産',
    '医療・ヘルスケア',
    'その他'
  ];
  
  const handleSave = () => {
    if (onUpdateCompanyName && editCompanyName !== companyName) {
      onUpdateCompanyName(editCompanyName);
    }
    if (onUpdateIndustry && editIndustry !== industry) {
      onUpdateIndustry(editIndustry);
    }
    if (onUpdateEmployeeCount && editEmployeeCount !== employeeCount) {
      onUpdateEmployeeCount(editEmployeeCount);
    }
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditCompanyName(companyName);
    setEditIndustry(industry);
    setEditEmployeeCount(employeeCount);
    setIsEditing(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.companyHeader}>
        <Text style={styles.companyName}>{companyName || '貴社'}</Text>
        <View style={styles.headerActions}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>シミュレーション結果</Text>
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Text style={styles.editButtonText}>
              {isEditing ? 'キャンセル' : '前提条件を修正'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {isEditing ? (
        <ScrollView style={styles.editContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.editContent}>
            {/* 会社名編集 */}
            <View style={styles.editSection}>
              <Text style={styles.editLabel}>会社名</Text>
              <TextInput
                style={styles.editInput}
                value={editCompanyName}
                onChangeText={setEditCompanyName}
                placeholder="会社名を入力"
              />
            </View>
            
            {/* 業種編集 */}
            <View style={styles.editSection}>
              <Text style={styles.editLabel}>業種</Text>
              <View style={styles.industryOptions}>
                {industryOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.industryOption,
                      editIndustry === option && styles.selectedIndustryOption
                    ]}
                    onPress={() => setEditIndustry(option)}
                  >
                    <Text style={[
                      styles.industryOptionText,
                      editIndustry === option && styles.selectedIndustryOptionText
                    ]}>
                      {option}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            {/* 従業員数編集 */}
            <View style={styles.editSection}>
              <Text style={styles.editLabel}>従業員数: {editEmployeeCount}名</Text>
              <UserCountSlider 
                value={editEmployeeCount}
                onChange={setEditEmployeeCount}
              />
            </View>
            
            {/* ツール選択編集 */}
            <View style={styles.editSection}>
              <Text style={styles.editLabel}>ツール選択 ({selectedTools?.length || 0}個選択中)</Text>
              <ScrollView 
                style={styles.toolSelectionContainer} 
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
              >
                {Object.keys(toolsByCategory || {}).map((category) => (
                  <View key={category} style={styles.toolCategoryWrapper}>
                    <CategorySection
                      category={categoryTranslations[category] || category}
                      tools={toolsByCategory[category] || []}
                      selectedTools={selectedTools?.map(t => t.id) || []}
                      onToggleTool={onToggleTool || (() => {})}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>
            
            {/* 保存ボタン */}
            <View style={styles.editActions}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>キャンセル</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>保存</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>業種</Text>
            <Text style={styles.infoValue}>{industry}</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>従業員数</Text>
            <Text style={styles.infoValue}>{employeeCount}名</Text>
          </View>
          
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>選択ツール</Text>
            <Text style={styles.infoValue}>{selectedTools?.length || 0}個</Text>
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
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  badge: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: '600',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.gray[600],
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: Colors.gray[100] as string,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    marginLeft: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  editButtonText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '600',
  },
  editContainer: {
    backgroundColor: Colors.gray[50] as string,
    borderRadius: 8,
    maxHeight: 500,
  },
  editContent: {
    padding: spacing.md,
  },
  editSection: {
    marginBottom: spacing.md,
  },
  editLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  editInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: 6,
    padding: spacing.sm,
    fontSize: 16,
    color: Colors.text,
  },
  industryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  industryOption: {
    backgroundColor: Colors.white,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 15,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
    borderWidth: 1,
    borderColor: Colors.gray[300],
  },
  selectedIndustryOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  industryOptionText: {
    fontSize: 12,
    color: Colors.text,
  },
  selectedIndustryOptionText: {
    color: Colors.white,
    fontWeight: '500',
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: spacing.sm,
  },
  cancelButton: {
    backgroundColor: Colors.gray[200] as string,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  cancelButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 6,
  },
  saveButtonText: {
    fontSize: 14,
    color: Colors.white,
    fontWeight: '600',
  },
  toolSelectionContainer: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginTop: spacing.xs,
    maxHeight: 200,
  },
  toolCategoryWrapper: {
    marginBottom: spacing.xs,
  },
});