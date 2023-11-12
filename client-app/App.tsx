import React, { useState, useCallback, useEffect } from "react";
import { Appbar, BottomNavigation, Button, Avatar, Card, IconButton, TextInput, PaperProvider } from "react-native-paper";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RegistratePage } from "./src/views/RegistratePage";
import { HomePage } from "./src/views/HomePage";
import { ChatPage } from "./src/views/ChatPage";
import { ViewPage } from "./src/views/ViewPage";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from "./src/views/LoginPage";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function HomeScreen(){
  return(
            <Stack.Navigator>
              {/* <Stack.Screen name="Login" component={LoginPage}/> */}
              <Stack.Screen name="Home" component={HomePage}/>
              <Stack.Screen name="Chat" component={ViewPage}/>
            </Stack.Navigator>
  );
}

export default function App() {
  return (
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen name="HomeWorld" component={HomeScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
  );
}




