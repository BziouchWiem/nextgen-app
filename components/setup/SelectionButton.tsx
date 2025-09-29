// components/setup/SelectionButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  title: string;
  isSelected: boolean;
  onPress: () => void;
  showCheckmark?: boolean;
};

export default function SelectionButton({ 
  title, 
  isSelected, 
  onPress, 
  showCheckmark = true 
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, isSelected && styles.buttonSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.buttonText, isSelected && styles.buttonTextSelected]}>
        {title}
      </Text>
      {showCheckmark && isSelected && (
        <Ionicons 
          name="checkmark" 
          size={20} 
          color="#002E52" 
          style={styles.checkmark} 
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonSelected: {
    borderColor: '#79EFE8', // Cyan clair de votre palette
    backgroundColor: '#F0FDFC', // Fond très léger cyan
  },
  buttonText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  buttonTextSelected: {
    color: '#002E52', // Bleu nuit de votre palette
    fontWeight: '600',
  },
  checkmark: {
    marginLeft: 8,
  },
});