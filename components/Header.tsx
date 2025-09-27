import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "@/constants/colors";
import { getResponsiveDimensions, spacing } from "@/constants/responsive";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const {
    isDesktop,
    horizontalPadding,
    titleSize,
    subtitleSize,
    containerWidth,
  } = getResponsiveDimensions();

  return (
    <View style={[styles.container, { paddingHorizontal: horizontalPadding }]}>
      <View style={[styles.content, { width: isDesktop ? containerWidth : undefined, alignSelf: 'center' }]}>
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, { fontSize: isDesktop ? 28 : 20 }]}>LARK</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontSize: titleSize }]}>{title}</Text>
          {subtitle && <Text style={[styles.subtitle, { fontSize: subtitleSize }]}>{subtitle}</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  content: {
  },
  logoContainer: {
    marginBottom: spacing.xs,
  },
  logoText: {
    fontWeight: "800",
    color: Colors.primary,
  },
  titleContainer: {
    marginTop: spacing.xs,
  },
  title: {
    fontWeight: "700",
    color: Colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: Colors.gray[600],
  },
});