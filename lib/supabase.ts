// lib/supabase.ts
import 'react-native-url-polyfill/auto'; // Nécessaire pour que Supabase fonctionne bien sur mobile
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bpkbazqjdsorxzhtncxo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwa2JhenFqZHNvcnh6aHRuY3hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1MDIyNDMsImV4cCI6MjA3MjA3ODI0M30.6iUbhu7vy94Z5s3h3QGu8Hn3Q8bJU51SHEqhbKBa7hs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
