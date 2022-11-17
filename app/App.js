import React, { useState } from 'react'
import Home from './src/activities/Home'
import Login from './src/activities/Login'
import Register from './src/activities/Register'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './src/activities/Profile'
import UserOptions from './src/activities/UserOptions'

const Stack = createNativeStackNavigator()

function App() {

  const [ auth, setAuth] = useState(false)

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name = "Login"
            component={Login}
            options={
              {
                headerShown: false
              }
            }
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={
              {
                headerShown: false
              }
            }
            />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={
              {
                headerShown: false
              }
            }
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={
              {
                headerShown: false
              }
            }
          />
          <Stack.Screen
            name="UserOptions"
            component={UserOptions}
            options={
              {
                headerShown: false
              }
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App