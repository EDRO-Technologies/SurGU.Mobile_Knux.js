import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Appbar } from 'react-native-paper';
import { Avatar, Card, IconButton, TextInput } from 'react-native-paper';

export const RegistratePage = () => {
    gg="4";
    return(<PaperProvider>
      {HeaderChat("Registrate")}
      <View className="flex-1 bg-green-500 w-screen p-25">
        {TextInputComponent("Email")}
        {TextInputComponent("Password")}
        <Text>{gg}</Text>
      </View>
    </PaperProvider>
    )
}

  
const TextInputComponent = (nameInput:string="") => {
    const [text, setText] = React.useState("");
    return (
      <View>
        <TextInput
          label={nameInput}
          value={text}
          onChangeText={text => setText(text)}
        />
        <Text>{text}</Text>
      </View>
    );
  };
  
const HeaderChat = (nameTitle:string="Welcom to Clab") => (
    <Appbar.Header>
      {/* <Appbar.BackAction onPress={() => {}} /> */}
      <Appbar.Content title={nameTitle} />
      {/* <Appbar.Action icon="calendar" onPress={() => {}} /> */}
      {/* <Appbar.Action icon="magnify" onPress={() => {}} /> */}
    </Appbar.Header>
  )