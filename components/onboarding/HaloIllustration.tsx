// app/components/onboarding/HaloIllustration.tsx
import React from "react";
import { View, StyleSheet } from "react-native";

/**
 * HaloIllustration : gros halo flou simulé + placeholder carré avec croix.
 * size : taille du placeholder carré (par défaut 220).
 */
export default function HaloIllustration({ size = 220 }: { size?: number }) {
  const haloSize = Math.round(size * 1.6);

  return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 8, marginBottom: 8 }}>
      {/* Halo (grande forme derrière l'illustration) */}
      {/*<View style={[styles.halo, { width: haloSize, height: haloSize, borderRadius: haloSize / 2 }]} />

      {/* Placeholder illustration (carré avec croix) */}
      <View style={[styles.placeholder, { width: size, height: size, borderRadius: 14 }]}>
        <View style={styles.crossH} />
        <View style={styles.crossV} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  halo: {
    position: "absolute",
    backgroundColor: "#6C6C6C",
    opacity: 0.12,
    // shadow large pour "diffuser" le halo (iOS)
    shadowColor: "#6C6C6C",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 75,
    // elevation pour Android (approximatif)
    elevation: 28,
  },
  placeholder: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  crossH: {
    position: "absolute",
    width: "56%",
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  crossV: {
    position: "absolute",
    height: "56%",
    width: 1,
    backgroundColor: "#E5E7EB",
  },
});
