import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import Colors from "@/constants/colors";
import { getResponsiveDimensions, spacing } from "@/constants/responsive";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  url?: string;
  size?: "small" | "medium" | "large";
}

export default function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  style,
  url,
  size = "medium",
}: ButtonProps) {
  const { isDesktop, buttonSize } = getResponsiveDimensions();

  const handlePress = async () => {
    if (url) {
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      }
    } else {
      onPress();
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          paddingVertical: spacing.xs,
          paddingHorizontal: spacing.sm,
          minWidth: isDesktop ? 100 : 80,
          fontSize: buttonSize - 2,
        };
      case "large":
        return {
          paddingVertical: spacing.md,
          paddingHorizontal: spacing.lg,
          minWidth: isDesktop ? 180 : 150,
          fontSize: buttonSize + 2,
        };
      default:
        return {
          paddingVertical: spacing.sm,
          paddingHorizontal: spacing.md,
          minWidth: isDesktop ? 140 : 120,
          fontSize: buttonSize,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  const buttonStyles = [
    styles.button,
    {
      paddingVertical: sizeStyles.paddingVertical,
      paddingHorizontal: sizeStyles.paddingHorizontal,
      minWidth: sizeStyles.minWidth,
    },
    variant === "primary" && styles.primaryButton,
    variant === "secondary" && styles.secondaryButton,
    variant === "outline" && styles.outlineButton,
    disabled && styles.disabledButton,
    style,
  ];

  const textStyles = [
    styles.text,
    { fontSize: sizeStyles.fontSize },
    variant === "primary" && styles.primaryText,
    variant === "secondary" && styles.secondaryText,
    variant === "outline" && styles.outlineText,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? Colors.primary : Colors.white}
          size={isDesktop ? "default" : "small"}
        />
      ) : (
        <Text style={textStyles}>{typeof title === 'string' ? title : JSON.stringify(title)}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.secondary,
  },
  outlineButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  disabledButton: {
    backgroundColor: Colors.gray[300] as string,
    borderColor: Colors.gray[300],
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledText: {
    color: Colors.gray[500],
  },
});