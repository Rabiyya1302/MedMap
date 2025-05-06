import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Diagnosis: undefined;
  History: undefined;
  Map: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 