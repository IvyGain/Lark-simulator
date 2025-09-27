import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { spacing } from '../constants/responsive';
import Button from './Button';

interface CallToActionSectionProps {
  onContactSales?: () => void;
  onNewSimulation?: () => void;
}

export function CallToActionSection({ 
  onContactSales, 
  onNewSimulation 
}: CallToActionSectionProps) {
  return (
    <View style={styles.container}>
      {/* Main CTA Button */}
      <View style={styles.primaryCTA}>
        <Button
          title="【Lark導入相談】"
          onPress={onContactSales || (() => {})}
          variant="primary"
          size="large"
        />
      </View>

      {/* Secondary Action Buttons */}
      <View style={styles.secondaryActions}>
        <Button
          title="詳細を問い合わせる"
          onPress={() => {}}
          variant="secondary"
          size="medium"
        />
        
        <Button
          title="新しいシミュレーション"
          onPress={onNewSimulation || (() => {})}
          variant="outline"
          size="medium"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.xl,
    marginBottom: spacing.xxl,
  },
  primaryCTA: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});