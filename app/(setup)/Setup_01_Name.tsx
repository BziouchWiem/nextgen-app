// app/(setup)/Setup_01_Name.tsx
import React, { useState } from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSetup } from '../../context/SetupContext';
import SetupContainer from '../../components/setup/SetupContainer';

export default function Setup_01_Name() {
  const router = useRouter();
  const { setupData, updateSetupData } = useSetup();
  const [name, setName] = useState(setupData.name);

  const handleNext = () => {
    updateSetupData({ name });
    router.push('/(setup)/Setup_02_Age');
  };

  return (
    <SetupContainer
      step={1}
      title="Quel est votre nom ?"
      subtitle="Nous aimerions savoir comment vous appeler."
      onNext={handleNext}
      isNextDisabled={name.trim().length < 2}
    >
      <View>
        <TextInput
          style={styles.input}
          placeholder="Votre nom"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={setName}
          autoFocus={true}
        />
      </View>
    </SetupContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 18,
    backgroundColor: '#F9FAFB',
    fontWeight: '500',
  },
});
