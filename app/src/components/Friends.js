import { View, Text, TouchableHighlight, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'

const Friends = ({navigation, user}) => {

  const [ conversation, setConversation ] = useState()
  
  useEffect(() => {
    fetch(`${SERVER_IP}/user/conversation/${user}`)
    .then(res => res.json())
    .then(res => {
      let textMessage = []
      const friends = res.friends.map((f) => {
        return {_id: f._id, firstName: f.firstName, lastName: f.lastName}
      })
      setConversation(friends)
    })
  }, [])

  const handleToConversation = (con) => {
    navigation.navigate("Conversation", {
      user: user,
      friend: con
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
                source={{uri: `${SERVER_IP}/public/avatar/${con._id}.jpg`}}></Image>
                <View>
                  <Text style={styles.friendsName}>{`${con.lastName} ${con.firstName}`}</Text>
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
      width: 40,
      height: 40,
      borderRadius: 40
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