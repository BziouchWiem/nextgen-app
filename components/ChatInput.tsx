// app/components/ChatInput.tsx
import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import PaperClipSvg from '../assets/images/paper-clip.svg';
import SoundwaveSvg from '../assets/images/soundwave.svg';
import SendSvg from '../assets/images/send.svg';

type Props = {
  value: string;
  onChangeText: (t: string) => void;
  onSend: () => void;
  placeholder?: string;
};

export default function ChatInput({ value, onChangeText, onSend, placeholder = 'Envoyer un message à Nexie...' }: Props) {
  const [inputHeight, setInputHeight] = useState(63); // Aligne avec l'onboarding

  const handleContentSizeChange = (event: any) => {
    // Calculer la hauteur basée sur le contenu, avec des limites
    const contentHeight = event.nativeEvent.contentSize.height;
  const newHeight = Math.min(Math.max(63, contentHeight + 16), 110); // +16 pour le padding
    setInputHeight(newHeight);
  };

  const handleChangeText = (text: string) => {
    onChangeText(text);
    // Forcer le recalcul de la hauteur si le texte est long
    if (text.length > 30) {
      setTimeout(() => {
        // Cette logique aide à ajuster la hauteur pour les textes longs
      }, 50);
    }
  };

  return (
    <View style={styles.container}>
  <View style={[styles.inputBox, { height: inputHeight }]}>
        <TouchableOpacity style={styles.inputLeftIcon}>
          <PaperClipSvg width={24} height={24}  />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { 
            height: Math.max(39, inputHeight - 24),
            maxHeight: 86 // 110 - 24 de padding
          }]}
          value={value}
          onChangeText={handleChangeText}
          onContentSizeChange={handleContentSizeChange}
          placeholder={placeholder}
          placeholderTextColor="#6B7280"
          returnKeyType="send"
          onSubmitEditing={onSend}
          multiline
          textAlignVertical="center"
          numberOfLines={1} // Commence avec une ligne
          maxLength={500} // Limite de caractères
        />

        <TouchableOpacity style={styles.inputRightIcon}>
          <SoundwaveSvg width={24} height={24} fill="#002E52" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={onSend} style={styles.sendButton}>
        <SendSvg width={24} height={24} fill="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: 'transparent',
    minHeight: 83, // 63 + ~20 padding
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#FFFFFF', 
  paddingHorizontal: 16,
  borderRadius: 40, // radius comme onboarding
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  minHeight: 63,
  maxHeight: 110,
    borderWidth: 1,
    borderColor: '#E5E7EB', // Bordure pour mieux voir les limites
  },
  input: { 
    flex: 1, 
    paddingHorizontal: 8, // Padding horizontal seulement
    paddingVertical: 0, // Pas de padding vertical, géré par le conteneur
    color: '#0F172A', 
    fontSize: 16,
    textAlignVertical: 'center',
    includeFontPadding: false, // Évite le padding supplémentaire de la police
  },
  inputLeftIcon: { 
    marginRight: 8, 
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  inputRightIcon: { 
    marginLeft: 8, 
    width: 30, 
    height: 30, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  sendButton: { 
    width: 63, 
    height: 63, 
    borderRadius: 40, // comme le bouton carré onboarding
    backgroundColor: '#79EFE8', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});