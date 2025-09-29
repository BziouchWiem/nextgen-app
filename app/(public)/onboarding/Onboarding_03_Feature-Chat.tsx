import React from "react";
import { useRouter } from "expo-router";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";

export default function Onboarding_03_Feature_Chat() {
  const router = useRouter();

  return (
    <OnboardingContainer
      // --- Contenu Textuel ---
      title="Nexie : Chat IA"
      subtitle="Aide instantanée et personnalisée"
      
      // --- Configuration de l'UI ---
      showSkip={true}
      showIllustration={true}
      
      // --- Indicateur de Progression ---
      stepIndex={1} // C'est le 2ème écran sur 3 (index 0, 1, 2)
      totalDots={4}
      
      // --- Animation ---
      // On passe le chemin vers le fichier JSON de l'animation Lottie.
      // Assurez-vous que le chemin est correct et que le fichier existe.
      animationSource={require("../../../assets/animations/Chat Animation.json")}
      
      // --- Navigation ---
      nextLabel="Suivant"
      onNext={() => router.push("/(public)/onboarding/Onboarding_04_Feature-Summary")}
    />
  );
}