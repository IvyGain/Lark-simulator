import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import { tools } from '@/constants/tools';
import { ToolDetail } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

interface ToolFeeInputProps {
  selectedTools: ToolDetail[];
  onAdd: (tool: ToolDetail) => void;
  onRemove: (toolId: string) => void;
  onUpdate: (toolId: string, monthlyFee: number, annualFee: number, isAnnualBilling: boolean) => void;
}

export const ToolFeeInput: React.FC<ToolFeeInputProps> = ({
  selectedTools,
  onAdd,
  onRemove,
  onUpdate,
}) => {
  const [showToolPicker, setShowToolPicker] = useState(false);

  const handleAddTool = (toolId: string) => {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
      onAdd({
        toolId,
        monthlyFee: tool.pricePerUser,
        annualFee: tool.pricePerUser * 12,
        isAnnualBilling: false,
      });
    }
    setShowToolPicker(false);
  };

  const handleFeeChange = (toolId: string, field: 'monthly' | 'annual', value: string) => {
    const tool = selectedTools.find(t => t.toolId === toolId);
    if (!tool) return;

    const numValue = parseFloat(value) || 0;
    if (field === 'monthly') {
      onUpdate(toolId, numValue, tool.annualFee, tool.isAnnualBilling);
    } else {
      onUpdate(toolId, tool.monthlyFee, numValue, tool.isAnnualBilling);
    }
  };

  const toggleBillingType = (toolId: string) => {
    const tool = selectedTools.find(t => t.toolId === toolId);
    if (!tool) return;
    onUpdate(toolId, tool.monthlyFee, tool.annualFee, !tool.isAnnualBilling);
  };

  const availableTools = tools.filter(
    tool => !selectedTools.some(selected => selected.toolId === tool.id)
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>現在利用中の業務ツール</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowToolPicker(!showToolPicker)}
        >
          <Ionicons name="add-circle" size={24} color={Colors.primary} />
          <Text style={styles.addButtonText}>ツールを追加</Text>
        </TouchableOpacity>
      </View>

      {showToolPicker && (
        <View style={styles.toolPicker}>
          <ScrollView style={styles.toolPickerScroll}>
            {availableTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={styles.toolPickerItem}
                onPress={() => handleAddTool(tool.id)}
              >
                <Text style={styles.toolPickerIcon}>{tool.icon}</Text>
                <Text style={styles.toolPickerName}>{tool.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {selectedTools.map((toolDetail) => {
        const tool = tools.find(t => t.id === toolDetail.toolId);
        if (!tool) return null;

        return (
          <View key={toolDetail.toolId} style={styles.toolItem}>
            <View style={styles.toolHeader}>
              <View style={styles.toolInfo}>
                <Text style={styles.toolIcon}>{tool.icon}</Text>
                <Text style={styles.toolName}>{tool.name}</Text>
              </View>
              <TouchableOpacity
                onPress={() => onRemove(toolDetail.toolId)}
                style={styles.removeButton}
              >
                <Ionicons name="close-circle" size={24} color={Colors.error} />
              </TouchableOpacity>
            </View>

            <View style={styles.feeInputs}>
              <View style={styles.feeInputContainer}>
                <Text style={styles.feeLabel}>月額費用（1人あたり）</Text>
                <View style={styles.feeInputWrapper}>
                  <Text style={styles.currencySymbol}>¥</Text>
                  <TextInput
                    style={[
                      styles.feeInput,
                      !toolDetail.isAnnualBilling && styles.activeFeeInput
                    ]}
                    value={toolDetail.monthlyFee.toString()}
                    onChangeText={(value) => handleFeeChange(toolDetail.toolId, 'monthly', value)}
                    keyboardType="numeric"
                    editable={!toolDetail.isAnnualBilling}
                  />
                </View>
              </View>

              <View style={styles.feeInputContainer}>
                <Text style={styles.feeLabel}>年額費用（1人あたり）</Text>
                <View style={styles.feeInputWrapper}>
                  <Text style={styles.currencySymbol}>¥</Text>
                  <TextInput
                    style={[
                      styles.feeInput,
                      toolDetail.isAnnualBilling && styles.activeFeeInput
                    ]}
                    value={toolDetail.annualFee.toString()}
                    onChangeText={(value) => handleFeeChange(toolDetail.toolId, 'annual', value)}
                    keyboardType="numeric"
                    editable={toolDetail.isAnnualBilling}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.billingToggle}
              onPress={() => toggleBillingType(toolDetail.toolId)}
            >
              <Text style={styles.billingToggleText}>
                {toolDetail.isAnnualBilling ? '年額請求' : '月額請求'}に設定中
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}

      {selectedTools.length === 0 && (
        <Text style={styles.emptyText}>
          現在利用中のツールを追加してください
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
  },
  addButtonText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.primary,
    marginLeft: 4,
    fontWeight: '500',
  },
  toolPicker: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    marginBottom: 16,
    maxHeight: 200,
  },
  toolPickerScroll: {
    padding: 8,
  },
  toolPickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  toolPickerIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  toolPickerName: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[900],
  },
  toolItem: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    padding: 16,
    marginBottom: 12,
  },
  toolHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toolInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toolIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  toolName: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.gray[900],
  },
  removeButton: {
    padding: 4,
  },
  feeInputs: {
    flexDirection: isDesktop ? 'row' : 'column',
    gap: 16,
  },
  feeInputContainer: {
    flex: 1,
  },
  feeLabel: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginBottom: 4,
  },
  feeInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  currencySymbol: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    marginRight: 4,
  },
  feeInput: {
    flex: 1,
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[900],
    padding: 0,
  },
  activeFeeInput: {
    backgroundColor: Colors.white,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  billingToggle: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary + '10',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  billingToggleText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.primary,
    fontWeight: '500',
  },
  emptyText: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[500],
    textAlign: 'center',
    paddingVertical: 32,
  },
});