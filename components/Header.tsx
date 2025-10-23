// app/components/Header.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BackSvg from '../assets/images/back.svg';
import MingcuteHistorySvg from '../assets/images/mingcute_history-line.svg';

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
  /** When true, shows the title centered in the top row between the buttons */
  titleInNav?: boolean;
  onHistory?: () => void;
};

export default function Header({ title, subtitle, description, onHistory, titleInNav }: Props) {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
      {/* Top Row */}
      <View style={styles.navRow}>
        {/* Left button */}
        <View style={styles.navSide}>
          <TouchableOpacity style={styles.iconCircle} onPress={() => router.back()}>
            <BackSvg width={24} height={24}  />
          </TouchableOpacity>
        </View>

        {/* Center title (inline) */}
        {titleInNav && (
          <View style={styles.navCenter}>
            {!!title && <Text style={styles.navTitle}>{title}</Text>}
          </View>
        )}

        {/* Right button (history) or placeholder to keep symmetry */}
        <View style={styles.navSide}>
          {onHistory ? (
            <TouchableOpacity style={styles.iconCircle} onPress={onHistory}>
              <MingcuteHistorySvg width={24} height={24} fill="#002E52" />
            </TouchableOpacity>
          ) : (
            <View style={[styles.iconCircle, { opacity: 0 }]} />
          )}
        </View>
      </View>

      {/* Greeting block under nav when not inline */}
      {!titleInNav && (
        <View style={styles.greetingContainer}>
          {!!title && <Text style={styles.title}>{title}</Text>}
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          {description && <Text style={styles.description}>{description}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  navRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  navSide: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navCenter: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  navTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#142826',
    textAlign: 'center',
  },
  iconCircle: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  greetingContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#142826',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#142826',
    marginBottom: 6,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});