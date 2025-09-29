// app/(setup)/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import { SetupProvider } from '../../context/SetupContext';

export default function SetupLayout() {
  return (
    // Le Provider enveloppe tous les écrans de ce dossier
    <SetupProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SetupProvider>
  );
}
