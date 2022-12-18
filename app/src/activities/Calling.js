import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import socketIO from '../utils/socketIO'
import Call from '../components/Call'
import OnCall from '../components/OnCall'
 
const VideoCall = ({navigation, route}) => {

  const [ received, setReceived ] = useState(route.params.receive)

  useEffect(() => {
    const sender = route.params.user
    const receiver = route.params.friend._id

    socketIO.on("receive-decline-call", () => {
      navigation.goBack()
    })

    return () => {
      socketIO.removeListener("receive-decline-call")
    }
  }, [])
  return (
    <View style={styles.container}>
      {
        received ? 
        <OnCall navigation = {navigation} user={route.params.user} friend={route.params.friend}/> : 
        <Call navigation = {navigation} user={route.params.user} friend={route.params.friend}/>
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