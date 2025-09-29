import React from "react";
import { Stack, Slot } from "expo-router";

export default function PublicLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="onboarding/Onboarding_00_Splash">
      <Slot />
    </Stack>
  );
}
