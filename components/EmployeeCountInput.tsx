import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop } from '@/constants/responsive';

interface EmployeeCountInputProps {
  value: number;
  onChange: (count: number) => void;
  min?: number;
  max?: number;
}

export const EmployeeCountInput: React.FC<EmployeeCountInputProps> = ({
  value,
  onChange,
  min = 1,
  max = 10000,
}) => {
  const handleChange = (text: string) => {
    const numValue = parseInt(text, 10);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    } else if (text === '') {
      onChange(min);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>従業員数</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value.toString()}
          onChangeText={handleChange}
          keyboardType="numeric"
          placeholder={`${min}〜${max}`}
          placeholderTextColor={Colors.gray[400]}
        />
        <Text style={styles.unit}>名</Text>
      </View>
      <Text style={styles.helper}>
        {min}名から{max}名まで入力可能です
      </Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.gray[200],
    borderRadius: 12,
    paddingHorizontal: 16,
    height: isDesktop ? 56 : 48,
  },
  input: {
    flex: 1,
    fontSize: isDesktop ? 18 : 16,
    color: Colors.gray[900],
    padding: 0,
  },
  unit: {
    fontSize: isDesktop ? 16 : 14,
    color: Colors.gray[600],
    marginLeft: 8,
  },
  helper: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[500],
    marginTop: 4,
  },
});