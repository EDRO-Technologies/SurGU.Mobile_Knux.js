import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Appbar, Button } from 'react-native-paper';
import { Avatar, Card, IconButton, TextInput } from 'react-native-paper';







export const ChatPage = () => {
  return(
      <PaperProvider>
          {HeaderChat()}
          <View className="flex-1 bg-green-100 w-screen">

          {MessageComponent()}
          </View>
      </PaperProvider>
  );
};


const LeftContent = props => <Avatar.Icon {...props} icon="folder"/>
const gg="Big Text messageBig Text messageBig Text messageBig Text messageBig Text messageBig Text messageBig Text messageBig Text messageBig Text messageBig Text messageBig Text messageBig Text message";

const MessageComponent = () => (
  <Card className="m-5">
      <Card.Title title="Card Title" subtitle="Time send message" left={LeftContent} />
      <Card.Content>
      <Text variant="bodyMedium">{gg}</Text>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
      </Card.Content>
  </Card>
);


const ButtonComponent = () => (
  <Button icon="camera" mode="contained" onPress={() => CreateChat("hh","kk")}>
      Add Chat
  </Button>
);
  
const HeaderChat = (nameTitle:string="Welcom to Clab") => (
  <Appbar.Header>
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <Appbar.Content title={nameTitle} />
      {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
      {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
  </Appbar.Header>
)

