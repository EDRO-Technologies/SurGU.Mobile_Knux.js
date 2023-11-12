import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View, TouchableOpacity } from "react-native";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { Appbar, Button } from "react-native-paper";
import { Avatar, Card, IconButton, TextInput } from "react-native-paper";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

export const HomePage = ({ navigation }) => {
    return (
        <View className="flex-1 bg-slate-100 w-screen">
            {CardTitleChat("gg", "wpjj", navigation.navigate)}
        </View> 
    );
};

const CardTitleChat = (nameChat: string, lastMessage: string, navig: Function) => {
    return(<TouchableOpacity onPress={() => navig('Chat')}>
      <Card.Title
        className="border border-slate-100 bg-white"
        title={"Chat: " + nameChat}
        subtitle={"Message: " + lastMessage}
        left={(props) => <Avatar.Icon {...props} icon="folder" />}
      />
    </TouchableOpacity>
    );
};
