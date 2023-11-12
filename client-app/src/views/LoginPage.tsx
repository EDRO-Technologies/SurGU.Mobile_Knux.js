import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { PaperProvider } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Appbar } from "react-native-paper";
import {
  Avatar,
  Card,
  IconButton,
  TextInput,
  Button,
  Banner
} from "react-native-paper";
import { weekLogin } from "../services/Auth";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginPage({navigation}) {
  const [token, setToken] = useState<string>(
    "9af588d0-0353-4186-80d5-91f965c240c2"
  );

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);

  useEffect(() => {

    const getToken = async () => {
      const token = await AsyncStorage.getItem('jwtToken');

      if (token) {
        navigation.navigate("Home");
      }
    }

    getToken();
  }, []);

  const login = async () => {
    setIsFetching(true);
    try {
      const userWithToken = await weekLogin(token);
      
      await AsyncStorage.setItem('jwtToken', userWithToken.accessToken);
      
      console.log({ userWithToken });
      navigation.navigate("Home");
    } catch (e) {
      const err = e as AxiosError;

      console.log(err.message);
    }
    setIsFetching(false);
  };

  return (
    <PaperProvider>
      <View className="flex-1 items-center justify-between bg-white w-screen px-8 py-8 ">
        <Image style={{ width: 250, height: 250 }} src="https://weeek.net/static/seo/logo.jpg" />
        <View className="flex gap-4">
          <TextInput
            label="Weeek токен"
            value={token}
            mode="outlined"
            onChangeText={(x) => setToken(x)}
          />
          <Button
            className="h-14 flex justify-center"
            mode="contained"
            loading={isFetching}
            onPress={login}
          >
            Войти
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
}
