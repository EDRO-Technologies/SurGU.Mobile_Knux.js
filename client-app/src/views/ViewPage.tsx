import { useState, useCallback, useEffect } from "react";
import * as React from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import {
  Appbar,
  Button,
  Avatar,
  Card,
  IconButton,
  TextInput,
} from "react-native-paper";
// const Stack = createNativeStackNavigator();
import io from "socket.io-client";

import { Component } from "react";
import { API_URL } from "../serverUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "../services/Auth";
import { User } from "../models/User";
// import { createNativeStackNavigator } from "@react-na



export const ViewPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [user, setUser] = useState<User>();

  let socket;

  useEffect(() => {
    const startupSocket = async () => {
      const token = await AsyncStorage.getItem("jwtToken");

      const user = await getUser();
      setUser(user);

      console.log({token, user});

      socket = io(API_URL, {
        transportOptions: {
          polling: {
            extraHeaders: {
              Authorization: `Bearer ${token}`,
            },
          },
        },
      }); // Замените на вашу URL-адрес сервера Socket.IO

      // Обработчик события "connect"
      socket.on("connect", () => {
        console.log("Connected to Socket.IO server");
      });

      // Обработчик события "disconnect"
      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });

      // Обработчик события "message"
      socket.on("receive_message_4", (data) => {
        console.log("Received message 4:", data);

        // if (data.user.id === user.id)
        //   return;

        setMessages((previousMessages: IMessage[]) =>
          GiftedChat.append(previousMessages, [
            {
              _id: ''+data.id,
              text: data.text,
              createdAt: data.createdAt,
              user: {
                _id: ''+data.user.id,
                name: data.user.firstName,
                avatar: data.user.picture,
              },
            } as IMessage,
          ])
        );
      });

      socket.on("message", (data) => {
        console.log("Received message:", data);
      });
    };

    startupSocket();
    // Отключение сокета при размонтировании компонента

    return () => {
      socket.disconnect();
    };
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages: IMessage[]) => {

      console.log(messages);

      socket.emit("send_message", {
        text: messages[0].text,
        chatId: 4
      });

      return previousMessages;
      // return GiftedChat.append(previousMessages, messages)
    }
    );
  }, []);

  return (
    <View className=" flex-1 flex-col w-full items-center justify-center  bg-slate-200">
      <View className="w-full h-full">
        <GiftedChat
          className="flex-1 flex-row  "
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: ''+user?.id,
            name: user?.firstName,
            avatar: user?.picture
          }}
        />
      </View>
    </View>
  );
};

