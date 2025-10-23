// components/dashboard/PomodoroTimer.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Import SVG icons
import PlaySvg from '../../assets/images/play.svg';
import StopSvg from '../../assets/images/stop.svg';

type Props = {
  onStart?: () => void;
  onStop?: () => void;
};

export default function PomodoroTimer({ onStart, onStop }: Props) {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState('25:00'); // Default Pomodoro time

  const handlePlayPause = () => {
    if (isRunning) {
      setIsRunning(false);
      onStop?.();
    } else {
      setIsRunning(true);
      onStart?.();
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.timerButton} onPress={handlePlayPause}>
        {isRunning ? (
          <StopSvg width={24} height={24} fill="#0F172A" />
        ) : (
          <PlaySvg width={24} height={24} fill="#0F172A" />
        )}
        <Text style={styles.timerText}>{time}</Text>
        <View style={styles.stopIcon}>
          <View style={styles.stopSquare} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerButton: {
    backgroundColor: '#7DD3FC',
    borderRadius: 35,
    paddingHorizontal: 40,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 280,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#0F172A',
  },
  playIcon: {
    width: 24,
    height: 24,
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
    flex: 1,
    textAlign: 'center',
  },
  stopIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stopSquare: {
    width: 12,
    height: 12,
    backgroundColor: '#0F172A',
    borderRadius: 2,
  },
});