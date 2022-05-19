import React from 'react'
import { View, Image, Text } from 'react-native'

const Secret3mmc = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://i.pinimg.com/originals/dc/aa/7a/dcaa7a90d62a19169bfa46c1c6625696.gif',
          method: 'POST',
          headers: {
            Pragma: 'no-cache'
          },
          body: 'Your Body goes here'
        }}
        style={{ width: 400, height: 400 }}
      />
    </View>
  );
};

export default Secret3mmc