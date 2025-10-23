// app/(chat)/history.tsx
import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';

const HISTORY_DATA = [
  {
    title: "Aujourd'hui",
    data: [
      { id: '1', title: 'Explication de la photosynthèse', time: '19:01', duration: '2 min' },
      { id: '2', title: 'Crée-moi un quiz de 5 questions...', time: '18:45', duration: '5 min' },
      { id: '3', title: 'Explication du concept de gravité', time: '17:30', duration: '3 min' },
    ],
  },
  {
    title: 'La semaine dernière',
    data: [
      { id: '4', title: 'Correction de ma phrase en anglais', time: 'Lun 14:20', duration: '1 min' },
      { id: '5', title: 'La Mondialisation - explication', time: 'Mar 10:15', duration: '4 min' },
      { id: '6', title: 'Idées de carrière après un bac scientifique', time: 'Jeu 16:40', duration: '6 min' },
    ],
  },
  {
    title: 'Le mois dernier',
    data: [
      { id: '7', title: 'Résumé de la révolution française', time: '1 Mars', duration: '8 min' },
      { id: '8', title: 'Exercices de mathématiques avancées', time: '28 Fév', duration: '7 min' },
    ],
  },
];

export default function HistoryScreen() {
  const router = useRouter();

  const openChat = (title: string) => {
    router.push({ 
      pathname: '/(chat)/nexie', 
      params: { initialPrompt: title } 
    });
  };

  const startNewChat = () => {
    router.push('/(chat)/nexie');
  };

  return (
    <SafeAreaView style={styles.container}>
  {/* Header commun avec titre centré dans la barre */}
  <Header title="Historique" titleInNav />

      {/* Historique des conversations */}
      <SectionList
        sections={HISTORY_DATA}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.historyItem}
            onPress={() => openChat(item.title)}
          >
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <View style={styles.itemMeta}>
                <Text style={styles.itemTime}>{item.time}</Text>
                <Text style={styles.itemDuration}>⏱️ {item.duration}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />

      {/* Bouton Nouvelle discussion */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.newChatButton} onPress={startNewChat}>
          <Text style={styles.newChatText}>+ Nouvelle discussion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#142826',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 8,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#142826',
    marginBottom: 6,
  },
  itemMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemDuration: {
    fontSize: 12,
    color: '#6B7280',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  newChatButton: {
    backgroundColor: '#79EFE8',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  newChatText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#002E52',
  },
});