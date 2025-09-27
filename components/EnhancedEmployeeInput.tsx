import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';
import { isDesktop, spacing } from '@/constants/responsive';
import { Ionicons } from '@expo/vector-icons';
import CustomSlider from '@/components/CustomSlider';

interface EnhancedEmployeeInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export const EnhancedEmployeeInput: React.FC<EnhancedEmployeeInputProps> = ({
  value,
  onChange,
  min = 1,
  max = 1000,
}) => {
  const [inputValue, setInputValue] = useState(value.toString());

  const handleTextChange = (text: string) => {
    setInputValue(text);
    const numValue = parseInt(text, 10);
    if (!isNaN(numValue) && numValue >= min && numValue <= max) {
      onChange(numValue);
    }
  };

  const handleIncrement = () => {
    const newValue = Math.min(value + 1, max);
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  const handleDecrement = () => {
    const newValue = Math.max(value - 1, min);
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  const handleSliderChange = (newValue: number) => {
    onChange(newValue);
    setInputValue(newValue.toString());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>従業員数</Text>
      
      {/* メイン数値表示とコントロール */}
      <View style={styles.mainControl}>
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={handleDecrement}
          disabled={value <= min}
        >
          <Ionicons 
            name="remove" 
            size={24} 
            color={value <= min ? Colors.gray[400] : Colors.primary} 
          />
        </TouchableOpacity>
        
        <View style={styles.numberDisplay}>
          <TextInput
            style={styles.numberInput}
            value={inputValue}
            onChangeText={handleTextChange}
            keyboardType="numeric"
            textAlign="center"
            selectTextOnFocus
          />
          <Text style={styles.unit}>名</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={handleIncrement}
          disabled={value >= max}
        >
          <Ionicons 
            name="add" 
            size={24} 
            color={value >= max ? Colors.gray[400] : Colors.primary} 
          />
        </TouchableOpacity>
      </View>

      {/* スライダー */}
      <View style={styles.sliderContainer}>
        <CustomSlider
          value={value}
          onValueChange={handleSliderChange}
          minimumValue={min}
          maximumValue={max}
          step={1}
        />
        <View style={styles.sliderLabels}>
          <Text style={styles.sliderLabel}>{min}名</Text>
          <Text style={styles.sliderLabel}>{max}名</Text>
        </View>
      </View>

      {/* ヘルプテキスト */}
      <Text style={styles.helper}>
        スライダーまたは数値を直接編集して調整できます
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '700',
    color: Colors.gray[900],
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  mainControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  controlButton: {
    width: isDesktop ? 56 : 48,
    height: isDesktop ? 56 : 48,
    borderRadius: isDesktop ? 28 : 24,
    backgroundColor: Colors.gray[100] as string,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: spacing.md,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  numberDisplay: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: isDesktop ? 200 : 160,
  },
  numberInput: {
    fontSize: isDesktop ? 48 : 40,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
    minWidth: isDesktop ? 120 : 100,
    padding: 0,
    backgroundColor: 'transparent',
  },
  unit: {
    fontSize: isDesktop ? 20 : 18,
    fontWeight: '500',
    color: Colors.gray[600],
    marginTop: spacing.xs,
  },
  sliderContainer: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xs,
  },
  sliderLabel: {
    fontSize: isDesktop ? 12 : 11,
    color: Colors.gray[500],
  },
  helper: {
    fontSize: isDesktop ? 14 : 12,
    color: Colors.gray[500],
    textAlign: 'center',
    lineHeight: isDesktop ? 20 : 18,
  },
});