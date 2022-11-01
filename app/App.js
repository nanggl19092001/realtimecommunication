import React from 'react'
import Home from './src/activities/Home'
import Login from './src/activities/Login'
import Register from './src/activities/Register'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name = "Login"
          component={Login}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          />
        <Stack.Screen
          name="Register"
          component={Register}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App