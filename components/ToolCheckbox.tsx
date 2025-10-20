import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Colors from "@/constants/colors";

interface ToolCheckboxProps {
  id: string;
  name: string;
  icon: string;
  isSelected: boolean;
  onToggle: (id: string) => void;
  price: number;
}

export default function ToolCheckbox({
  id,
  name,
  icon,
  isSelected,
  onToggle,
  price,
}: ToolCheckboxProps) {
  return (
    <Pressable
      style={[
        styles.container,
        isSelected && styles.containerSelected,
      ]}
      onPress={() => onToggle(id)}
    >
      <View style={[styles.iconContainer, isSelected && styles.iconContainerSelected]}>
        <FontAwesome
          name={icon as any}
          size={20}
          color={isSelected ? Colors.white : Colors.primary}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text 
          style={[styles.name, isSelected && styles.nameSelected]} 
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {name}
        </Text>
        <Text style={[styles.price, isSelected && styles.priceSelected]}>
          ¥{price.toLocaleString()}/人
        </Text>
      </View>
      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && (
          <FontAwesome name="check" size={12} color={Colors.white} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 12,
    marginBottom: 8,
    marginHorizontal: 2,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 80,
  },
  containerSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.gray[100] as string,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconContainerSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  contentContainer: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  nameSelected: {
    color: Colors.white,
  },
  price: {
    fontSize: 14,
    color: Colors.gray[600],
    fontWeight: "500",
  },
  priceSelected: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.gray[300],
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  checkboxSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderColor: Colors.white,
  },
});