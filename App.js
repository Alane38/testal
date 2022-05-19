import React  from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import secret3mmc from './pages/3mmc'

const Stack = createStackNavigator()

const App = () => {
  return (
    <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="3mmc" component={secret3mmc} />
  </Stack.Navigator>
  )
}

export default App;
