import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import LoginScreen from './react-redux/components/LoginScreen';
import Dashboard from './react-redux/components/dashboard/Dashboard';
import Menu from './react-redux/components/dashboard/Menu';
import FeeDetails from './react-redux/components/dashboard/FeeDetails';
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FeeDetails"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="FeeDetails" component={FeeDetails} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

