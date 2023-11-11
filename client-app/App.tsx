// import { StatusBar } from 'expo-status-bar';
// import { Text, View } from 'react-native';
// import View1 from './src/views/View1';
// import Chat from './src/views/Chat'

import { RegistratePage } from "./src/views/RegistratePage";
import { HomePage } from "./src/views/HomePage";
import { ChatPage } from "./src/views/ChatPage";
import { ViewPage } from "./src/views/ViewPage";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();



export default function App() {
    
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePage}></Stack.Screen>
        <Stack.Screen name="Chat" component={ViewPage}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}






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


