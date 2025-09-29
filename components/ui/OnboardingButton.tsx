// app/components/ui/OnboardingButton.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

type Props = {
  title: string;
  onPress?: () => void;
};

export default function OnboardingButton({ title, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.85}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#F3F4F6", // gris clair
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    fontFamily: "System",
  },
  arrow: {
    fontSize: 20,
    color: "#111827",
    marginLeft: 8,
  },
});
