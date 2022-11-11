import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Searchbar = () => {
  return (
    <View style={style.container}>
      <TextInput style={style.searchInput} placeholder="Search"/>
    </View>
  )
}

export default Searchbar

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  searchInput: {
    paddingLeft: 10,
    backgroundColor: '#9F91B4',
    borderRadius: 5
  }
})