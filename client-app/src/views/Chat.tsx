import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { Text, View } from 'react-native';

export default function Example() {
  const [messages, setMessages] = useState([])

  return (
    <View className="flex-1 w-96 items-center justify-center  bg-blue-700">
      <GiftedChat
        className="flex-1 flex-row"
        messages={messages}
        user={{
          _id: 1,
        }}
      />
      <Text>Hello</Text>
    </View>
  )
}