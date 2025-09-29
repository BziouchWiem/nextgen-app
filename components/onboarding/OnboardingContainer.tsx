import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";

// Importez tous les composants d'illustration que vous pourriez utiliser
import HaloIllustration from "./HaloIllustration";
import AnimatedIllustration from "./AnimatedIllustration";
import ProgressDots from "./ProgressDots";

// Définition des props pour le composant
type Props = {
  title?: string;
  subtitle?: string;
  showSkip?: boolean;
  stepIndex?: number | null;
  totalDots?: number | null;
  nextLabel?: string;
  onNext?: () => void;
  showIllustration?: boolean;
  showNextIcon?: boolean;
  illustrationSource?: ImageSourcePropType; // Pour les images statiques (.png, .jpg)
  animationSource?: any; // Pour les animations Lottie (.json)
};

export default function OnboardingContainer({
  title,
  subtitle,
  showSkip = true,
  stepIndex = null,
  totalDots = null,
  nextLabel = "Suivant",
  onNext,
  showIllustration = true,
  showNextIcon = true,
  illustrationSource,
  animationSource,
}: Props) {
  const router = useRouter();

  // Fonction pour rendre l'illustration de manière conditionnelle
  const renderIllustration = () => {
    // Si on ne doit pas montrer d'illustration, on ne rend rien.
    if (!showIllustration) {
      return null;
    }

    // Priorité à l'animation Lottie si elle est fournie
    if (animationSource) {
      return <AnimatedIllustration source={animationSource} size={250} />;
    }

    // Sinon, on affiche l'image statique si elle est fournie
    if (illustrationSource) {
      return (
        <Image
          source={illustrationSource}
          style={styles.illustrationImage}
          resizeMode="contain"
        />
      );
    }

    // En dernier recours, on affiche l'illustration par défaut (Halo)
    return <HaloIllustration size={220} />;
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.mainContent}>
        {/* Rangée du haut avec le bouton "Ignorer" */}
        <View style={styles.topRow}>
          {showSkip && (
            <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
              <Text style={styles.skip}>Ignorer</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Section de l'illustration (dynamique) */}
        <View style={styles.illustrationContainer}>
          {renderIllustration()}
        </View>

        {/* Contenu textuel (Titre, sous-titre, points) */}
        <View style={styles.content}>
          {title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {stepIndex !== null && totalDots !== null && (
            <View style={styles.dotsContainer}>
              <ProgressDots total={totalDots} index={stepIndex} />
            </View>
          )}
        </View>
      </View>

      {/* Pied de page avec les boutons de navigation */}
      <View style={styles.footerRow}>
        <TouchableOpacity style={styles.largeButton} onPress={onNext}>
          <Text style={styles.largeButtonText}>{nextLabel}</Text>
        </TouchableOpacity>

        {showNextIcon && (
          <TouchableOpacity style={styles.squareButton} onPress={onNext}>
            <Image
              source={require("../../assets/images/suivant.png")}
              style={styles.squareButtonIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 50,
    alignItems: "center",
    marginTop: 20,
  },
  skip: {
    color: "#6B7280",
    fontSize: 16,
    fontFamily: "Inter",
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    minHeight: 250, // Assure un espace minimum pour l'illustration
  },
  illustrationImage: {
    width: "100%",
    height: 250,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 8,
    marginTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#002E52",
    textAlign: "center",
    fontFamily: "Inter",
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: "#000000",
    marginTop: 12,
    textAlign: "center",
    fontFamily: "Inter",
    lineHeight: 24,
  },
  dotsContainer: {
    marginTop: 24,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 40, // Un peu plus d'espace en bas
    paddingTop: 10,
  },
  largeButton: {
    width: 253,
    height: 63,
    borderRadius: 40,
    backgroundColor: "#79EFE8",
    justifyContent: "center",
    alignItems: "center",
  },
  largeButtonText: {
    color: "#000000",
    fontSize: 20,
    fontFamily: "Inter",
    fontWeight: "800",
  },
  squareButton: {
    width: 63,
    height: 63,
    borderRadius: 40,
    backgroundColor: "#79EFE8",
    justifyContent: "center",
    alignItems: "center",
  },
  squareButtonIcon: {
    width: 15,
    height: 15,
  },
});
