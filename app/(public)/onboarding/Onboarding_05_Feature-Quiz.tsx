import React from "react";
import { useRouter } from "expo-router";
import OnboardingContainer from "../../../components/onboarding/OnboardingContainer";

export default function Onboarding_05_Feature_Quiz() {
  const router = useRouter();
  return (
    <OnboardingContainer
      title="Testez vos connaissances"
      subtitle="Créez des quiz, fiches et cartes mémoire."
      showSkip={true}
      showIllustration={true}
      stepIndex={3} // Le dernier point (index 2)
      totalDots={4}
      // Ajout de l'animation pour le "quiz"
      animationSource={require("../../../assets/animations/Purple Questions.json")}
      nextLabel="Commencer"
      // Utiliser replace pour que l'utilisateur ne puisse pas revenir à l'onboarding
      onNext={() => router.replace('/(setup)/Setup_01_Name')}
    />
  );
}
