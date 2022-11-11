import { View, Text,Image, StyleSheet } from 'react-native'
import React from 'react'

const Buttons = ({navigation}) => {
  return (
    <View style={style.container}>
    
      <Text>1</Text>
      <Text>1</Text>
    </View>
  )
}

export default Buttons

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  image: {
    width: 30,
    height: 30
  }
})