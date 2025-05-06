import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface DiseaseData {
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
}

// Mock data relevant to Pakistan
const DISEASE_OUTBREAKS: Record<string, DiseaseData> = {
  "Dengue Fever": {
    currentStatus: "active",
    cases: {
      total: 10000,
      active: 1500,
      recovered: 8500,
      deaths: 200,
    },
    lastUpdated: "2025-04-19",
    affectedRegions: ["Karachi", "Lahore", "Islamabad", "Rawalpindi"],
    transmission: "Mosquito-borne",
    severity: "moderate",
    symptoms: ["Fever", "Headache", "Joint pain", "Skin rash"],
    prevention: ["Use mosquito nets", "Eliminate standing water", "Wear insect repellent"],
    riskLevel: "high",
    trend: "increasing",
  },
  "COVID-19": {
    currentStatus: "outbreak",
    cases: {
      total: 1500000,
      active: 30000,
      recovered: 1450000,
      deaths: 50000,
    },
    lastUpdated: "2025-04-19",
    affectedRegions: ["Karachi", "Lahore", "Peshawar", "Multan", "Islamabad"],
    transmission: "Airborne",
    severity: "very high",
    symptoms: ["Fever", "Cough", "Shortness of breath", "Loss of taste and smell"],
    prevention: ["Wear masks", "Practice social distancing", "Vaccination"],
    riskLevel: "very high",
    trend: "decreasing",
  },
  "Cholera": {
    currentStatus: "contained",
    cases: {
      total: 5000,
      active: 50,
      recovered: 4900,
      deaths: 50,
    },
    lastUpdated: "2025-04-18",
    affectedRegions: ["Karachi", "Hyderabad", "Sukkur"],
    transmission: "Waterborne",
    severity: "moderate",
    symptoms: ["Diarrhea", "Vomiting", "Dehydration"],
    prevention: ["Boil water", "Hand hygiene", "Sanitation"],
    riskLevel: "moderate",
    trend: "stable",
  },
};

const DiseaseTracker: React.FC = () => {
  const { theme } = useTheme();
  const [selectedDisease, setSelectedDisease] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'outbreak'>('all');
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case 'very high':
        return '#ff0000';
      case 'high':
        return '#ff4444';
      case 'moderate':
        return '#ffbb33';
      case 'low':
        return '#00C851';
      default:
        return theme.colors.primary;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend.toLowerCase()) {
      case 'increasing':
        return 'trending-up';
      case 'decreasing':
        return 'trending-down';
      case 'stable':
        return 'trending-flat';
      default:
        return 'trending-flat';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return '#ff4444';
      case 'outbreak':
        return '#ff0000';
      case 'contained':
        return '#00C851';
      case 'endemic':
        return '#ffbb33';
      default:
        return '#666666';
    }
  };

  const filteredDiseases = Object.entries(DISEASE_OUTBREAKS).filter(([_, data]) => {
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

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <LinearGradient
        colors={['#4CAF50', '#4CAF5080']}
        style={styles.header}
      >
        <Text style={styles.title}>Disease Tracker</Text>
        <Text style={styles.subtitle}>National Health Monitoring</Text>
      </LinearGradient>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.activeFilter]}
          onPress={() => setFilter('all')}
        >
          <MaterialIcons name="public" size={20} color={filter === 'all' ? 'white' : theme.colors.text} />
          <Text style={[styles.filterText, filter === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'active' && styles.activeFilter]}
          onPress={() => setFilter('active')}
        >
          <MaterialIcons name="warning" size={20} color={filter === 'active' ? 'white' : theme.colors.text} />
          <Text style={[styles.filterText, filter === 'active' && styles.activeFilterText]}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'outbreak' && styles.activeFilter]}
          onPress={() => setFilter('outbreak')}
        >
          <MaterialIcons name="error" size={20} color={filter === 'outbreak' ? 'white' : theme.colors.text} />
          <Text style={[styles.filterText, filter === 'outbreak' && styles.activeFilterText]}>Outbreaks</Text>
        </TouchableOpacity>
      </View>

      {filteredDiseases.map(([disease, data]) => (
        <Animated.View
          key={disease}
          style={[cardAnimation, { opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }) }]}
        >
          <TouchableOpacity
            style={[styles.diseaseCard, { borderColor: getRiskColor(data.riskLevel) }, { backgroundColor: theme.colors.background }]}
            onPress={() => setSelectedDisease(selectedDisease === disease ? null : disease)}
          >
            <View style={styles.diseaseHeader}>
              <View style={styles.titleContainer}>
                <Text style={[styles.diseaseName, { color: theme.colors.text }]}>{disease}</Text>
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
              <View style={styles.statItem}>
                <MaterialIcons name="person" size={20} color={theme.colors.text} />
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {data.cases.active.toLocaleString()}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.text }]}>Active</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="group" size={20} color={theme.colors.text} />
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {data.cases.total.toLocaleString()}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.text }]}>Total</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="favorite" size={20} color={theme.colors.text} />
                <Text style={[styles.statValue, { color: theme.colors.text }]}>
                  {data.cases.deaths.toLocaleString()}
                </Text>
                <Text style={[styles.statLabel, { color: theme.colors.text }]}>Deaths</Text>
              </View>
            </View>

            {selectedDisease === disease && (
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
              </View>
            )}
          </TouchableOpacity>
        </Animated.View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
    marginTop:50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  filterContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeFilter: {
    backgroundColor: '#4CAF50',
  },
  filterText: {
    fontSize: 16,
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
  },
  diseaseCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
  },
  diseaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  diseaseName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailsContainer: {
    marginTop: 10,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailContent: {
    marginLeft: 10,
    flex: 1,
  },
  detailTitle: {
    fontWeight: 'bold',
  },
  detailText: {
    marginTop: 5,
    color: '#444',
  },
});

export default DiseaseTracker;
