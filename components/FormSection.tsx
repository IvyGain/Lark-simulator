import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
      </View>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    backgroundColor: Colors.gray[100] as string,
    borderRadius: 16,
    padding: isDesktop ? 24 : 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: isDesktop ? 24 : 20,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: 4,
  },
  description: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    lineHeight: isDesktop ? 24 : 20,
  },
  content: {
    // Content styles can be customized per usage
  },
});