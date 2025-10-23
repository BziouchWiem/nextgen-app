// app/(tools)/summary.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

type Picked = {
  name: string;
  size?: number;
  uri: string;
  mimeType?: string | null;
  from: 'file' | 'camera';
};

export default function SummaryScreen() {
  const [tab, setTab] = useState<'text' | 'file'>('text');
  const [text, setText] = useState('');
  const [picked, setPicked] = useState<Picked | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simule un upload quand un fichier/capture est choisi
  useEffect(() => {
    if (picked) {
      setUploading(true);
      setProgress(0);
      const id = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(id);
            setUploading(false);
            return 100;
          }
          return p + 10;
        });
      }, 200);
      return () => clearInterval(id);
    }
  }, [picked]);

  const canSummarize = useMemo(() => {
    if (tab === 'text') return text.trim().length > 0 && !uploading;
    return !!picked && !uploading;
  }, [tab, text, picked, uploading]);

  const onPickFile = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        copyToCacheDirectory: true,
        multiple: false,
        type: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/*']
      });
      if (res.canceled) return;
      const file = res.assets?.[0];
      if (file) {
        setPicked({ name: file.name ?? 'document', size: file.size, uri: file.uri, mimeType: file.mimeType ?? null, from: 'file' });
        setTab('file');
      }
    } catch (e) {
      console.warn('Pick file error', e);
    }
  };

  const onUseCamera = async () => {
    try {
      const perm = await ImagePicker.requestCameraPermissionsAsync();
      if (perm.status !== 'granted') {
        alert("Permission caméra refusée");
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: false,
        quality: 0.8,
      });
      if (result.canceled) return;
      const asset = result.assets?.[0];
      if (asset) {
        setPicked({ name: 'capture.jpg', uri: asset.uri, from: 'camera', mimeType: 'image/jpeg' });
        setTab('file');
      }
    } catch (e) {
      console.warn('Camera error', e);
    }
  };

  const onSummarize = () => {
    if (!canSummarize) return;
    // TODO: Appeler votre API de résumé ici.
    alert('Résumé en cours (mock).');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header title="Nouveau résumé" titleInNav />

      {/* Tabs */}
      <View style={styles.tabsRow}>
        <TouchableOpacity style={[styles.tab, tab === 'text' && styles.tabActive]} onPress={() => setTab('text')}>
          <Text style={[styles.tabText, tab === 'text' && styles.tabTextActive]}>Texte</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, tab === 'file' && styles.tabActive]} onPress={() => setTab('file')}>
          <Text style={[styles.tabText, tab === 'file' && styles.tabTextActive]}>Fichier</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {tab === 'text' ? (
          <View style={styles.textBox}>
            <TextInput
              style={styles.textInput}
              placeholder="Entrez ou collez votre texte ici pour le résumer ..."
              placeholderTextColor="#9CA3AF"
              multiline
              value={text}
              onChangeText={setText}
              textAlignVertical="top"
            />
          </View>
        ) : (
          <View style={styles.uploader}>
            {!picked && !uploading && (
              <>
                <TouchableOpacity style={styles.pickButton} onPress={onPickFile}>
                  <Text style={styles.pickTitle}>Parcourir vos fichiers</Text>
                  <Text style={styles.pickHint}>(PDF, DOCX, PNG...)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondaryButton} onPress={onUseCamera}>
                  <Text style={styles.secondaryText}>Utiliser la caméra</Text>
                </TouchableOpacity>
              </>
            )}

            {/* Uploading state */}
            {(picked || uploading) && (
              <View style={styles.uploadCard}>
                {uploading ? (
                  <>
                    <ActivityIndicator size="small" color="#2563EB" />
                    <View style={styles.progressBarBg}>
                      <View style={[styles.progressBarFg, { width: `${progress}%` }]} />
                    </View>
                    <Text style={styles.uploadText}>Téléchargement du document... {progress}%</Text>
                    {picked?.name && <Text style={styles.uploadFileName}>{picked.name}</Text>}
                  </>
                ) : (
                  <>
                    <Text style={styles.uploadText}>Prêt à résumer: {picked?.name}</Text>
                  </>
                )}
              </View>
            )}
          </View>
        )}
      </View>

      {/* Footer action */}
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.primaryBtn, !canSummarize && styles.primaryBtnDisabled]} onPress={onSummarize} disabled={!canSummarize}>
          <Text style={styles.primaryBtnText}>Résumer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  tabsRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    marginTop: 8,
  },
  tab: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#111827',
  },
  tabText: { color: '#111827', fontWeight: '700' },
  tabTextActive: { color: '#FFFFFF' },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  textBox: {
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    padding: 12,
    height: 220,
  },
  textInput: { flex: 1, color: '#111827', fontSize: 16 },
  uploader: { paddingVertical: 8 },
  pickButton: {
    height: 130,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickTitle: { fontWeight: '700', color: '#111827', fontSize: 16 },
  pickHint: { color: '#6B7280', marginTop: 4 },
  secondaryButton: {
    height: 42,
    borderRadius: 24,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryText: { color: '#111827', fontWeight: '600' },
  uploadCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginTop: 10,
    marginBottom: 8,
  },
  progressBarFg: {
    height: 6,
    backgroundColor: '#111827',
    borderRadius: 3,
  },
  uploadText: { color: '#111827', fontWeight: '600' },
  uploadFileName: { color: '#6B7280', marginTop: 2 },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  primaryBtn: {
    height: 52,
    borderRadius: 28,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryBtnDisabled: { backgroundColor: '#CBD5E1' },
  primaryBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});
