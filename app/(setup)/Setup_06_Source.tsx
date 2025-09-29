// app/(setup)/Setup_06_Source.tsx

// ... (tous les imports et composants restent les mêmes)
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSetup } from '../../context/SetupContext';
import SetupContainer from '../../components/setup/SetupContainer';
import Ionicons from '@expo/vector-icons/Ionicons';
import { supabase } from '../../lib/supabase';

// ... (constantes SOURCES et composant SourceButton inchangés)
const SOURCES = [
  { name: 'Facebook', icon: 'logo-facebook' as const },
  { name: 'Instagram', icon: 'logo-instagram' as const },
  { name: 'TikTok', icon: 'logo-tiktok' as const },
  { name: 'YouTube', icon: 'logo-youtube' as const },
  { name: 'Amis', icon: 'people' as const },
];

const SourceButton = ({ source, isSelected, onPress }: { source: typeof SOURCES[0]; isSelected: boolean; onPress: () => void; }) => {
  return (
    <TouchableOpacity style={[styles.sourceButton, isSelected && styles.sourceButtonSelected]} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.sourceContent}>
        <Ionicons name={source.icon} size={24} color={isSelected ? '#002E52' : '#6B7280'} />
        <Text style={[styles.sourceText, isSelected && styles.sourceTextSelected]}>{source.name}</Text>
      </View>
      {isSelected && (<Ionicons name="checkmark" size={20} color="#002E52" />)}
    </TouchableOpacity>
  );
};


export default function Setup_06_Source() {
  const router = useRouter();
  const { setupData, updateSetupData } = useSetup();
  
  const [selectedSource, setSelectedSource] = useState(setupData.source || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleFinish = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const tempEmail = `user_${Date.now()}@nextgen.app`;
    const tempPassword = `password_${Date.now()}`;

    // --- ÉTAPE 1: Inscription de l'utilisateur ---
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: tempEmail,
      password: tempPassword,
    });

    if (signUpError || !signUpData.user) {
      setIsLoading(false);
      console.error("Erreur lors de l'inscription:", signUpError?.message);
      Alert.alert("Erreur technique", "Impossible de créer une session. Veuillez réessayer.");
      return;
    }

    // --- MODIFICATION CRUCIALE : Forcer la session ---
    // Après l'inscription, la session n'est pas toujours active immédiatement.
    // On s'assure que le client Supabase utilise la session du nouvel utilisateur.
    if (signUpData.session) {
        await supabase.auth.setSession(signUpData.session);
        console.log("Session du nouvel utilisateur définie avec succès.");
    } else {
        // Si signUp ne renvoie pas de session (par ex. si la confirmation par email est activée)
        // on se connecte manuellement pour en créer une.
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: tempEmail,
            password: tempPassword,
        });

        if (signInError || !signInData.session) {
            setIsLoading(false);
            console.error("Erreur lors de la connexion après inscription:", signInError?.message);
            Alert.alert("Erreur technique", "Impossible d'activer la session utilisateur.");
            return;
        }
        console.log("Connexion manuelle réussie pour activer la session.");
    }
    
    const userId = signUpData.user.id;
    console.log(`Utilisateur créé avec l'ID: ${userId}. Tentative de sauvegarde du profil.`);

    // --- ÉTAPE 2: Sauvegarde du profil ---
    updateSetupData({ source: selectedSource });
    const finalData = { ...setupData, source: selectedSource };

    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      name: finalData.name,
      age: finalData.age,
      level: finalData.level,
      specialization: finalData.specialization,
      goal: finalData.goal,
      source: finalData.source,
    });

    setIsLoading(false);

    if (profileError) {
      console.error("Erreur lors de la sauvegarde du profil:", profileError.message);
      Alert.alert("Erreur", "Impossible de sauvegarder votre profil. Veuillez réessayer.");
    } else {
      console.log("VICTOIRE ! Profil sauvegardé avec succès !");
      router.replace('/(tabs)');
    }
  };

  return (
    <SetupContainer
      step={6}
      title="Enfin, comment avez-vous entendu parler de NextGen ?"
      subtitle="Cela nous aide à comprendre d'où viennent nos utilisateurs."
      onNext={handleFinish}
      nextLabel={isLoading ? 'Finalisation...' : "Terminer et s'inscrire"}
      isNextDisabled={!selectedSource || isLoading}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {SOURCES.map((source) => (
          <SourceButton key={source.name} source={source} isSelected={selectedSource === source.name} onPress={() => setSelectedSource(source.name)} />
        ))}
      </ScrollView>
    </SetupContainer>
  );
}

// ... (styles inchangés)
const styles = StyleSheet.create({
  scrollView: { flex: 1, paddingTop: 10 },
  sourceButton: { borderWidth: 1.5, borderColor: '#E5E7EB', borderRadius: 12, paddingVertical: 16, paddingHorizontal: 20, marginBottom: 12, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sourceButtonSelected: { borderColor: '#79EFE8', backgroundColor: '#F0FDFC' },
  sourceContent: { flexDirection: 'row', alignItems: 'center' },
  sourceText: { fontSize: 16, color: '#4B5563', fontWeight: '500', marginLeft: 12 },
  sourceTextSelected: { color: '#002E52', fontWeight: '600' },
});
