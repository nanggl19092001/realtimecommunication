import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SERVER_IP } from '../constaint'
import socketIO from '../utils/socketIO'

const AbortCall = <MaterialComunityIcon size={40} name="phone-cancel" color="white"></MaterialComunityIcon>

const Call = ({navigation, user, friend}) => {

  const handleAbort = () => {
    socketIO.emit('decline-call', friend._id)
    navigation.goBack()
  }

  useEffect(() => {
    socketIO.on('answer', () => {
      navigation.replace("Video Call", {caller: user, receiver: friend})
    })

    return () => {
      socketIO.removeListener('answer')
    }
  }, [])

  return (
    <View>
      <View style={styles.avatarContainer}>
        <Image
        style={styles.avatar}
        source={{uri: `${SERVER_IP}/public/avatar/${friend._id}.jpg`}}
        />
      </View>
      <Text style={styles.callingText}>Calling ... </Text>
      <TouchableOpacity 
      style={styles.abortContainer}
      onPress={handleAbort}>
        <View style={styles.abortCallContainer}>
          {AbortCall}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Call

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 200
  },
  avatarContainer: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  callingText: {
    color: 'white',
    fontSize: 30,
    alignSelf: 'center'
  },
  abortContainer: {
    marginTop: 30,
    width: 70,
    height: 70,
    borderRadius: 70,
    alignSelf: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  }
})