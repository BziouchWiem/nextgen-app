// app/(tabs)/profil.tsx
import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function Profil() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.text}>Infos utilisateur / settings (placeholder)</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "700", marginTop: 20 },
  text: { color: "#666", marginTop: 8 },
});
