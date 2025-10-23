// app/(chat)/new-chat.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import ChevronLeftSvg from '../../assets/images/chevron-left.svg';
import MingcuteHistorySvg from '../../assets/images/mingcute_history-line.svg';
import ChatInput from '../../components/ChatInput';

const QUICK_ACTIONS = [
  "Explique-moi un concept",
  "Crée un quiz rapide",
  "Donne-moi une idée de plan",
  "Corrige cette phrase",
];

const POPULAR_TOPICS = [
  "Technique de Feynman",
  "Préparation aux examens",
  "Révision de cours",
  "Méthodologie d'étude",
];

export default function NewChatScreen() {
  const router = useRouter();
  const [input, setInput] = useState('');

  const handleQuickAction = (label: string) => {
    // Naviguer directement vers le chat avec le prompt
    router.push({ 
      pathname: '/(chat)/nexie', 
      params: { initialPrompt: label } 
    });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    router.push({ 
      pathname: '/(chat)/nexie', 
      params: { initialPrompt: input.trim() } 
    });
    setInput('');
  };

  const openHistory = () => {
    router.push('/(chat)/history');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Cercles décoratifs */}
      <View style={styles.decorTopLeft} />
      <View style={styles.decorTopRight} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconCircle}>
          <ChevronLeftSvg width={24} height={24} fill="#002E52" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.greeting}>Salut, Wiem !</Text>
          <Text style={styles.subtitle}>Comment puis-je t'aider aujourd'hui ?</Text>
          <Text style={styles.description}>Votre assistant d'étude est prêt.</Text>
        </View>

        <TouchableOpacity style={styles.iconCircle} onPress={openHistory}>
          <MingcuteHistorySvg width={24} height={24} fill="#002E52" />
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Actions rapides */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Démarrer rapidement</Text>
            <View style={styles.quickActionsGrid}>
              {QUICK_ACTIONS.map((action, index) => (
                <TouchableOpacity
                  key={action}
                  style={[
                    styles.quickActionCard,
                    index % 2 === 0 ? styles.cardLeft : styles.cardRight
                  ]}
                  onPress={() => handleQuickAction(action)}
                >
                  <Text style={styles.quickActionText}>{action}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Sujets populaires */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sujets populaires</Text>
            <View style={styles.topicsGrid}>
              {POPULAR_TOPICS.map((topic, index) => (
                <TouchableOpacity
                  key={topic}
                  style={[
                    styles.topicCard,
                    index % 2 === 0 ? styles.cardLeft : styles.cardRight
                  ]}
                  onPress={() => handleQuickAction(topic)}
                >
                  <Text style={styles.topicText}>{topic}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Espace pour le padding bottom */}
          <View style={styles.spacer} />
        </ScrollView>

        {/* Zone de saisie */}
        <View style={styles.inputContainer}>
          <ChatInput 
            value={input}
            onChangeText={setInput}
            onSend={handleSend}
            placeholder="Envoyer un message à Nexie..."
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  decorTopLeft: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#002E52',
    opacity: 0.08,
    top: -40,
    left: -40,
  },
  decorTopRight: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: '#2563EB',
    opacity: 0.06,
    top: 0,
    right: -30,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  greeting: {
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
  content: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#142826',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 80,
  },
  topicCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 60,
  },
  cardLeft: {
    marginRight: 4,
  },
  cardRight: {
    marginLeft: 4,
  },
  quickActionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#142826',
    textAlign: 'center',
    lineHeight: 18,
  },
  topicText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#142826',
    textAlign: 'center',
    lineHeight: 16,
  },
  spacer: {
    height: 100,
  },
  inputContainer: {
    backgroundColor: '#F8FAFC',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
});