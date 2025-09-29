// app/(public)/onboarding/index.tsx
import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    // quand on ouvre /onboarding on va directement sur le splash
    router.replace("/(public)/onboarding/Onboarding_00_Splash");
  }, []);
  return null;
}
