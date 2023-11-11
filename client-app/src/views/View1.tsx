// import React from "react";
// import { Text, View } from 'react-native';
// import { TextInput } from "react-native-paper";
// import Hello from "../components/Hello";

// export function View1() {
//   return (
//     <View className="flex-1 items-center justify-center bg-blue-800">
//       {TextInputComponent("gg")}
//       <Hello/>
//     </View>
//   );
// }

// const TextInputComponent = (nameInput:string="") => {
//   const [text, setText] = React.useState("");
//   return (
//     <View>
//       <TextInput
//         label={nameInput}
//         value={text}
//         onChangeText={text => setText(text)}
//       />
//       <Text>{text}</Text>
//     </View>
//   );
// };