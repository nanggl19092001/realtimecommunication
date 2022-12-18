import { StyleSheet, Text, View } from 'react-native'
import { RTCView, mediaDevices, mediaStream } from 'react-native-webrtc'
import React, { useEffect, useState } from 'react'
import socketIO from '../utils/socketIO'

const VideoCall = ({navigation, route}) => {

  const [localMediaStream, setLocalMediaStream] = useState(null)
  const [isVoiceOnly, setIsVoiceOnly] = useState(false)

  useEffect(() => {
    let caller = route.params.caller
    let receiver = route.params.receiver

    socketIO.emit("call", {caller, receiver})
    socketIO.emit('join-video-call', `${caller}${receiver}`)

    socketIO.on("receive-decline-call", () => {
      navigation.goBack()
    })

    return () => {
      socketIO.removeListener("receive-decline-call")
    }
  }, [])

  useEffect(() => {
    (async () => {
      let MediaConstraint = {
        audio: true,
        video: {
          frameRate: 24,
          facingMode: 'user'
        }
      }

      let tempLocalMediaStream = await mediaDevices.getUserMedia(MediaConstraint)
      if(isVoiceOnly){
        let videoTrack = await mediaStream.getVideoTracks()[0]
        videoTrack.enabled = false
      }

      setLocalMediaStream(tempLocalMediaStream)
    })()
  }, [isVoiceOnly])
  
  return (
    <View>
      { localMediaStream ?
      <RTCView
      style={styles.RTCView}
      mirror={true}
      objectFit={'cover'}
      streamURL={localMediaStream.toURL()}
      zOrder={0}
      >
      </RTCView> : <></>}
    </View>
  )
}

export default VideoCall

const styles = StyleSheet.create({
  RTCView: {
    width: '100%',
    height: '50%',
  }
});