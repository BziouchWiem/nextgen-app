// app/(setup)/Setup_03_Goal.tsx
import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useSetup } from '../../context/SetupContext';
import SetupContainer from '../../components/setup/SetupContainer';
import SelectionButton from '../../components/setup/SelectionButton';

// Options d'objectifs disponibles
const GOALS = [
  'Améliorer mes notes',
  'Me préparer aux examens',
  'Apprendre de nouvelles matières',
  'Compléter mes études',
  'Autre',
];

export default function Setup_03_Goal() {
  const router = useRouter();
  const { setupData, updateSetupData } = useSetup();
  const [selectedGoal, setSelectedGoal] = useState(setupData.goal || '');

  const handleNext = () => {
    updateSetupData({ goal: selectedGoal });
    router.push('/(setup)/Setup_04_Level');
  };

  return (
    <SetupContainer
      step={3}
      title="Qu'est-ce qui vous amène ici ?"
      subtitle="Choisissez la raison qui décrit le mieux pourquoi vous êtes ici."
      onNext={handleNext}
      isNextDisabled={!selectedGoal}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {GOALS.map((goal) => (
          <SelectionButton
            key={goal}
            title={goal}
            isSelected={selectedGoal === goal}
            onPress={() => setSelectedGoal(goal)}
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