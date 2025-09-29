// app/(setup)/Setup_04_Level.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSetup } from '../../context/SetupContext';
import SetupContainer from '../../components/setup/SetupContainer';
import SelectionButton from '../../components/setup/SelectionButton';

// Options de niveaux d'études disponibles
const LEVELS = [
  'Primaire',
  'Collège',
  'Lycée',
  'Faculté',
  'Autre',
];

export default function Setup_04_Level() {
  const router = useRouter();
  const { setupData, updateSetupData } = useSetup();
  const [selectedLevel, setSelectedLevel] = useState(setupData.level || '');

  const handleNext = () => {
    updateSetupData({ level: selectedLevel });
    router.push('/(setup)/Setup_05_Specialization');
  };

  return (
    <SetupContainer
      step={4}
      title="Et maintenant, vous êtes en..."
      subtitle="Choisissez l'option qui décrit votre niveau d'études actuel."
      onNext={handleNext}
      isNextDisabled={!selectedLevel}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {LEVELS.map((level) => (
          <SelectionButton
            key={level}
            title={level}
            isSelected={selectedLevel === level}
            onPress={() => setSelectedLevel(level)}
          />
        ))}
      </ScrollView>
    </SetupContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 10,
  },
});