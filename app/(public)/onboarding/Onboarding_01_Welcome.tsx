import React from "react";
import { useRouter } from "expo-router";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";

export default function Onboarding_01_Welcome() {
  const router = useRouter();

  return (
    <OnboardingContainer
      // --- Contenu Textuel ---
      title="Bienvenue sur NextGen"
      subtitle="Votre compagnon d'apprentissage alimenté par l'IA"
      
      // --- Configuration de l'UI ---
      // Pas de bouton "Ignorer" sur le premier écran
      showSkip={false} 
      showIllustration={true}
      // Pas de points de progression sur l'écran de bienvenue
      stepIndex={null} 
      totalDots={null}
      
      // --- Animation ---
      // Ajout de l'animation de bienvenue
      animationSource={require("../../../assets/animations/Live chatbot.json")}
      
      // --- Navigation ---
      nextLabel="Découvrir"
      onNext={() => router.push("/(public)/onboarding/Onboarding_02_Intro")}
    />
  );
}
