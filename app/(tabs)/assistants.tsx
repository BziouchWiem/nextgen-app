// app/(tabs)/assistants.tsx
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import CategoryTab from '../../components/assistants/CategoryTab';
import AssistantCard from '../../components/assistants/AssistantCard';

// Import SVG icons
import ChatFillSvg from '../../assets/images/chat-fill.svg';
import FileFillSvg from '../../assets/images/file-fill.svg';
import BookSvg from '../../assets/images/book.svg';
import SearchSvg from '../../assets/images/search.svg';
import QuizSvg from '../../assets/images/quiz.svg';
import CheckSvg from '../../assets/images/check.svg';
import LightbulbSvg from '../../assets/images/lightbulb.svg';
import UsersSvg from '../../assets/images/users.svg';

// Define categories
const categories = ['Tous', 'Rédaction', 'Révision', 'Outils'];

// Define assistants data
const assistantsData = {
  Tous: [
    {
      id: '1',
      icon: ChatFillSvg,
      title: 'Discuter avec Nexie',
      description: 'Pose ta question, Nexie s\'adapte à ton niveau.',
      categories: ['Tous']
    },
    {
      id: '2',
      icon: FileFillSvg,
      title: 'Chat de Document',
      description: 'Téléchargement et analyse de fichiers.',
      categories: ['Tous', 'Outils']
    },
    {
      id: '3',
      icon: BookSvg,
      title: 'Résumer un document',
      description: 'PDF, DOCX... Résumé éditable + export PDF.',
      categories: ['Tous', 'Révision']
    },
    {
      id: '4',
      icon: SearchSvg,
      title: 'Générateur d\'exercices',
      description: 'Sujets alignés au programme.',
      categories: ['Tous', 'Rédaction']
    },
    {
      id: '5',
      icon: CheckSvg,
      title: 'Vérificateur d\'exercices',
      description: 'Corrige et explique tes réponses.',
      categories: ['Tous', 'Révision']
    },
    {
      id: '6',
      icon: QuizSvg,
      title: 'Quiz',
      description: 'QCM auto-générés, suivi des scores.',
      categories: ['Tous', 'Révision']
    },
    {
      id: '7',
      icon: BookSvg,
      title: 'Fiches & Cartes mémoire',
      description: 'Retiens l\'essentiel, mode révision.',
      categories: ['Tous', 'Rédaction', 'Révision']
    },
    {
      id: '8',
      icon: LightbulbSvg,
      title: 'Technique de Feynman',
      description: 'Explique pour mieux comprendre.',
      categories: ['Tous', 'Rédaction']
    },
    {
      id: '9',
      icon: UsersSvg,
      title: 'Study with me',
      description: 'Étudiez ensemble, restez motivé en groupe.',
      categories: ['Tous', 'Outils']
    }
  ]
};

export default function Assistants() {
  const [activeCategory, setActiveCategory] = useState('Tous');
  const router = useRouter();

  const getFilteredAssistants = () => {
    if (activeCategory === 'Tous') {
      return assistantsData.Tous;
    }
    return assistantsData.Tous.filter(assistant => 
      assistant.categories.includes(activeCategory)
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Assistants</Text>
      
      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <CategoryTab
            key={category}
            title={category}
            isActive={activeCategory === category}
            onPress={() => setActiveCategory(category)}
          />
        ))}
      </ScrollView>

      {/* Assistants List */}
      <ScrollView 
        style={styles.assistantsList}
        showsVerticalScrollIndicator={false}
      >
        {getFilteredAssistants().map((assistant) => (
          <AssistantCard
            key={assistant.id}
            iconComponent={assistant.icon}
            title={assistant.title}
            description={assistant.description}
            onPress={() => {
              // Navigate to tools
              if (assistant.title === 'Discuter avec Nexie') {
                router.push('/nexie');
                return;
              }
              if (assistant.title === 'Résumer un document') {
                router.push('/(tools)/summary');
                return;
              }
              console.log(`Navigate to ${assistant.title}`);
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F2FE',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#002E52',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  categoriesContainer: {
    maxHeight: 50,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  assistantsList: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
});
