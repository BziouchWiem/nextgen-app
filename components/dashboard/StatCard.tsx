// components/dashboard/StatCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Svg, { Circle } from 'react-native-svg'; // Importez Svg et Circle

type Props = {
  iconSource: any; // Can be PNG require() or SVG component
  title: string;
  value: string;
  progressType: 'circle' | 'bar';
  progress: number; // Une valeur entre 0 et 1 (ex: 0.8 pour 80%)
  color: string;
  subValue?: string; // Pour afficher "2.5h/3.0h"
};

const CIRCLE_RADIUS = 35;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function StatCard({
  iconSource,
  title,
  value,
  progressType,
  progress,
  color,
  subValue,
}: Props) {
  const strokeDashoffset = CIRCLE_CIRCUMFERENCE - CIRCLE_CIRCUMFERENCE * progress;

  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <View style={styles.header}>
        {typeof iconSource === 'function' ? (
          React.createElement(iconSource, { width: 24, height: 24, fill: "#002E52" })
        ) : (
          <Image source={iconSource} style={styles.icon} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>

      {progressType === 'circle' && (
        <View style={styles.progressContainer}>
          <Svg height={CIRCLE_RADIUS * 2 + 10} width={CIRCLE_RADIUS * 2 + 10}>
            {/* Cercle de fond */}
            <Circle
              stroke="#0000001A"
              cx={CIRCLE_RADIUS + 5}
              cy={CIRCLE_RADIUS + 5}
              r={CIRCLE_RADIUS}
              strokeWidth={8}
            />
            {/* Cercle de progression */}
            <Circle
              stroke="#002E52"
              cx={CIRCLE_RADIUS + 5}
              cy={CIRCLE_RADIUS + 5}
              r={CIRCLE_RADIUS}
              strokeWidth={8}
              strokeDasharray={CIRCLE_CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform={`rotate(-90, ${CIRCLE_RADIUS + 5}, ${CIRCLE_RADIUS + 5})`}
            />
          </Svg>
          <Text style={styles.progressText}>{value}</Text>
        </View>
      )}

      {progressType === 'bar' && (
        <View style={styles.barContainer}>
          <Text style={styles.barValue}>{value}</Text>
          <View style={styles.barBackground}>
            <View style={[styles.barForeground, { width: `${progress * 100}%` }]} />
          </View>
        </View>
      )}

      {subValue && <Text style={styles.subValue}>{subValue}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { 
    flex: 1, 
    padding: 16, 
    borderRadius: 20, 
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 24, height: 24 },
  title: { marginLeft: 8, fontSize: 16, fontWeight: '600', color: '#002E52' },
  progressContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  progressText: { position: 'absolute', fontSize: 18, fontWeight: 'bold', color: '#002E52' },
  barContainer: { marginTop: 20, alignItems: 'center' },
  barValue: { fontSize: 22, fontWeight: 'bold', color: '#002E52', marginBottom: 12 },
  barBackground: { width: '100%', height: 8, backgroundColor: '#0000001A', borderRadius: 4 },
  barForeground: { height: '100%', backgroundColor: '#002E52', borderRadius: 4 },
  subValue: { textAlign: 'center', color: '#4B5563', fontWeight: '500', marginTop: 8 },
});
