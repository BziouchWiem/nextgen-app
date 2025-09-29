// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

// Un composant simple pour gérer l'affichage de l'icône
const TabBarIcon = ({ source, focused }: { source: any, focused: boolean }) => (
  <Image
    source={source}
    style={[styles.icon, { tintColor: focused ? '#002E52' : '#9CA3AF' }]}
    resizeMode="contain"
  />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#002E52',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          height: 90,
          paddingTop: 10,
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
              // CHEMIN CORRIGÉ : 'images' au lieu de 'icons'
              source={focused ? require('../../assets/images/Accueil-fill.png') : require('../../assets/images/Accueil.png')}
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
              // CHEMIN CORRIGÉ
              source={focused ? require('../../assets/images/Workspace-fill.png') : require('../../assets/images/Workspace.png')}
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
              // CHEMIN CORRIGÉ
              source={focused ? require('../../assets/images/Pomodoro-fill.png') : require('../../assets/images/Pomodoro.png')}
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
              // CHEMIN CORRIGÉ
              source={focused ? require('../../assets/images/Profil-fill.png') : require('../../assets/images/Profil.png')}
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
});
