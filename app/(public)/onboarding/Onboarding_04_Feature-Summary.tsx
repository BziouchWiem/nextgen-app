import React from "react";
import { useRouter } from "expo-router";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";

export default function Onboarding_04_Feature_Summary() {
  const router = useRouter();
  return (
    <OnboardingContainer
      title="Résumé de documents"
      subtitle="Analyse et synthèse rapide"
      showSkip={true}
      showIllustration={true}
      stepIndex={2} // 3ème point
      totalDots={4}
      // Ajout de l'animation pour le "résumé"
      animationSource={require("../../../assets/animations/Glassmorphism Document Lottie Animation.json")}
      nextLabel="Suivant"
      onNext={() => router.push("/(public)/onboarding/Onboarding_05_Feature-Quiz")}
    />
  );
}
