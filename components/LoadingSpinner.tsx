import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../constants/colors';
import { getResponsiveSize } from '../constants/responsive';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

export function LoadingSpinner({ message = 'Loading...', size = 'large' }: LoadingSpinnerProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={Colors.primary} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: getResponsiveSize(20),
  },
  message: {
    marginTop: getResponsiveSize(12),
    fontSize: getResponsiveSize(14),
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});