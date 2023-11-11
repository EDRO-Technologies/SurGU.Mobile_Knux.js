import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Appbar, Button } from "react-native-paper";
import { Avatar, Card, IconButton, TextInput } from "react-native-paper";

export const HomePage = () => {
  return (
    <PaperProvider>
      {HeaderChat()}
      <View className="flex-1 bg-slate-100 w-screen">
        {ButtonComponent()}
        {CardTitleChat("gg", "wpjj")}
        {CardTitleChat("njnk", "gcfx")}
        {/* {chatList} */}
      </View>
    </PaperProvider>
  );
};

function CreateChat() {
  return CardTitleChat("hh", "kok");
}

const ButtonComponent = () => (
  <Button icon="camera" mode="contained" onPress={() => CreateChat("hh", "kk")}>
    Add Chat
  </Button>
);

const CardTitleChat = (nameChat: string, lastMessage: string) => (
  <Card.Title
    className="border border-slate-100 bg-white"
    title={"Chat: " + nameChat}
    subtitle={"Message: " + lastMessage}
    left={(props) => <Avatar.Icon {...props} icon="folder" />}
    // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
);

const HeaderChat = (nameTitle: string = "Welcom to Clab") => (
  <Appbar.Header>
    {/* <Appbar.BackAction onPress={() => {}} /> */}
    <Appbar.Content title={nameTitle} />
    {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
    {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
  </Appbar.Header>
);
