import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import InteractiveMap from './InteractiveMap';
import OutbreakAlert from './OutbreakAlert';

const MapScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon="menu"
          size={24}
          onPress={() => {/* TODO: Implement menu */}}
        />
      </View>
      <View style={styles.mapContainer}>
        <InteractiveMap />
      </View>
      <OutbreakAlert />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  mapContainer: {
    flex: 1,
  },
});

export default MapScreen; 