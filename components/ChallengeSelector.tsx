import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';
import { CurrentChallenge } from '@/store/advanced-simulator-store';
import { Ionicons } from '@expo/vector-icons';

interface ChallengeSelectorProps {
  challenges: CurrentChallenge[];
  onToggle: (challengeId: string) => void;
  onUpdateCustomText: (challengeId: string, text: string) => void;
}

export const ChallengeSelector: React.FC<ChallengeSelectorProps> = ({
  challenges,
  onToggle,
  onUpdateCustomText,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>現状の課題</Text>
      <Text style={styles.helper}>該当する課題を選択してください（複数選択可）</Text>
      
      <View style={styles.challengeGrid}>
        {challenges.map((challenge) => (
          <View key={challenge.id} style={styles.challengeWrapper}>
            <TouchableOpacity
              style={[
                styles.challengeItem,
                challenge.selected && styles.challengeItemSelected,
              ]}
              onPress={() => onToggle(challenge.id)}
            >
              <View style={[
                styles.checkbox,
                challenge.selected && styles.checkboxSelected,
              ]}>
                {challenge.selected && (
                  <Ionicons name="checkmark" size={16} color={Colors.white} />
                )}
              </View>
              <Text style={[
                styles.challengeText,
                challenge.selected && styles.challengeTextSelected,
              ]}>
                {challenge.label}
              </Text>
            </TouchableOpacity>
            
            {challenge.id === 'other' && challenge.selected && (
              <TextInput
                style={styles.customInput}
                placeholder="具体的な課題を入力してください"
                placeholderTextColor={Colors.gray[400]}
                value={challenge.customText}
                onChangeText={(text) => onUpdateCustomText(challenge.id, text)}
                multiline
              />
            )}
          </View>
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
  challengeGrid: {
    flexDirection: 'column',
    gap: 12,
  },
  challengeWrapper: {
    flexDirection: 'column',
  },
  challengeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray[200],
  },
  challengeItemSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary + '08',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  challengeText: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[700],
    flex: 1,
  },
  challengeTextSelected: {
    color: Colors.gray[900],
    fontWeight: '500',
  },
  customInput: {
    marginTop: 8,
    marginLeft: 36,
    padding: 12,
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 8,
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[900],
    minHeight: 80,
    textAlignVertical: 'top',
  },
});