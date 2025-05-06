import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../theme/theme';
import Header from '../components/Header';

const LanguageSettingsScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  
  const languages = [
    { id: 'english', name: 'English', locale: 'en-US', flag: '🇺🇸' },
    { id: 'spanish', name: 'Español', locale: 'es-ES', flag: '🇪🇸' },
    { id: 'french', name: 'Français', locale: 'fr-FR', flag: '🇫🇷' },
    { id: 'german', name: 'Deutsch', locale: 'de-DE', flag: '🇩🇪' },
    { id: 'chinese', name: '中文', locale: 'zh-CN', flag: '🇨🇳' },
    { id: 'japanese', name: '日本語', locale: 'ja-JP', flag: '🇯🇵' },
    { id: 'portuguese', name: 'Português', locale: 'pt-BR', flag: '🇧🇷' },
    { id: 'russian', name: 'Русский', locale: 'ru-RU', flag: '🇷🇺' },
    { id: 'arabic', name: 'العربية', locale: 'ar-SA', flag: '🇸🇦' },
    { id: 'hindi', name: 'हिन्दी', locale: 'hi-IN', flag: '🇮🇳' },
  ];

  const handleLanguageSelect = (langId) => {
    setSelectedLanguage(langId);
    // In a real app, we would save this preference and update the app's locale
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.languageItem, 
        selectedLanguage === item.id && styles.selectedLanguageItem
      ]}
      onPress={() => handleLanguageSelect(item.id)}
    >
      <Text style={styles.languageFlag}>{item.flag}</Text>
      <View style={styles.languageInfo}>
        <Text style={styles.languageName}>{item.name}</Text>
        <Text style={styles.languageLocale}>{item.locale}</Text>
      </View>
      {selectedLanguage === item.id && (
        <MaterialCommunityIcons name="check" size={24} color={theme.colors.primary} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header title="Language Settings" backButton={true} />
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Select your preferred language. This will change the language throughout the application.
        </Text>
        
        <FlatList
          data={languages}
          renderItem={renderLanguageItem}
          keyExtractor={(item) => item.id}
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
        
        <View style={styles.infoSection}>
          <MaterialCommunityIcons name="information-outline" size={24} color={theme.colors.onSurfaceVariant} />
          <Text style={styles.infoText}>
            Some medical terms may still appear in English regardless of language selection to ensure accuracy.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: theme.colors.onSurfaceVariant,
    marginBottom: 24,
    lineHeight: 22,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: theme.colors.surface,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: theme.colors.outline,
  },
  selectedLanguageItem: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primaryContainer + '20', // 20% opacity
  },
  languageFlag: {
    fontSize: 28,
    marginRight: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.onSurface,
  },
  languageLocale: {
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  infoSection: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceVariant,
    padding: 16,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 20,
  },
});

export default LanguageSettingsScreen;
