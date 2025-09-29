// app/components/ui/Button.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from "react-native";

type Props = {
  title: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: "primary" | "ghost";
};

export default function PrimaryButton({ title, onPress, variant = "primary" }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, variant === "ghost" && styles.ghost]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === "ghost" && styles.ghostText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 14,
    borderRadius: 999,
    alignItems: "center",
    marginBottom: 20,
  },
  text: { color: "#fff", fontWeight: "700" },
  ghost: { backgroundColor: "#f2f2f2", borderWidth: 1, borderColor: "#ddd" },
  ghostText: { color: "#111" },
});
