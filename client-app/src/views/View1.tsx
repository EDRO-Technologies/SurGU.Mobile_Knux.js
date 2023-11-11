import React from "react";
import { Text, View } from 'react-native';
import Hello from "../components/Hello";

export default function View1() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-300">
      <Hello/>
    </View>
  );
}
