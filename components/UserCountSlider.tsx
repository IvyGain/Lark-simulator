import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import CustomSlider from "./CustomSlider";

interface UserCountSliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export default function UserCountSlider({
  value,
  onChange,
  min = 1,
  max = 500,
}: UserCountSliderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>利用者数</Text>
        <Text style={styles.value}>{value}人</Text>
      </View>
      <CustomSlider
        minimumValue={min}
        maximumValue={max}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor={Colors.primary}
        maximumTrackTintColor={Colors.gray[300]}
        thumbTintColor={Colors.primary}
      />
      <View style={styles.rangeLabels}>
        <Text style={styles.rangeLabel}>{min}人</Text>
        <Text style={styles.rangeLabel}>{max}人</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.text,
  },
  value: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.primary,
  },
  rangeLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  rangeLabel: {
    fontSize: 11,
    color: Colors.gray[600],
  },
});