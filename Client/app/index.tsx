// App.tsx
import React from "react";
import "setimmediate";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "./screen//Welcome/Welcome";
import RegisterScreen from "./screen/Auth/Register";
import LoginScreen from "./screen/Auth/Login";
import OTPScreen from "./screen/Auth/OTP";
import DashBoardScreen from "./screen/DashBoard/DashBoard";
import SymptomCheckerScreen from "./screen/SymptomChecker/sympCheck";
import HistoryScreen from "./screen/History/History";
import DynamicQuestioningScreen from "./screen/DynamicQuestioning/QuestionScreen";
import BodySymptomSelector from "./screen/BodyPointing/BodyPointing";
const Stack = createStackNavigator();

const App = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false, // Hide headers in the stack screens
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
      <Stack.Screen name="DashBoard" component={DashBoardScreen} />
      <Stack.Screen name="sympCheck" component={SymptomCheckerScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen
        name="QuestionScreen"
        component={DynamicQuestioningScreen}
        initialParams={{ symptoms: [], onSubmit: (answers: any) => {} }} // Ensure initial params are set
      />
      <Stack.Screen name="BodyPointing" component={BodySymptomSelector}/>
    </Stack.Navigator>
  );
};

export default App;
