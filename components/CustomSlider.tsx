import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Slider from "@react-native-community/slider";
import Colors from "@/constants/colors";

interface CustomSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  minimumValue: number;
  maximumValue: number;
  step?: number;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
}

export default function CustomSlider({
  value,
  onValueChange,
  minimumValue,
  maximumValue,
  step = 1,
  minimumTrackTintColor = Colors.primary,
  maximumTrackTintColor = Colors.gray[300],
  thumbTintColor = Colors.primary,
}: CustomSliderProps) {
  // For web, use a native HTML input to avoid ReactDOM.findDOMNode issues
  if (Platform.OS === "web") {
    return (
      <View style={styles.webContainer}>
        <input
          type="range"
          min={minimumValue}
          max={maximumValue}
          step={step}
          value={value}
          onChange={(e) => onValueChange(Number(e.target.value))}
          style={{
            width: "100%",
            height: 40,
            accentColor: minimumTrackTintColor,
          }}
        />
      </View>
    );
  }

  // For native platforms, use the React Native Community Slider
  return (
    <Slider
      style={styles.slider}
      minimumValue={minimumValue}
      maximumValue={maximumValue}
      step={step}
      value={value}
      onValueChange={onValueChange}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      thumbTintColor={thumbTintColor}
    />
  );
}

const styles = StyleSheet.create({
  slider: {
    width: "100%",
    height: 40,
  },
  webContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
  },
});