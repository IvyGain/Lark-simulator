import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import { ExpectedImprovement } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

interface ImprovementSelectorProps {
  improvements: ExpectedImprovement[];
  onToggle: (improvementId: string) => void;
}

const improvementIcons: Record<string, string> = {
  'labor-reduction': 'time-outline',
  'paperless': 'document-outline',
  'info-centralization': 'git-merge-outline',
  'cost-reduction': 'cash-outline',
  'efficiency': 'rocket-outline',
};

export const ImprovementSelector: React.FC<ImprovementSelectorProps> = ({
  improvements,
  onToggle,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>期待する改善効果</Text>
      <Text style={styles.helper}>Lark導入で期待する効果を選択してください</Text>
      
      <View style={styles.improvementGrid}>
        {improvements.map((improvement) => (
          <TouchableOpacity
            key={improvement.id}
            style={[
              styles.improvementCard,
              improvement.selected && styles.improvementCardSelected,
            ]}
            onPress={() => onToggle(improvement.id)}
          >
            <View style={[
              styles.iconContainer,
              improvement.selected && styles.iconContainerSelected,
            ]}>
              <Ionicons
                name={improvementIcons[improvement.id] as any}
                size={32}
                color={improvement.selected ? Colors.primary : Colors.gray[400]}
              />
            </View>
            <Text style={[
              styles.improvementText,
              improvement.selected && styles.improvementTextSelected,
            ]}>
              {improvement.label}
            </Text>
            {improvement.selected && (
              <View style={styles.selectedBadge}>
                <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: isDesktop ? 18 : 16,
    fontWeight: '600',
    color: Colors.gray[900],
    marginBottom: 8,
  },
  helper: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[600],
    marginBottom: 16,
  },
  improvementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  improvementCard: {
    width: isDesktop ? 'calc(33.333% - 8px)' : 'calc(50% - 6px)',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    alignItems: 'center',
    position: 'relative',
  },
  improvementCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.gray[100] as string,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconContainerSelected: {
    backgroundColor: Colors.primary + '20',
  },
  improvementText: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[700],
    fontWeight: '500',
    textAlign: 'center',
  },
  improvementTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});