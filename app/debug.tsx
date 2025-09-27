import React from 'react';
import { View, Text } from 'react-native';

export default function DebugScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ fontSize: 24, color: 'black' }}>Hello World - Debug Page</Text>
      <Text style={{ fontSize: 16, color: 'gray', marginTop: 20 }}>
        この画面が表示されれば基本的な React Native は動作しています
      </Text>
    </View>
  );
}