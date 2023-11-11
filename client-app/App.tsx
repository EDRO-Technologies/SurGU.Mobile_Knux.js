import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import View1 from './src/views/View1';
import Chat from './src/views/Chat'

export default function App() {
  return (
    // здесь обертка paper и навигация
    <View className="flex-1 items-center justify-center w-full ">
      {/* <View1/> */}
      <Chat/>
      <StatusBar style="auto" />
    </View>
  );
}


