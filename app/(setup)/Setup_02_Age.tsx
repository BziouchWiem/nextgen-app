// app/(setup)/Setup_02_Age.tsx
import React, { useState, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useRouter } from 'expo-router';
import { useSetup } from '../../context/SetupContext';
import SetupContainer from '../../components/setup/SetupContainer';

// --- Configuration ---
const AGES = Array.from({ length: 30 }, (_, i) => i + 15); // Âges de 15 à 44
const ITEM_HEIGHT = 60; // Hauteur de chaque "slot" pour les numéros
const VISIBLE_ITEMS = 5; // Nombre d'éléments visibles à l'écran (doit être impair)

// --- Composant pour chaque numéro de la liste ---
const AgeItem = ({ item, selectedAge }: { item: number; selectedAge: number }) => {
  const distance = Math.abs(item - selectedAge);
  let style;

  switch (distance) {
    case 0: // L'élément sélectionné
      style = styles.itemTextSelected;
      break;
    case 1: // Les voisins directs
      style = styles.itemTextNeighbor;
      break;
    default: // Tous les autres
      style = styles.itemTextDefault;
      break;
  }

  return (
    <View style={styles.itemContainer}>
      <Text style={style}>{item}</Text>
    </View>
  );
};

// --- Composant principal de l'écran ---
export default function Setup_02_Age() {
  const router = useRouter();
  const { setupData, updateSetupData } = useSetup();
  const [selectedAge, setSelectedAge] = useState(setupData.age || 22);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    updateSetupData({ age: selectedAge });
    router.push('/(setup)/Setup_03_Goal');
  };

  // Met à jour l'âge sélectionné quand le défilement s'arrête
  const onMomentumScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const index = Math.round(yOffset / ITEM_HEIGHT);
    const newAge = AGES[index];
    if (newAge) {
      setSelectedAge(newAge);
    }
  }, []);

  // Ajout d'espaces vides au début et à la fin pour permettre le centrage
  const paddedAges = [
    ...Array(Math.floor(VISIBLE_ITEMS / 2)).fill(null),
    ...AGES,
    ...Array(Math.floor(VISIBLE_ITEMS / 2)).fill(null),
  ];

  return (
    <SetupContainer
      step={2}
      title="Quel âge avez-vous ?"
      subtitle="Cela nous aide à adapter votre programme d'étude."
      onNext={handleNext}
      isNextDisabled={!selectedAge}
    >
      <View style={styles.pickerContainer}>
        <FlatList
          ref={flatListRef}
          data={paddedAges}
          renderItem={({ item }) => item ? <AgeItem item={item} selectedAge={selectedAge} /> : <View style={styles.itemContainer} />}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate="fast"
          onMomentumScrollEnd={onMomentumScrollEnd}
          initialScrollIndex={AGES.indexOf(selectedAge)}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          style={styles.flatlist}
        />
        {/* Les lignes de sélection fixes, positionnées par-dessus la liste */}
        <View style={styles.selectionLines} pointerEvents="none">
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>
    </SetupContainer>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  pickerContainer: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    justifyContent: 'center',
    marginTop: 20,
  },
  flatlist: {
    flexGrow: 0,
  },
  itemContainer: {
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Style pour les âges éloignés
  itemTextDefault: {
    fontSize: 22,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  // Style pour les voisins directs
  itemTextNeighbor: {
    fontSize: 28,
    color: '#4B5563',
    fontWeight: '600',
  },
  // Style pour l'âge sélectionné
  itemTextSelected: {
    fontSize: 36,
    color: '#002E52',
    fontWeight: 'bold',
  },
  // Conteneur pour les lignes fixes
  selectionLines: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    paddingVertical: ITEM_HEIGHT * (Math.floor(VISIBLE_ITEMS / 2)),
  },
  line: {
    height: 1.5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: '25%',
  },
});
