import { StyleSheet, Text, View } from 'react-native'
import logout from '../utils/logout'
import React from 'react'

const UserOptions = ({navigation}) => {

    const handleLogout = async () => {
        const result = await logout(navigation)
    }

  return (
    <View>
      <Text
      onPress={() => handleLogout()}>Log out</Text>
    </View>
  )
}

export default UserOptions

const styles = StyleSheet.create({})