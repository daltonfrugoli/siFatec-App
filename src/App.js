/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from './screens/splashScreen/splashScreen';
import { Login } from './screens/login/Login';
import { Home } from './screens/home/Home';
import { Absences } from './screens/absences/Absences';
import { Scores } from './screens/scores/Scores';
import { History } from './screens/history/History';
import { Schedule } from './screens/schedule/Schedule';
import { Warnings } from './screens/warnings/Warnings';

//  Local storage
import SQLite from "react-native-sqlite-storage";

const Stack = createNativeStackNavigator();

export const db = SQLite.openDatabase( 
  {
    name: "siFatec.db",
    location: 'default'
  },
  () => { console.log('banco iniciado') },
  (error) => {
    console.log('Err: ', error);
  }
);

function App(){

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{ headerShown: false, headerLeft: null, animation: "slide_from_right" }}>
        <Stack.Screen name='SplashScreen' component={ SplashScreen }/>
        <Stack.Screen name='Login' component={ Login }/>
        <Stack.Screen name='Home' component={ Home }/>
        <Stack.Screen name='Absences' component={ Absences }/>
        <Stack.Screen name='Scores' component={ Scores }/>
        <Stack.Screen name='History' component={ History }/>
        <Stack.Screen name='Schedule' component={ Schedule }/>
        <Stack.Screen name='Warnings' component={ Warnings }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
