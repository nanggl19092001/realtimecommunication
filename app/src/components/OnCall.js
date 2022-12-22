import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import socketIO from '../utils/socketIO'

const AcceptCallIcon = <Ionicons name="call" color={"white"} size={40}/>
const DeclineCallIcon = <FontAwesome5Icon name="phone-slash" size={40} color={"white"}/>

const OnCall = ({navigation, user, friend}) => {

  const [info, setInfo] = useState(null)

    useEffect(() => {
        fetch(`${SERVER_IP}/user/profile/${friend}`)
        .then(res => res.json())
        .then(res => {
          setInfo(res[0])
        })
    }, [])

    const handleDecline = () => {
      socketIO.emit('decline-call', friend)
      navigation.goBack()
    }

    const handleAccept = () => {
      socketIO.emit('accept-call', friend)
      navigation.replace("Video Call", {caller: friend, receiver: user, user: user})
    }
  return (
    <View>
      {
        info && 
        <View>
          <Image
          style={styles.friendAvatar}
          source={{uri: `${SERVER_IP}/public/avatar/${friend}.jpg`}}
          />
          <Text style={styles.callingText}>Calling...</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
            style={styles.acceptButton}
            onPress={handleAccept}>
              {AcceptCallIcon}
            </TouchableOpacity>
            <TouchableOpacity 
            style={styles.declineButton}
            onPress={handleDecline}>
              {DeclineCallIcon}
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  )
}

export default OnCall

const styles = StyleSheet.create({
  friendAvatar: {
    width: 200,
    height: 200,
    borderRadius: 200,
    alignSelf: 'center'
  },
  callingText: {
    marginTop: 50,
    fontSize: 25,
    color: 'white',
    alignSelf: 'center',
    padding: 20
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 20,
    borderRadius: 30
  },
  declineButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 100,
    marginTop: 50
  }
})