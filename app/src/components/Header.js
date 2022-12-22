import { StyleSheet, View, Text, Image, TouchableHighlight, Button } from 'react-native'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { SERVER_IP } from '../constaint'
import React, { useCallback, useEffect, useState } from 'react'
import socketIO from '../utils/socketIO'
import Icon from 'react-native-vector-icons/FontAwesome5';

function FriendRequestIcon(){
return <Icon name="user-friends" size={20} color="white"/>;
}




const Header = ({navigation, user}) => {

  const [ requestCount, setRequestCount ] = useState(0)
  const [ refreshRequest, setRefreshRequest ] = useState(false)

  const handleUser = () => {
    navigation.navigate('UserOptions', {user: user})
  }

  const handleFriendRequest = () => {
    navigation.navigate('Friend Request', {user: user})
  }

  useFocusEffect(
    useCallback(() => {
      fetch(`${SERVER_IP}/user/friendrequest/${user}`)
      .then(res => res.json())
      .then(res => {
        setRequestCount(res.length)
      })
    }, [refreshRequest])
  )

  useEffect(() => {
    socketIO.on('receive-request', () => {
      setRefreshRequest(!refreshRequest)
    })

    return () => {
      socketIO.removeListener('receive-request')
    }
  })

  return (
    <View style={style.container}>
      <Text style={style.text}>Contact</Text>
      <View style={style.userContainer}>
        <TouchableHighlight
        onPress={handleFriendRequest}>
          <View>
            <View style={style.friendRequest}>
              <FriendRequestIcon />
            </View>
            
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
          source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg?${Date()}`}}></Image>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        minHeight: 50,
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
      borderRadius: 40,
      marginRight: 10,
      borderWidth: 2,
      borderColor: 'white',
      padding: 7
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