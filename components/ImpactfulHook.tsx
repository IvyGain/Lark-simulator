import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';

export function ImpactfulHook() {
  return (
    <View style={styles.container}>
      <Text style={styles.line1}>今のツール代75%カットできて、</Text>
      <Text style={styles.line2}>300%以上効率化されたとしたら...？</Text>
      <Text style={styles.line3}>Larkの統合プラットフォームで実現しませんか？</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    backgroundColor: Colors.white,
    marginBottom: spacing.lg,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  line1: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  line2: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  line3: {
    fontSize: 18,
    fontWeight: '500',
    color: Colors.text,
    textAlign: 'center',
  },
});