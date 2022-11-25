import { StyleSheet, View, Text, Image, TouchableHighlight } from 'react-native'
import { SERVER_IP } from '../constaint'
import React, { useEffect, useState } from 'react'

const Header = ({navigation, user}) => {

  const [ requestCount, setRequestCount ] = useState(0)

  const handleUser = () => {
    navigation.navigate('UserOptions', {user: user})
  }

  const handleFriendRequest = () => {
    navigation.navigate('Friend Request', {user: user})
  }

  useEffect(() => {
    fetch(`${SERVER_IP}/user/friendrequest/${user}`)
    .then(res => res.json())
    .then(res => {
      setRequestCount(res.length)
    })
  }, [])

  return (
    <View style={style.container}>
      <Text style={style.text}>Contact</Text>
      <View style={style.userContainer}>
        <TouchableHighlight
        onPress={handleFriendRequest}>
          <View>
            <Image
              style={style.friendRequest}
            >
            </Image>
            {
              requestCount == 0 ?
              <></> :
              <Text style={style.requestCount}>{requestCount}</Text>
            }
          </View>
        </TouchableHighlight>
        <TouchableHighlight
        onPress={() => handleUser()}
        >
          <Image
          style={style.avatar} 
          source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}></Image>
        </TouchableHighlight>
      </View>
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
        fontSize: 20,
        fontWeight: 'bold'
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 30
    },
    userContainer: {
      flexDirection: 'row'
    },
    friendRequest: {
      width: 40,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 40,
      marginRight: 10
    },
    requestCount: {
      backgroundColor: 'red',
      position: 'absolute',
      fontWeight: 'bold',
      color: 'white',
      width: 20,
      height: 20,
      borderRadius: 10,
      marginLeft: -5,
      textAlign: 'center'
    }
})
export default Header