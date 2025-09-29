// context/SetupContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// 1. Définir le type de données que nous allons stocker
interface SetupData {
  name: string;
  age: number | null;
  goal: string;
  level: string;
  specialization: string;
  source: string;
}

// 2. Définir le type du contexte
interface SetupContextType {
  setupData: SetupData;
  updateSetupData: (updates: Partial<SetupData>) => void;
}

// 3. Créer le contexte
const SetupContext = createContext<SetupContextType | undefined>(undefined);

// 4. Créer le fournisseur (Provider) qui enveloppera notre flux
export const SetupProvider = ({ children }: { children: ReactNode }) => {
  const [setupData, setSetupData] = useState<SetupData>({
    name: '',
    age: null,
    goal: '',
    level: '',
    specialization: '',
    source: '',
  });

  const updateSetupData = (updates: Partial<SetupData>) => {
    setSetupData((prevData) => ({ ...prevData, ...updates }));
  };

  return (
    <SetupContext.Provider value={{ setupData, updateSetupData }}>
      {children}
    </SetupContext.Provider>
  );
};

// 5. Créer un hook personnalisé pour utiliser facilement le contexte
export const useSetup = () => {
  const context = useContext(SetupContext);
  if (!context) {
    throw new Error('useSetup must be used within a SetupProvider');
  }
  return context;
};
