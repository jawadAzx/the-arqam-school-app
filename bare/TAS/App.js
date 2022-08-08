import React from "react";
import { Provider } from "react-redux";
import { store, persistor } from './store';
import { View, ActivityIndicator, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState, useEffect, useMemo } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react'
import { AuthContext } from "./react-redux/components/context";
import PushNotification from "react-native-push-notification";
import SplashScreen from "react-native-splash-screen";

import LoginScreen from './react-redux/components/LoginScreen';
import Dashboard from './react-redux/components/dashboard/Dashboard';
import Menu from './react-redux/components/dashboard/Menu';
import FeeDetails from './react-redux/components/dashboard/FeeDetails';
import Profile from './react-redux/components/dashboard/Profile';
import Attendance from './react-redux/components/dashboard/Attendance';
import Result from './react-redux/components/dashboard/Result';
const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  //Hide Splash screen on app load.
  React.useEffect(() => {
    SplashScreen.hide();
  });

  useEffect(() => {
    createChannels();
    console.log("useEffect");
  }, [])

  const createChannels = () => {
    PushNotification.createChannel(
      {
        channelId: "default",
        channelName: "Default",

      }
    );

  }
  const authContext = useMemo(() => ({
    signIn: async (user) => {
      const token = Math.random().toString();
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      await AsyncStorage.setItem('announcements', JSON.stringify([]));
      setUserToken(token);
      setIsLoading(false);

    },
    signOut: async () => {
      // await AsyncStorage.removeItem('userToken');
      // await AsyncStorage.removeItem('user');
      await AsyncStorage.clear();
      setUserToken(null)
      setIsLoading(false);
    }

  }), [])

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null
      try {
        userToken = await AsyncStorage.getItem('userToken')
        setUserToken(userToken)
      }
      catch (e) {
        console.log(e)
      }
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }
  return (
    <Provider store={store}>
      <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>

        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            {userToken !== null ? (
              <Stack.Navigator
                screenOptions={{ headerShown: false }}
              >
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="FeeDetails" component={FeeDetails} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Attendance" component={Attendance} />
                <Stack.Screen name="Result" component={Result} />
              </Stack.Navigator>) :

              <LoginScreen />
            }

          </NavigationContainer>
        </AuthContext.Provider>
      </PersistGate>
    </Provider>
  );
}

