import { StyleSheet, View, Text } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View style={style.container}>
      <Text 
      style={style.text}
      >Contact</Text>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10
    },
    text: {
        color: 'white',
        fontSize: 20
    }
})
export default Header