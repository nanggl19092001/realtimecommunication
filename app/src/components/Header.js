import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import { SERVER_IP } from '../constaint'
import React from 'react'

const Header = ({navigation, user}) => {

  const handleUser = () => {
    navigation.navigate('UserOptions')
  }

  return (
    <View style={style.container}>
      <Text style={style.text}>Contact</Text>
      <TouchableHighlight
      onPress={() => handleUser()}
      >
        <Image
        style={style.avatar} 
        source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}></Image>
      </TouchableHighlight>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    text: {
        color: 'white',
        fontSize: 20
    },
    avatar: {
      width: 45,
      height: 45,
      borderRadius: 30
    }
})
export default Header