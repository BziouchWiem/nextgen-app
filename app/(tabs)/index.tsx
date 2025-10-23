// app/(tabs)/index.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { useUserProfile } from '../../hooks/useUserProfile';
import StatCard from '../../components/dashboard/StatCard';
import ToolCard from '../../components/dashboard/ToolCard';
import PomodoroTimer from '../../components/dashboard/PomodoroTimer';
import RecentActivities from '../../components/dashboard/RecentActivities';

// Import SVG icons
import SearchSvg from '../../assets/images/search.svg';
import NotificationFillSvg from '../../assets/images/notification-fill.svg';
import ChevronLeftSvg from '../../assets/images/chevron-left.svg';
import ChevronRightSvg from '../../assets/images/chevron-right.svg';
import BookSvg from '../../assets/images/book.svg';
import EnergySvg from '../../assets/images/energy.svg';
import ChatFillSvg from '../../assets/images/chat-fill.svg';
import FileFillSvg from '../../assets/images/file-fill.svg';

// --- Header Component (mis à jour avec SVG icons) ---
const DashboardHeader = ({ name }: { name?: string }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Bienvenue {name || '!'}</Text>
    <View style={styles.headerIcons}>
      <TouchableOpacity>
        <SearchSvg width={30} height={30} fill="#002E52" />
      </TouchableOpacity>
      <TouchableOpacity style={{ marginLeft: 16 }}>
        <NotificationFillSvg width={30} height={30} fill="#002E52" />
      </TouchableOpacity>
    </View>
  </View>
);

// --- Composant Motivation (mis à jour avec les dots) ---
const MotivationCard = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const quotes = [
    "Tu fais un pas important vers ton futur",
    "Chaque effort te rapproche du succès",
    "La persévérance est la clé de la réussite",
  ];

  return (
    <View>
      <View style={styles.motivationCard}>
        <TouchableOpacity>
          <ChevronLeftSvg width={12} height={12} fill="#374151" />
        </TouchableOpacity>
        <Text style={styles.motivationText}>"{quotes[activeIndex]}"</Text>
        <TouchableOpacity>
          <ChevronRightSvg width={12} height={12} fill="#374151" />
        </TouchableOpacity>
      </View>
      <View style={styles.dotsContainer}>
        {quotes.map((_, index) => (
          <View key={index} style={[styles.dot, index === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

// --- Composants inchangés ---
const QuickActionButton = ({ label }: { label: string }) => (
  <TouchableOpacity style={styles.quickButton}><Text style={styles.quickButtonText}>{label}</Text></TouchableOpacity>
);

export default function Home() {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" color="#002E52" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
        <DashboardHeader name={profile?.name} />
        
        {/* --- Section Stats (mise à jour pour utiliser le nouveau StatCard) --- */}
        <View style={styles.statsSection}>
          <StatCard
            iconSource={BookSvg}
            title="Objectif hebdo"
            value="80%"
            subValue="2.5h/3.0h"
            progressType="circle"
            progress={0.8}
            color="#FFFFFF"
          />
          <View style={{ width: 16 }} />
          <StatCard
            iconSource={EnergySvg}
            title="Énergie"
            value="100%"
            progressType="bar"
            progress={1.0}
            color="#FFFFFF"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickActionsContainer}>
          <QuickActionButton label="Continuer" />
          <QuickActionButton label="Résumer un document" />
          <QuickActionButton label="Parler à Nexie" />
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Motivation</Text>
          <MotivationCard />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Explorez tous nos outils ✨</Text>
          <Text style={styles.sectionSubtitle}>Découvrez 10+ assistants pour vous aider à réussir.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.toolsScrollView}>
            <ToolCard
              iconSource={ChatFillSvg}
              title="Discuter avec Nexie"
              description="Pose ta question, Nexie s'adapte à ton niveau."
            />
            <ToolCard
              iconSource={FileFillSvg}
              title="Résumer un document"
              description="PDF, DOCX... Résumé éditable + export PDF."
            />
          </ScrollView>
        </View>

        <PomodoroTimer />

        <View style={styles.section}>
          <RecentActivities />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles (mis à jour) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E0F2FE' }, // Light blue background like in the design
  centered: { justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 10},
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#002E52' },
  headerIcons: { flexDirection: 'row' },
  headerIcon: { width: 30, height: 30 },
  statsSection: { marginTop: 24, paddingHorizontal: 20, flexDirection: 'row' },
  section: { marginTop: 32, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 8 },
  sectionSubtitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  toolsScrollView: { marginTop: 4 },
  placeholderBox: { backgroundColor: '#E5E7EB', height: 100, borderRadius: 16, justifyContent: 'center', alignItems: 'center' },
  quickActionsContainer: { paddingHorizontal: 20, marginTop: 24, gap: 12 },
  quickButton: { backgroundColor: '#FFFFFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  quickButtonText: { color: '#1F2937', fontWeight: '600', fontSize: 14 },
  motivationCard: { backgroundColor: '#F8FAFC', borderRadius: 16, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  motivationText: { flex: 1, textAlign: 'center', fontSize: 16, color: '#374151', fontWeight: '500', paddingHorizontal: 10 },
  chevronIcon: { width: 12, height: 12 },
  dotsContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D1D5DB', marginHorizontal: 4 },
  dotActive: { backgroundColor: '#002E52' },
});
