/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Plugins
import Toast from 'react-native-toast-message';
import BootSplash from "react-native-bootsplash";

// Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
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

  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    // Cria a tabela logged_user (se ainda não existir)
    const hasLoggedUser = async () => {
      db.transaction((tx) => {
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS logged_user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT
          );`,
          [],
          (tx2, results) => {
            tx2.executeSql(
              'SELECT * FROM logged_user;',
              [],
              (tx, results) => {
                if(results.rows.length > 0){
                  setHeaderAuth(results.rows.raw()[0].token);
                  return true;
                } else {
                  return false;
                }
              },
              (tx, error) => {
                console.log('Erro ao consultar:', error);
                return false;
              }
            );
          },
          (_, error) => {
            console.log('Erro ao criar tabela:', error);
            return false;
          }
        )
      })
    }
  
    
    const init = async () => {
      try {
        const isLoggedIn = await hasLoggedUser(); // função que acessa SQLite
        setInitialRoute(isLoggedIn ? 'Home' : 'Login');
      } catch (error) {
        console.error("Erro ao verificar login", error);
        setInitialRoute('Login');
      } finally {
        setTimeout(() => {
          BootSplash.hide({fade: true});
        }, 500);
      }
    };

    init();
  }, []);

  if (!initialRoute) {
    // Enquanto carrega, mantém a splash screen
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName = { initialRoute } screenOptions = {{ headerShown: false, headerLeft: null, animation: "slide_from_right" }}>
          <Stack.Screen name = 'Login' component = { Login }/>
          <Stack.Screen name = 'Home' component = { Home }/>
          <Stack.Screen name = 'Absences' component = { Absences }/>
          <Stack.Screen name = 'Scores' component = { Scores }/>
          <Stack.Screen name = 'History' component = { History }/>
          <Stack.Screen name = 'Schedule' component = { Schedule }/>
          <Stack.Screen name = 'Warnings' component = { Warnings }/>
        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </>
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
