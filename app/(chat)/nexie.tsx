// app/(chat)/nexie.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import ChatInput from '../../components/ChatInput';
import GlowBackground from '../../components/GlowBackground';

type Message = { id: string; text: string; sender: 'user' | 'bot' };

const PALETTE = {
  darkBlue: '#002E52',
  blue: '#2563EB',
  teal: '#79EFE8',
  lightGray: '#F8FAFC',
  white: '#FFFFFF',
  darkest: '#142826',
  gray: '#6B7280',
};

export default function NexieScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const initialPrompt = params.initialPrompt as string;
  const [showIntro, setShowIntro] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatRef = useRef<FlatList<Message> | null>(null);

    useEffect(() => {
    if (initialPrompt && showIntro) {
      setInput(initialPrompt);
      // Optionnel: envoyer automatiquement
      // sendMessage();
    }
  }, [initialPrompt]);

  useEffect(() => {
    setTimeout(() => {
      try {
        flatRef.current?.scrollToOffset?.({ offset: 0, animated: true });
      } catch (e) {}
    }, 60);
  }, [messages]);

const sendMessage = () => {
  if (!input.trim()) return;
  const newMsg: Message = { id: String(Date.now()), text: input.trim(), sender: 'user' };
  
  // Quand on envoie le premier message, on cache l'intro
  if (showIntro) {
    setShowIntro(false);  // ← Ici l'intro disparaît !
    setMessages([newMsg]);
  } else {
    setMessages(prev => [newMsg, ...prev]);
  }
  setInput('');
};

const handleQuickAction = (label: string) => {
  setInput(label);
  // Forcer le focus sur l'input et ajuster la hauteur
  setTimeout(() => {
    // Tu peux ajouter une logique pour focus l'input si nécessaire
    // inputRef.current?.focus();
  }, 100);
};

  const openHistory = () => {
    router.push('/history');
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.messageRowUser : styles.messageRowBot]}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleBot]}>
          <Text style={[styles.messageText, isUser ? styles.messageTextUser : styles.messageTextBot]}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
  {/* Glow / halos animés */}
  <GlowBackground />

      {/* Header avec texte centré (masqué après premier message) */}
      <Header 
        title={showIntro ? "Salut, Wiem !" : undefined}
        subtitle={showIntro ? "Comment puis-je t'aider aujourd'hui ?" : undefined}
        description={showIntro ? "Votre assistant d'étude est prêt." : undefined}
        onHistory={openHistory}
      />

      {/* Contenu principal */}
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {showIntro ? (
          <ScrollView 
            style={styles.introContainer} 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.introContent}
          >
            {/* Actions rapides */}
            <View style={styles.quickActionsContainer}>
              {[
                "Explique-moi un concept",
                "Crée un quiz rapide", 
                "Donne-moi une idée de plan",
                "Corrige cette phrase",
              ].map((label) => (
                <TouchableOpacity
                  key={label}
                  style={styles.quickActionItem}
                  onPress={() => handleQuickAction(label)}
                >
                  <Text style={styles.quickActionText}>{label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Ligne de séparation */}
            <View style={styles.divider} />

            {/* Sujets populaires */}
            <Text style={styles.sectionTitle}>Sujets populaires</Text>
            <View style={styles.popularGrid}>
              <TouchableOpacity style={styles.topicCard}>
                <Text style={styles.topicText}>Technique de Feynman</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.topicCard}>
                <Text style={styles.topicText}>Préparation aux examens</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            ref={flatRef}
            data={messages}
            inverted
            keyExtractor={m => m.id}
            renderItem={renderItem}
            contentContainerStyle={styles.messagesList}
          />
        )}

        {/* Zone de saisie - Toujours visible au-dessus du clavier */}
        <View style={styles.inputContainer}>
          <ChatInput 
            value={input}
            onChangeText={setInput}
            onSend={sendMessage}
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
    backgroundColor: PALETTE.lightGray 
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  introContainer: { 
    flex: 1,
  },
  introContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  quickActionsContainer: {
    marginBottom: 24,
  },
  quickActionItem: {
    paddingVertical: 16,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  quickActionText: {
    fontSize: 16,
    fontWeight: '600',
    color: PALETTE.darkest,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: PALETTE.darkest,
    marginBottom: 16,
  },
  popularGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topicCard: {
    width: '48%',
    backgroundColor: PALETTE.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  topicText: {
    fontSize: 14,
    fontWeight: '600',
    color: PALETTE.darkest,
    textAlign: 'center',
  },
  messagesList: { 
    paddingHorizontal: 20, 
    paddingBottom: 20 
  },
  messageRow: { 
    marginVertical: 8 
  },
  messageRowUser: { 
    alignSelf: 'flex-end', 
    marginLeft: 40 
  },
  messageRowBot: { 
    alignSelf: 'flex-start', 
    marginRight: 40 
  },
  bubble: { 
    maxWidth: '80%', 
    padding: 14, 
    borderRadius: 16 
  },
  bubbleUser: { 
    backgroundColor: PALETTE.teal, 
    borderTopRightRadius: 4 
  },
  bubbleBot: { 
    backgroundColor: PALETTE.white, 
    borderTopLeftRadius: 4, 
    borderWidth: 1, 
    borderColor: '#E6EEF5' 
  },
  messageText: { 
    fontSize: 16 
  },
  messageTextUser: { 
    color: PALETTE.darkest 
  },
  messageTextBot: { 
    color: PALETTE.darkest 
  },
  inputContainer: {
    backgroundColor: PALETTE.lightGray,
  },
});