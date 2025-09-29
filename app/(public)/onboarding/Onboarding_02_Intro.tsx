import React from "react";
import { useRouter } from "expo-router";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";

export default function Onboarding_02_Intro() {
  const router = useRouter();
  return (
    <OnboardingContainer
      title="Découvrez vos outils d'apprentissage"
      subtitle="" // Le sous-titre est optionnel, il ne s'affichera pas
      showSkip={true}
      showIllustration={true}
      stepIndex={0} // 1er point
      totalDots={4}
      // Ajout de l'animation pour les "outils"
      animationSource={require("../../../assets/animations/Phone flow 3D.json")}
      nextLabel="Suivant"
      onNext={() => router.push("/(public)/onboarding/Onboarding_03_Feature-Chat")}
    />
  );
}
