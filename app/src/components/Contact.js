import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Contact = ({item}) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>{item.id}</Text>
    </View>
  )
}

export default Contact

const style = StyleSheet.create({
    container: {
        backgroundColor: '#9F91B4',
        padding: 20
    },
    text: {
        color: 'white'
    }
})