import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

interface DiseaseReport {
  _id: string;
  disease: string;
  currentStatus: string;
  cases: {
    total: number;
    active: number;
    recovered: number;
    deaths: number;
  };
  lastUpdated: string;
  affectedRegions: string[];
  transmission: string;
  severity: string;
  symptoms: string[];
  prevention: string[];
  riskLevel: string;
  trend: string;
  locations: {
    latitude: number;
    longitude: number;
    city?: string;
  }[];
}

const DiseaseTracker: React.FC = () => {
  const { theme } = useTheme();
  const navigation = useNavigation<any>();
  const [diseases, setDiseases] = useState<DiseaseReport[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'outbreak'>('all');
  const [animation] = useState(new Animated.Value(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    axios.get('http://<your-api>/api/reports') // Replace with your backend endpoint
      .then(response => {
        setDiseases(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
        setLoading(false);
      });
  }, []);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'very high': return '#ff0000';
      case 'high': return '#ff4444';
      case 'moderate': return '#ffbb33';
      case 'low': return '#00C851';
      default: return theme.colors.primary;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'increasing': return 'trending-up';
      case 'decreasing': return 'trending-down';
      case 'stable': return 'trending-flat';
      default: return 'trending-flat';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return '#ff4444';
      case 'outbreak': return '#ff0000';
      case 'contained': return '#00C851';
      case 'endemic': return '#ffbb33';
      default: return '#666666';
    }
  };

  const filteredDiseases = diseases.filter(data => {
    if (filter === 'all') return true;
    if (filter === 'active') return data.currentStatus === 'active';
    if (filter === 'outbreak') return data.currentStatus === 'outbreak';
    return true;
  });

  const cardAnimation = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
    opacity: animation,
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={{ marginTop: 10 }}>Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient colors={['#4CAF50', '#4CAF5080']} style={styles.header}>
        <Text style={styles.title}>Disease Tracker</Text>
        <Text style={styles.subtitle}>National Health Monitoring</Text>
      </LinearGradient>

      <View style={styles.filterContainer}>
        {['all', 'active', 'outbreak'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[styles.filterButton, filter === type && styles.activeFilter]}
            onPress={() => setFilter(type as any)}
          >
            <MaterialIcons
              name={type === 'all' ? 'public' : type === 'active' ? 'warning' : 'error'}
              size={20}
              color={filter === type ? 'white' : theme.colors.text}
            />
            <Text style={[styles.filterText, filter === type && styles.activeFilterText]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredDiseases.map((data) => (
        <Animated.View
          key={data._id}
          style={[cardAnimation, { opacity: animation }]}
        >
          <TouchableOpacity
            style={[styles.diseaseCard, { borderColor: getRiskColor(data.riskLevel), backgroundColor: theme.colors.background }]}
            onPress={() => setSelectedDisease(selectedDisease === data._id ? null : data._id)}
          >
            <View style={styles.diseaseHeader}>
              <View style={styles.titleContainer}>
                <Text style={[styles.diseaseName, { color: theme.colors.text }]}>{data.disease}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(data.currentStatus) }]}>
                  <Text style={styles.statusText}>{data.currentStatus}</Text>
                </View>
              </View>
              <MaterialIcons
                name={getTrendIcon(data.trend)}
                size={24}
                color={getRiskColor(data.riskLevel)}
              />
            </View>

            <View style={styles.statsContainer}>
              {['active', 'total', 'deaths'].map(stat => (
                <View key={stat} style={styles.statItem}>
                  <MaterialIcons
                    name={stat === 'active' ? 'person' : stat === 'total' ? 'group' : 'favorite'}
                    size={20}
                    color={theme.colors.text}
                  />
                  <Text style={[styles.statValue, { color: theme.colors.text }]}>
                    {data.cases[stat as keyof typeof data.cases].toLocaleString()}
                  </Text>
                  <Text style={[styles.statLabel, { color: theme.colors.text }]}>
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </Text>
                </View>
              ))}
            </View>

            {selectedDisease === data._id && (
              <View style={styles.detailsContainer}>
                <View style={styles.detailRow}>
                  <MaterialIcons name="location-on" size={20} color={theme.colors.text} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailTitle, { color: theme.colors.text }]}>Affected Regions</Text>
                    <Text style={[styles.detailText, { color: theme.colors.text }]}>
                      {data.affectedRegions.join(', ')}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons name="transfer-within-a-station" size={20} color={theme.colors.text} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailTitle, { color: theme.colors.text }]}>Transmission</Text>
                    <Text style={[styles.detailText, { color: theme.colors.text }]}>
                      {data.transmission}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons name="shield" size={20} color={theme.colors.text} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailTitle, { color: theme.colors.text }]}>Prevention</Text>
                    <Text style={[styles.detailText, { color: theme.colors.text }]}>
                      {data.prevention.join(', ')}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <MaterialIcons name="update" size={20} color={theme.colors.text} />
                  <View style={styles.detailContent}>
                    <Text style={[styles.detailTitle, { color: theme.colors.text }]}>Last Updated</Text>
                    <Text style={[styles.detailText, { color: theme.colors.text }]}>
                      {data.lastUpdated}
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  onPress={() => navigation.navigate('InteractiveMap', {
                    diseaseName: data.disease,
                    locations: data.locations,
                  })}
                  style={{
                    marginTop: 10,
                    padding: 10,
                    backgroundColor: '#4CAF50',
                    borderRadius: 8,
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>View on Map</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    marginTop: 50,
  },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 5 },
  subtitle: { fontSize: 16, color: 'white', opacity: 0.8 },
  filterContainer: { flexDirection: 'row', marginHorizontal: 20, marginBottom: 10 },
  filterButton: { flex: 1, padding: 10, alignItems: 'center', borderRadius: 10, marginHorizontal: 5 },
  activeFilter: { backgroundColor: '#4CAF50' },
  filterText: { fontSize: 16, color: '#666' },
  activeFilterText: { color: 'white' },
  diseaseCard: { marginHorizontal: 20, marginBottom: 20, borderRadius: 10, padding: 15, borderWidth: 1 },
  diseaseHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  titleContainer: { flexDirection: 'row' },
  diseaseName: { fontSize: 20, fontWeight: 'bold' },
  statusBadge: { paddingVertical: 5, paddingHorizontal: 10, borderRadius: 20, marginLeft: 10 },
  statusText: { color: 'white', fontSize: 12 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold' },
  statLabel: { fontSize: 14, color: '#666' },
  detailsContainer: { marginTop: 10 },
  detailRow: { flexDirection: 'row', marginBottom: 10 },
  detailContent: { marginLeft: 10, flex: 1 },
  detailTitle: { fontWeight: 'bold' },
  detailText: { marginTop: 5, color: '#444' },
});

export default DiseaseTracker;
