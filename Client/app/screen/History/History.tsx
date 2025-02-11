import React, { useState, useRef } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from "react-native";
import {
  Card,
  Text,
  Button,
  List,
  Divider,
  Searchbar,
} from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import Header from "@/components/Header";
import Drawer from "@/components/drawer";

const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");
const historyData = [
  {
    id: 1,
    date: "2025-02-05",
    symptom: "Fever",
    diagnosis: "Flu",
    treatment: "Paracetamol",
  },
  {
    id: 2,
    date: "2025-02-02",
    symptom: "Cough",
    diagnosis: "Cold",
    treatment: "Cough Syrup",
  },
  {
    id: 3,
    date: "2025-01-28",
    symptom: "Headache",
    diagnosis: "Migraine",
    treatment: "Painkillers",
  },
];

export default function HistoryScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const [filteredData, setFilteredData] = useState(historyData);
  const slideAnim = useRef(new Animated.Value(-viewportWidth * 0.6)).current;

  const handleMenuToggle = () => {
    const newValue = menuVisible ? -viewportWidth * 0.6 : 0;
    Animated.timing(slideAnim, {
      toValue: newValue,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(!menuVisible));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      setFilteredData(
        historyData.filter((item) =>
          item.symptom.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredData(historyData);
    }
  };

  return (
    <View style={styles.container}>
      {menuVisible && (
        <TouchableOpacity  onPress={handleMenuToggle} />
      )}
      <Animated.View
        style={[
          styles.drawerContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <Drawer navigation={navigation} slideAnim={slideAnim} />
      </Animated.View>

      <Header onMenuToggle={handleMenuToggle} />
      <Searchbar
        placeholder="Search Symptoms"
        value={searchQuery}
        onChangeText={handleSearch}
        style={styles.searchBar}
      />

      <ScrollView>
        <Card style={styles.card}>
          <Card.Title title="Health Summary" subtitle="Key Metrics" />
          <Card.Content>
            <Text style={styles.summaryText}>Most Frequent Symptom: Fever</Text>
            <Text style={styles.summaryText}>
              Average Treatment Duration: 5 days
            </Text>
            <Text style={styles.summaryText}>Health Trends: Improving</Text>
          </Card.Content>
        </Card>

        <Text style={styles.sectionTitle}>Symptom Timeline</Text>
        <Divider style={styles.divider} />
        {filteredData.map((entry) => (
          <List.Item
            key={entry.id}
            title={`${entry.symptom} - ${entry.diagnosis}`}
            description={`Date: ${entry.date} | Treatment: ${entry.treatment}`}
            left={(props) => (
              <List.Icon {...props} icon="calendar" color="#2E7D32" />
            )}
            style={styles.listItem}
          />
        ))}

        <Text style={styles.sectionTitle}>Symptom Trend</Text>
        <LineChart
          data={{
            labels: ["Jan 1", "Jan 10", "Jan 20", "Feb 1"],
            datasets: [{ data: [3, 4, 2, 5] }],
          }}
          width={viewportWidth * 0.9}
          height={viewportHeight * 0.25}
          chartConfig={{
            backgroundColor: "#E8F5E9",
            backgroundGradientFrom: "#A5D6A7",
            backgroundGradientTo: "#66BB6A",
            color: (opacity = 1) => `rgba(27, 94, 32, ${opacity})`,
            strokeWidth: 2,
            decimalPlaces: 0,
          }}
          bezier
          style={styles.chart}
        />
      </ScrollView>

      <Button mode="contained" style={styles.button}>
        Export as PDF
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    justifyContent:"center"
  },
  drawerContainer: {
    position: "absolute",
    top: 60,
    left: 0,
    height: "100%",
    width: viewportWidth * 0.6,
    backgroundColor: "#ffffff",
    zIndex: 1,
    marginTop: 3,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  searchBar: {
    marginTop:viewportHeight*0.02,
    marginBottom: viewportHeight * 0.02,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    backgroundColor:"white"
  },
  card: {
    borderRadius: 10,
    padding: viewportWidth * 0.05,
    backgroundColor: "#ffffff",
    elevation: 3,
  },
  summaryText: {
    fontSize: viewportWidth * 0.04,
    color: "#1B5E20",
    marginBottom: viewportHeight * 0.01,
    
  },
  sectionTitle: {
    marginTop: viewportHeight * 0.02,
    fontWeight: "bold",
    fontSize: viewportWidth * 0.05,
    color: "#2E7D32",
    marginLeft:8,
  },
  divider: {
    marginVertical: viewportHeight * 0.01,
  },
  listItem: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    marginVertical: viewportHeight * 0.005,
    elevation: 2,
  },
  chart: {
    marginVertical: viewportHeight * 0.02,
    borderRadius: 10,
    alignSelf:"center"
  },
  button: {
    margin: 20,
    backgroundColor: "#2E7D32",
    borderRadius: 10,
  },
});
