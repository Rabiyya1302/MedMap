import React, { useState,useRef } from 'react';
import { View, Image, StyleSheet, ScrollView,Animated,Dimensions,TouchableOpacity } from 'react-native';
import { Button, Card, Text, Surface } from 'react-native-paper';
import Header from '@/components/Header';
import Drawer from '@/components/drawer';
type BodyPart = 'Head' | 'Torso' | 'Left Arm' | 'Right Arm' | 'Left Leg' | 'Right Leg';
const {width:viewportWidth,height:viewportHeight}=Dimensions.get("window")
const BodySymptomSelector: React.FC = ({navigation}) => {
  const [selectedPart, setSelectedPart] = useState<BodyPart | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-viewportWidth * 0.6)).current;

  // Symptoms based on selected body part
  const symptoms: Record<BodyPart, string[]> = {
    Head: ['Headache', 'Dizziness', 'Blurred vision'],
    Torso: ['Chest pain', 'Back pain', 'Abdominal pain'],
    'Left Arm': ['Shoulder pain', 'Elbow pain', 'Numbness in arm'],
    'Right Arm': ['Shoulder pain', 'Elbow pain', 'Numbness in arm'],
    'Left Leg': ['Knee pain', 'Thigh pain', 'Swelling in leg'],
    'Right Leg': ['Knee pain', 'Thigh pain', 'Swelling in leg'],
  };

  // Handle body part selection
  const handlePress = (bodyPart: BodyPart) => {
    setSelectedPart(bodyPart);
  };
   const handleMenuToggle = () => {
      const newValue = menuVisible ? -viewportWidth * 0.6 : 0;
      Animated.timing(slideAnim, {
        toValue: newValue,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(!menuVisible));
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
      <Text variant="headlineMedium" style={styles.title}>
        Point on the Body
      </Text>
      {/* Body Image */}
        <Image
          source={require('../../../assets/images/male.png')} // Replace with your image path
          style={styles.bodyImage}
        />


            </ScrollView>
          
    
    
    </View>
  );
};

export default BodySymptomSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
    color: '#2E7D32',
  },
  imageContainer: {
    position: 'relative',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    justifyContent:"center"
  },
  scrollContent:{
    justifyContent:"center",

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
  bodyImage: {
    width: 200,
    height: 400,
    resizeMode: 'contain',
  },
  touchableArea: {
    position: 'absolute',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  selectedPart: {
    marginBottom: 10,
    color: '#2E7D32',
  },
  symptom: {
    fontSize: 16,
    marginVertical: 2,
    color: '#2E7D32',
  },
});
