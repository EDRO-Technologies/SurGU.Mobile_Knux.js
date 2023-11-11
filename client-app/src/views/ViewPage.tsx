import { useState, useCallback, useEffect } from "react";
import * as React from 'react';
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


import { Component } from "react";
// import { createNativeStackNavigator } from "@react-na








export const ViewPage = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          // avatar: "https://memepedia.ru/wp-content/uploads/2023/10/patamushta-ponabirajut-vsjakih-dalbaebav-14.jpg",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages: IMessage[]) =>
      GiftedChat.append(previousMessages, messages),
    )
  }, [])

  return (
    <View className=" flex-1 flex-col w-full items-center justify-center  bg-slate-200">
      <View className="w-full h-full">
        <GiftedChat
          className="flex-1 flex-row  "
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
          }}
        />

      </View>
       {/* <Text>JSadjasjd</Text> */}
    </View>
  );
};

// const GetDB = () => {
//     const [res,set_res] = React.useState("");

//     return(
//         <PaperProvider>
//             <View className="flex-1 bg-green-100 w-screen">
//             <Button className="m-10" icon="camera" mode="contained" onPress={() => set_res(getUser())}>Get</Button>
//               <Text className="bg-slate-500 p-10 text-center">{res}</Text>
//             </View>
//         </PaperProvider>
//     );
// };

// const TextInputComponent = (nameInput:string="") => {
//     const [text, setText] = React.useState("");
//     return (
//       <View>
//         <TextInput
//           label={nameInput}
//           value={text}
//           onChangeText={text => setText(text)}
//         />
//         <Text>{text}</Text>
//       </View>
//     );
//   };

// export default function Example() {
//   const [messages, setMessages] = useState([])

//   return (
//     <View className="flex-1 w-97 items-center justify-center  bg-blue-700">
//       <GiftedChat
//         className="flex-1 flex-row"
//         messages={messages}
//         user={{
//           _id: 1,
//         }}
//       />
//       <Text>Hello</Text>
//     </View>
//   )
// }
