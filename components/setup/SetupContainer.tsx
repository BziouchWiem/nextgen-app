// components/setup/SetupContainer.tsx
import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

// --- Composant interne pour la barre de progression ---
const ProgressBar = ({ step, total }: { step: number; total: number }) => {
  const progress = (step / total) * 100;
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );
};

// --- Props du conteneur ---
type Props = {
  step: number;
  totalSteps?: number;
  title: string;
  subtitle: string;
  children: ReactNode;
  nextLabel?: string;
  onNext: () => void;
  isNextDisabled?: boolean;
};

// --- Composant principal ---
export default function SetupContainer({
  step,
  totalSteps = 6,
  title,
  subtitle,
  children,
  nextLabel = 'Continuer',
  onNext,
  isNextDisabled = false,
}: Props) {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      {/* --- En-tête --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={22} color="#111827" />
        </TouchableOpacity>
        <ProgressBar step={step} total={totalSteps} />
        <Text style={styles.progressText}>{step}/{totalSteps}</Text>
      </View>

      {/* --- Contenu principal --- */}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.childrenContainer}>{children}</View>
      </View>

      {/* --- Pied de page --- */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextButton, isNextDisabled && styles.nextButtonDisabled]}
          onPress={onNext}
          disabled={isNextDisabled}
        >
          <Text style={styles.nextButtonText}>{nextLabel}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // CHANGÉ: Ajout de padding vertical pour "remonter" les éléments
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 35, // CHANGÉ: Un peu d'espace en haut
    gap: 10, // CHANGÉ: Augmentation de l'espace
  },
  backButton: {
    // CHANGÉ: Style pour créer le cercle
    width: 60,
    height: 60,
    borderRadius: 30, // La moitié de la largeur/hauteur
    backgroundColor: '#79EFE8', // Fond gris clair
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
    height: 9,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#002E52', // CHANGÉ: Couleur Bleu Nuit
    borderRadius: 4,
  },
  progressText: {
    fontSize: 15,
    color: '#6B7280',
    fontWeight: '600',
    minWidth: 30,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30, // CHANGÉ: Plus d'espace sous l'en-tête
  },
  title: {
    // CHANGÉ: Texte plus grand et couleur de la palette
    fontSize: 32,
    fontWeight: 'bold',
    color: '#002E52', // Bleu Nuit
    textAlign: 'center',
  },
  subtitle: {
    // CHANGÉ: Texte légèrement plus grand et centré
    fontSize: 18,
    color: '#4B5563', // Gris Foncé
    marginTop: 12,
    textAlign: 'center',
    lineHeight: 26,
  },
  childrenContainer: {
    flex: 1,
    paddingTop: 30, // CHANGÉ: Espace avant le contenu spécifique
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30, // CHANGÉ: Espace sous le bouton
  },
  nextButton: {
    backgroundColor: '#79EFE8', // CHANGÉ: Couleur Bleu Vif
    paddingVertical: 18,
    borderRadius: 99,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB', // Gris pour le bouton désactivé
  },
  nextButtonText: {
    color: '#002E52',
    fontSize: 18, // CHANGÉ: Texte du bouton plus grand
    fontWeight: 'bold',
  },
});
