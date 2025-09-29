// hooks/useUserProfile.ts
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);
      
      // 1. Récupérer la session en cours
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      // 2. Si une session existe, essayer de récupérer le profil
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .maybeSingle(); // IMPORTANT: Utiliser maybeSingle()

        // maybeSingle() retourne null s'il ne trouve rien, au lieu de lancer une erreur.
        if (error) {
          console.error("Erreur lors de la récupération du profil:", error.message);
        }
        
        setProfile(data); // `data` sera le profil, ou `null` si non trouvé.
      }
      
      setLoading(false);
    };

    fetchSessionAndProfile();

    // Écouter les changements d'état d'authentification pour mettre à jour si l'utilisateur se déconnecte
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      // Si l'utilisateur se déconnecte, on vide le profil
      if (!session?.user) {
        setProfile(null);
      } else {
        // Si un nouvel utilisateur se connecte, on recharge son profil
        fetchSessionAndProfile();
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return { profile, user, loading };
}
