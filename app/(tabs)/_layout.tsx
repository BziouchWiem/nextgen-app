// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';

// Import SVG icons (both filled and outline versions)
import AccueilFillSvg from '../../assets/images/Accueil-fill.svg';
import AccueilSvg from '../../assets/images/Accueil.svg';
import WorkspaceFillSvg from '../../assets/images/Workspace-fill.svg';
import WorkspaceSvg from '../../assets/images/Workspace.svg';
import PomodoroFillSvg from '../../assets/images/Pomodoro-fill.svg';
import PomodoroSvg from '../../assets/images/Pomodoro.svg';
import ProfilFillSvg from '../../assets/images/Profil-fill.svg';
import ProfilSvg from '../../assets/images/Profil.svg';

// Un composant pour gérer l'affichage des icônes SVG
const TabBarIcon = ({ 
  SvgIconFilled, 
  SvgIconOutline, 
  focused 
}: { 
  SvgIconFilled?: React.ComponentType<any>;
  SvgIconOutline?: React.ComponentType<any>;
  focused: boolean;
}) => (
  <View style={styles.iconContainer}>
    {focused && SvgIconFilled ? (
      <SvgIconFilled 
        width={30} 
        height={30}
      />
    ) : SvgIconOutline ? (
      <SvgIconOutline 
        width={30} 
        height={30} 
        fill="#9CA3AF"
      />
    ) : null}
  </View>
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#002E52',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#E5E7EB', // light gray like wireframe
          borderTopWidth: 0,
          height: 90,
          paddingTop: 10,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 6,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              SvgIconFilled={AccueilFillSvg}
              SvgIconOutline={AccueilSvg}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="assistants"
        options={{
          title: 'Assistants',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              SvgIconFilled={WorkspaceFillSvg}
              SvgIconOutline={WorkspaceSvg}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="pomodoro"
        options={{
          title: 'Pomodoro',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              SvgIconFilled={PomodoroFillSvg}
              SvgIconOutline={PomodoroSvg}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              SvgIconFilled={ProfilFillSvg}
              SvgIconOutline={ProfilSvg}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
