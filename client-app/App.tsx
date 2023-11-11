
import { RegistratePage } from "./src/views/RegistratePage";
import { HomePage } from "./src/views/HomePage";
import { ChatPage } from "./src/views/ChatPage";
import { ViewPage } from "./src/views/ViewPage";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginPage from "./src/views/LoginPage";
import { useEffect } from "react";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
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


