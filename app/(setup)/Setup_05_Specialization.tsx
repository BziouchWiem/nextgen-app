// app/(setup)/Setup_05_Specialization.tsx
import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSetup } from '../../context/SetupContext';
import SetupContainer from '../../components/setup/SetupContainer';
import SelectionButton from '../../components/setup/SelectionButton';

// Spécialisations par niveau d'études
const SPECIALIZATIONS_BY_LEVEL = {
    'Primaire': [
      'سنة 1 و 2 ابتدائي',
      'سنة 3 و 4 ابتدائي',
      'سنة 5 و 6 ابتدائي',
    ],
    'Collège': [
      '7ème année',
      '8ème année',
      '9ème année',
    ],
    'Lycée': [
      '1ère année secondaire',
      '2ème Sciences',
      '2ème Informatique',
      '2ème Économie',
      '2ème Lettres',
      '3ème Math',
      '3ème Sciences',
      '3ème Informatique',
      '3ème Techniques',
      '3ème Économie',
      // Ici, chaque bac est spécialisé
      'Bac Mathématiques',
      'Bac Sciences expérimentales',
      'Bac Informatique',
      'Bac Techniques',
      'Bac Économie et gestion',
      'Bac Lettres',
      'Bac Sport',
    ],
    'Faculté': [], // Pas de liste prédéfinie, champ libre
    'Autre': [],   // Pas de liste prédéfinie, champ libre
  };

export default function Setup_05_Specialization() {
  const router = useRouter();
  const { setupData, updateSetupData } = useSetup();
  const [selectedSpecialization, setSelectedSpecialization] = useState(setupData.specialization || '');
  const [customSpecialization, setCustomSpecialization] = useState('');

  // Récupérer le niveau sélectionné à l'étape précédente
  const selectedLevel = setupData.level;
  
  // Déterminer les options disponibles selon le niveau
  const availableSpecializations = useMemo(() => {
    return SPECIALIZATIONS_BY_LEVEL[selectedLevel as keyof typeof SPECIALIZATIONS_BY_LEVEL] || [];
  }, [selectedLevel]);

  // Déterminer si on doit afficher un champ libre
  const showCustomInput = selectedLevel === 'Faculté' || selectedLevel === 'Autre';

  // Déterminer le titre et sous-titre dynamiquement
  const getTitle = () => {
    switch (selectedLevel) {
      case 'Primaire':
        return 'Précisez votre niveau au primaire';
      case 'Collège':
        return 'Précisez votre niveau au collège';
      case 'Lycée':
        return 'Précisez votre niveau au lycée';
      case 'Faculté':
        return 'Quelle est votre faculté ?';
      case 'Autre':
        return 'Précisez votre niveau d\'études';
      default:
        return 'Précisez votre niveau';
    }
  };

  const getSubtitle = () => {
    switch (selectedLevel) {
      case 'Faculté':
        return 'Entrez le nom de votre faculté ou université.';
      case 'Autre':
        return 'Décrivez votre niveau d\'études actuel.';
      default:
        return 'Choisissez votre classe pour obtenir des exercices adaptés.';
    }
  };

  const handleNext = () => {
    const finalSpecialization = showCustomInput ? customSpecialization : selectedSpecialization;
    updateSetupData({ specialization: finalSpecialization });
    router.push('/(setup)/Setup_06_Source');
  };

  const isNextDisabled = showCustomInput 
    ? customSpecialization.trim().length < 2
    : !selectedSpecialization;

  return (
    <SetupContainer
      step={5}
      title={getTitle()}
      subtitle={getSubtitle()}
      onNext={handleNext}
      isNextDisabled={isNextDisabled}
    >
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Afficher les boutons de sélection si des options sont disponibles */}
        {availableSpecializations.map((specialization) => (
          <SelectionButton
            key={specialization}
            title={specialization}
            isSelected={selectedSpecialization === specialization}
            onPress={() => setSelectedSpecialization(specialization)}
          />
        ))}

        {/* Afficher un champ de saisie libre pour Faculté et Autre */}
        {showCustomInput && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder={selectedLevel === 'Faculté' ? 'Ex: Faculté des Sciences de Tunis' : 'Ex: Formation professionnelle'}
              placeholderTextColor="#9CA3AF"
              value={customSpecialization}
              onChangeText={setCustomSpecialization}
              autoFocus={true}
              multiline={false}
            />
          </View>
        )}
      </ScrollView>
    </SetupContainer>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 10,
  },
  inputContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    fontWeight: '500',
    color: '#111827',
  },
});
