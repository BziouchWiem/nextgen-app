// app/components/onboarding/AnimatedIllustration.tsx
import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

type Props = {
  source: any; // La source du fichier JSON de l'animation
  size?: number;
};

export default function AnimatedIllustration({ source, size = 250 }: Props) {
  const animationRef = useRef<LottieView>(null);

  // Fait en sorte que l'animation se joue dès que le composant apparaît
  useEffect(() => {
    animationRef.current?.play();
  }, []);

  return (
    <LottieView
      ref={animationRef}
      source={source}
      style={[styles.lottie, { width: size, height: size }]}
      loop={false} // On ne la joue qu'une fois pour un effet plus subtil
      autoPlay={true} // Démarre automatiquement
    />
  );
}

const styles = StyleSheet.create({
  lottie: {
    alignSelf: 'center',
    marginBottom: 20,
  },
});
