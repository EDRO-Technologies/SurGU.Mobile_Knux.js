

import { Appbar, Button } from "react-native-paper";
import { Avatar, Card, IconButton, TextInput, } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";


import { RegistratePage } from "./src/views/RegistratePage";
// import { HomePage } from "./src/views/HomePage";
import { ChatPage } from "./src/views/ChatPage";
import { ViewPage } from "./src/views/ViewPage";
import { PaperProvider } from "react-native-paper";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from "./src/views/LoginPage";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();

export default function App() {
  return (

        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginPage}/>
                <Stack.Screen name="Home" component={HomePage}/>
                <Stack.Screen name="Chat" component={ViewPage}/>
            </Stack.Navigator>
        </NavigationContainer>

  );
}

const HomePage = ({ navigation }) => {
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
        // right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
      />
    </TouchableOpacity>
    );
};


// export default function App() {
//   return (
//     // здесь обертка paper и навигация
//     <View className="flex-1 items-center justify-center w-full ">
//       {/* <View1/> */}
//       <Chat/>
//       <StatusBar style="auto" />
//     </View>
//   );
// }


