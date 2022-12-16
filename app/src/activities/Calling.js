import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import socketIO from '../utils/socketIO'
import Calling from '../components/Calling'

const VideoCall = ({navigation, route}) => {

  const [ received, setReceived ] = useState(route.params.receive)

  useEffect(() => {
    const sender = route.params.user
    const receiver = route.params.friend._id

    if(!route.params.receive){
      socketIO.emit("call", {sender, receiver})
    }

    return () => {
      socketIO.removeAllListeners()
    }
  }, [])
  return (
    <View style={styles.container}>
      {
        received ? <OnCall/> : <Calling/>
      }
    </View>
  )
}

export default VideoCall

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#251B37',
    width: "100%",
    height: "100%"
  }
})