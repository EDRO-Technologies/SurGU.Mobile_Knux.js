import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Appbar, Button } from "react-native-paper";
import { Avatar, Card, IconButton, TextInput } from "react-native-paper";

import { Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { getUserChats } from "../services/Chat";
import { getUser } from "../services/Auth";
const Stack = createNativeStackNavigator();

export const HomePage = ({ navigation }) => {
  const [chats, setChats] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetch = async () => {
      const data = await getUserChats();
      const u = await getUser();

      console.log(data);

      setChats(data);
      setUser(user);
    }

    fetch();
  }, [])

  // const getChatEl = (chat) => {
  //   if (chat.isPrivate) {
  //     const filtered = chat.users.filter(x => x.id !== user.id)[0];

  //     return <Image src={filtered.picture}/>;
  //   } else {
  //     return <Avatar.Icon icon="folder" />;
  //   }
  // }

  return (
    <View className="flex-1 bg-slate-100 w-screen">
      <Button>Создать чат</Button>
      {chats.map(x => (
        <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
          <Card.Title
            className="border border-slate-100 bg-white"
            title={`[${x.isPrivate ? 'Личный' : 'Общий'}] ${x.name}`}
            left={(props) => <Avatar.Icon {...props} icon="folder" />}
            // left={() => getChatEl(x)}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
