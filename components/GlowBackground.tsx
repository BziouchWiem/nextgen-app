// components/GlowBackground.tsx (4 blobs visibles, palette fournie)
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import Svg, { Defs, RadialGradient, Stop, Circle } from 'react-native-svg';

type GlowBackgroundProps = {
  intensity?: number; // 0.8..1.4
};

export default function GlowBackground({ intensity = 1 }: GlowBackgroundProps) {
  // Animations légères (respiration) pour 2 blobs
  const a1 = useRef(new Animated.Value(0)).current;
  const a2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = (v: Animated.Value, delay = 0, dur = 5200) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(v, { toValue: 1, duration: dur, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: dur, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      ).start();
    loop(a1, 0, 5200);
    loop(a2, 800, 6200);
    return () => { a1.stopAnimation(); a2.stopAnimation(); };
  }, [a1, a2]);

  const s1 = a1.interpolate({ inputRange: [0, 1], outputRange: [1, 1.06] });
  const o1 = a1.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0.7] });
  const s2 = a2.interpolate({ inputRange: [0, 1], outputRange: [1, 1.08] });
  const o2 = a2.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0.6] });

  const mul = Math.max(0.6, Math.min(intensity, 1.4));

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {/* 1) Top-Left (CEE0E9) */}
      <Animated.View style={[styles.blob, { top: -80, left: -80, width: 480, height: 480, opacity: o1, transform: [{ scale: s1 }] }]}>        
        <Svg width={520} height={520}>
          <Defs>
            <RadialGradient id="blob_tl" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#CEE0E9" stopOpacity={0.8 * mul} />
              <Stop offset="62%" stopColor="#CEE0E9" stopOpacity={0.38 * mul} />
              <Stop offset="100%" stopColor="#CEE0E9" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={240} cy={240} r={240} fill="url(#blob_tl)" />
        </Svg>
      </Animated.View>

      {/* 2) Top-Right (4EF9ED) */}
      <Animated.View style={[styles.blob, { top: -60, right: -80, width: 380, height: 380, opacity: o2, transform: [{ scale: s2 }] }]}>        
        <Svg width={380} height={380}>
          <Defs>
            <RadialGradient id="blob_tr" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#4EF9ED" stopOpacity={0.75 * mul} />
              <Stop offset="60%" stopColor="#4EF9ED" stopOpacity={0.33 * mul} />
              <Stop offset="100%" stopColor="#4EF9ED" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={190} cy={190} r={190} fill="url(#blob_tr)" />
        </Svg>
      </Animated.View>

      {/* 3) Bottom-Left (7AE2E5) */}
      <View style={[styles.blob, { bottom: -60, left: -60, width: 320, height: 320, opacity: 0.5 * mul }]}>        
        <Svg width={320} height={320}>
          <Defs>
            <RadialGradient id="blob_bl" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#7AE2E5" stopOpacity={0.65 * mul} />
              <Stop offset="68%" stopColor="#7AE2E5" stopOpacity={0.26 * mul} />
              <Stop offset="100%" stopColor="#7AE2E5" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={160} cy={160} r={160} fill="url(#blob_bl)" />
        </Svg>
      </View>

      {/* 4) Bottom-Right (A6CBDD) */}
      <View style={[styles.blob, { bottom: -80, right: -80, width: 520, height: 520, opacity: 0.52 * mul }]}>        
        <Svg width={520} height={520}>
          <Defs>
            <RadialGradient id="blob_br" cx="50%" cy="50%" r="50%">
              <Stop offset="0%" stopColor="#A6CBDD" stopOpacity={0.68 * mul} />
              <Stop offset="58%" stopColor="#A6CBDD" stopOpacity={0.3 * mul} />
              <Stop offset="100%" stopColor="#A6CBDD" stopOpacity={0} />
            </RadialGradient>
          </Defs>
          <Circle cx={260} cy={260} r={260} fill="url(#blob_br)" />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
  },
});