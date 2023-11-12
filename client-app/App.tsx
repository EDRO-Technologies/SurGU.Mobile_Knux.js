import React, { useState, useCallback, useEffect } from "react";
import {
  Appbar,
  BottomNavigation,
  Button,
  Avatar,
  Card,
  IconButton,
  TextInput,
  PaperProvider,
} from "react-native-paper";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { RegistratePage } from "./src/views/RegistratePage";
import { HomePage } from "./src/views/HomePage";
import { ChatPage } from "./src/views/ChatPage";
import { ViewPage } from "./src/views/ViewPage";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "./src/views/LoginPage";
import { User } from "./src/models/User";
import { getUser, getUserList } from "./src/services/Auth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
}

function ContactScreen() {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    console.log('asdsadsads');

    const fetch = async () => {
      const data = await getUserList();
      console.log(data);
      setUserList(data);
    };

    fetch();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "start", alignItems: "center" }}>
      { userList.map((x) => (
        <TouchableOpacity key={x.id}>
          <Card.Title
            className="border border-slate-100 bg-white w-screen"
            title={x.firstName + ' ' + x.lastName}
            // subtitle={"Message: " + lastMessage}
            left={ (props) => <Image style={{ width: 50, height: 50 }} src={x.picture}/>}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
}

function HomeScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginPage}/>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Chat" component={ViewPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
        <Tab.Screen
          name="Contacts"
          component={ContactScreen}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function LogoTitle() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetch = async () => {
      const data = await getUser();

      setUser(data);
    };

    fetch();
  }, []);

  return (
    <View className="flex-row rounded-lg w-screen justify-around items-center">
      <Text></Text>
      <Text>Weeek Chat</Text>
      <Image style={{ width: 50, height: 50 }} src={user?.picture} />
    </View>
  );
}
