import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Header</Text>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    text: {
        color: 'white'
    }
})
export default Header