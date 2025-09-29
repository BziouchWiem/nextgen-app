// app/(public)/onboarding/Onboarding_00_Splash.tsx
import React, { useEffect } from "react";
import { SafeAreaView, View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Onboarding_00_Splash() {
  const router = useRouter();
  useEffect(() => {
    const t = setTimeout(() => {
      router.replace("/(public)/onboarding/Onboarding_01_Welcome");
    }, 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <Text style={styles.title}>NextGen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff", justifyContent: "center", alignItems: "center" },
  center: { alignItems: "center" },
  title: { fontSize: 36, fontWeight: "800", color: "#111827" },
});
