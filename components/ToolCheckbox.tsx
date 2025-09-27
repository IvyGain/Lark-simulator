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
          size={14}
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
          <FontAwesome name="check" size={8} color={Colors.white} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    backgroundColor: Colors.white,
    borderRadius: 6,
    marginBottom: 2,
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 1,
    minHeight: 50,
  },
  containerSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.gray[100] as string,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
  },
  iconContainerSelected: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  contentContainer: {
    flex: 1,
    marginRight: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 2,
  },
  nameSelected: {
    color: Colors.white,
  },
  price: {
    fontSize: 10,
    color: Colors.gray[600],
  },
  priceSelected: {
    color: "rgba(255, 255, 255, 0.8)",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
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