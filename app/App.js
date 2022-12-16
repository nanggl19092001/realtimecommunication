import React, { useState } from 'react'
import Home from './src/activities/Home'
import Login from './src/activities/Login'
import Register from './src/activities/Register'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './src/activities/Profile'
import UserOptions from './src/activities/UserOptions'
import ChangePassword from './src/activities/ChangePassword'
import Conversation from './src/activities/Conversation'
import FriendRequest from './src/activities/FriendRequest'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FriendList from './src/activities/FriendList'
import VideoCall from './src/activities/Calling'

function tabBarHomeIcon(color) {
  return <Icon name="home" size={30} color={color}></Icon>
}

function friendListIcon(color) {
  return <MaterialCommunityIcons name="account-group" size={30} color={color}></MaterialCommunityIcons>
}

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()

function TabActivities() {
  return (
    <Tab.Navigator 
    activeColor="black"
    inactiveColor="gray"
    shifting={true}
    barStyle={{ 
      backgroundColor: 'white',
      padding: 5,
      width: "100%",
      height: 70
    }}>
      <Tab.Screen 
      name="Home" 
      component={Home}
      options={{
        tabBarIcon: ({color}) => tabBarHomeIcon(color),
        tabBarColor: "white",
      }}
      />
      <Tab.Screen 
      name="Friends" 
      component={FriendList}
      options={{
        tabBarIcon: ({color}) => friendListIcon(color),
        tabBarLabel: "Friend List"
      }}
      />
    </Tab.Navigator>
  )
}

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
            name = "Change Password"
            component={ChangePassword}
            options={
              {
                title: 'Change password'
              }
            }
          />
          <Stack.Screen
            name="Tab Activities"
            component={TabActivities}
            options={
              {
                headerShown: false
              }
            }
            />
          <Stack.Screen
            name="Friend Request"
            component={FriendRequest}
            options={
              {
                headerShown: true,
                headerTitle: 'Friend Request',
                headerStyle: {
                  backgroundColor: '#251B37',
                },
                headerTitleStyle: {
                  color: 'white'
                },
                headerTintColor: "white"
              }
            }
            />
          <Stack.Screen
            name="Conversation"
            component={Conversation}
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
                headerShown: true,
                headerTitle: 'Profile',
                headerStyle: {
                  backgroundColor: '#251B37',
                },
                headerTitleStyle: {
                  color: 'white'
                },
                headerTintColor: "white"
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
                headerShown: true,
                headerTitle: 'Profile',
                headerStyle: {
                  backgroundColor: '#251B37',
                },
                headerTitleStyle: {
                  color: 'white'
                },
                headerTintColor: "white"
              }
            }
          />
          <Stack.Screen
            name="Call"
            component={VideoCall}
            options={
              {
                headerShown: true,
                headerTitle: 'Calling',
                headerStyle: {
                  backgroundColor: '#251B37',
                },
                headerTitleStyle: {
                  color: 'white'
                },
                headerTintColor: "white"
              }
            }
          />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default App