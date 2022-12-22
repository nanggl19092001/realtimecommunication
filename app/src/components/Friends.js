import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'
import LastestText from './LastestText'
import socketIO from '../utils/socketIO'

const Friends = ({navigation, user}) => {

  const [ conversation, setConversation ] = useState()
  const [ refresh, setRefresh ] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      fetch(`${SERVER_IP}/user/conversation/${user}`)
      .then(res => res.json())
      .then(res => {

        const friends = res.friends.sort(function(a,b){
          if(!a.lastMess || !b.lastMess){
            return -10000000
          }
          const datea = new Date(a.lastMess.sentDate)
          const dateb = new Date(b.lastMess.sentDate)
          return dateb - datea
        })

        setConversation(friends)
      })
    }, [refresh])
  )

  useEffect(() => {
    
    socketIO.on('receive-message', (sender, message) => {
      setRefresh(!refresh)
    })
    
    socketIO.on('friend-accepted', () => {
      setRefresh(!refresh)
    })

    return () => {
      socketIO.removeListener('receive-message')
      socketIO.removeListener('friend-accepted')
    }
  })

  const handleToConversation = (con) => {
    navigation.navigate("Conversation", {
      user: user,
      friend: con.user
    })
  }

  if(!conversation)
    return (
      <Text>Loading</Text>
    )

  return (
    <>
      <View>
        {
          conversation.map((con, idx) => 
            <TouchableHighlight key={idx}
            onPress={() => handleToConversation(con)}
            >
              <View style={styles.friendsContainer}>
                <Image style={styles.friendsAvatar}
                source={{uri: `${SERVER_IP}/public/avatar/${con.user._id}.jpg?${Date()}`}}></Image>
                <View>
                  <Text style={styles.friendsName}>{`${con.user.lastName} ${con.user.firstName}`}</Text>
                  <LastestText message = {con.lastMess} user = {user}/>
                </View>
              </View>  
            </TouchableHighlight>
          )
        }
      </View>
    </>
  )
}

const styles = new StyleSheet.create(
  {
    friendsName: {
      color: 'white',
      fontWeight: 'bold',
      marginLeft: 20
    },
    friendsAvatar: {
      width: 50,
      height: 50,
      borderRadius: 50
    },
    friendsContainer: {
      flexDirection: 'row',
      textAlign:'center',
      padding: 10,
      paddingVertical: 20
    }
  }
)

export default Friends