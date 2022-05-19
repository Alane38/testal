import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import Home from './pages/Home'
import secret3mmc from './pages/3mmc'

const Stack = createStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="3mmc" component={secret3mmc} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
