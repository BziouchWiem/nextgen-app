// app/components/onboarding/ProgressDots.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";

// --- Configuration ---
const DOT_SIZE = 8; // La taille des points inactifs
const DOT_SPACING = 8; // L'espace entre les points
const ACTIVE_COLOR = "#2563EB"; // Bleu vif de votre palette
const INACTIVE_COLOR = "#E5E7EB"; // Gris clair

// Configuration de l'animation pour un effet "ressort" (spring)
const ANIMATION_CONFIG: WithTimingConfig = {
  duration: 350,
};

type Props = {
  total: number;
  index: number;
};

export default function ProgressDots({ total, index }: Props) {
  // Style animé pour l'indicateur "ver" qui se déplace
  const animatedWormStyle = useAnimatedStyle(() => {
    // On calcule la position 'left' de l'indicateur.
    // Chaque point + son espacement occupe (DOT_SIZE + DOT_SPACING) pixels.
    const translateX = index * (DOT_SIZE + DOT_SPACING);

    return {
      // On anime la translation sur l'axe X
      transform: [{ translateX: withTiming(translateX, ANIMATION_CONFIG) }],
    };
  });

  return (
    <View style={styles.container}>
      {/* 1. Les points de fond (inactifs) */}
      {/* Ils ne bougent jamais et servent de "rail" pour l'indicateur. */}
      {Array.from({ length: total }).map((_, i) => (
        <View key={i} style={styles.dot} />
      ))}

      {/* 2. L'indicateur "ver" animé */}
      {/* C'est une View absolue qui se déplace par-dessus les points de fond. */}
      <Animated.View style={[styles.worm, animatedWormStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  // Style pour les points gris en arrière-plan
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: INACTIVE_COLOR,
    marginHorizontal: DOT_SPACING / 2, // On divise l'espacement en deux pour chaque côté
  },
  // Style pour l'indicateur "ver" animé
  worm: {
    position: "absolute", // Se superpose aux autres éléments
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    backgroundColor: ACTIVE_COLOR,
    // On le positionne au début du premier point
    left: DOT_SPACING / 2,
  },
});
