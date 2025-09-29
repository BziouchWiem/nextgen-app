import { Redirect } from 'expo-router';
import React from 'react';

export default function PublicIndex() {
  // Redirige l'utilisateur de la racine de (public) vers le premier écran de l'onboarding.
  return <Redirect href="/(public)/onboarding/Onboarding_00_Splash" />;
}
