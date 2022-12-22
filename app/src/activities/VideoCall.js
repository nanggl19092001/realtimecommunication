import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { RTCView, mediaDevices, mediaStream, PeerConnection } from 'react-native-webrtc'
import React, { useEffect, useState } from 'react'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import socketIO from '../utils/socketIO'
import peerServer from '../utils/peerServer'

const VideoOffIcon = <FontAwesome5Icon name="video-slash" width={35} color={"white"}/>

const VideoCall = ({navigation, route}) => {

  const [localMediaStream, setLocalMediaStream] = useState(null)
  const [friendMediaStream, setfriendMediaStream] = useState(null)
  const [isVoiceOnly, setIsVoiceOnly] = useState(false)

  let caller = route.params.caller
  let receiver = route.params.receiver
  let user = route.params.user

  useEffect(() => {
    let caller = route.params.caller
    let receiver = route.params.receiver
    let user = route.params.user

    if(caller == user){
      socketIO.emit("call", {caller, receiver})
    }

    socketIO.on("receive-decline-call", () => {
      navigation.goBack()
    })

    return () => {
      socketIO.removeListener("receive-decline-call")
    }
  }, [])

  useEffect(() => {
    let mediaConstraints = {
      audio: true,
      video: {
        frameRate: 30,
        facingMode: 'user'
      }
    };

    (async () => {
    try {
      const mediaStream = await mediaDevices.getUserMedia( mediaConstraints );
    
      if ( isVoiceOnly ) {
        let videoTrack = mediaStream.getVideoTracks()[ 0 ];
        videoTrack.enabled = false;
      };
    
      joinRoom(mediaStream, setfriendMediaStream, setLocalMediaStream, user, caller, receiver)
    } catch( err ) {
      console.log(err)
    };})()
       
    return () => {
      socketIO.removeListener("join-call")
    }
  }, [isVoiceOnly])

  const handleEndCall = () => {
    socketIO.emit('decline-call', (user == caller ? receiver : caller))
    navigation.goBack()
  }

  return (
    <View style={{width: '100%', height: '100%'}}>
      <View>
      { localMediaStream ?
      <RTCView
      style={styles.RTCView}
      streamURL={localMediaStream.toURL()}
      zOrder={0}
      >
      </RTCView> : <></>}
      </View>

      {
        friendMediaStream ?
        <RTCView
        style={styles.RTCViewClient}
        streamURL={friendMediaStream.toURL()}
        zOrder={0}>
        </RTCView> :<></>
      }
      <TouchableOpacity style={styles.offIcon}
      onPress = {handleEndCall}>
        <View>
          {VideoOffIcon}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default VideoCall

const styles = StyleSheet.create({
  RTCView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  RTCViewClient: {
    position: 'absolute',
    width: 173,
    height: 300,
    backgroundColor: 'black',
    alignContent: 'flex-end',
    justifyContent: 'flex-end',
    borderColor: "white",
    borderWidth: 2
  },
  offIcon: {
    backgroundColor: 'red',
    position: 'absolute',
    padding: 20,
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 20
  }
});

function joinRoom(stream, setfriendMediaStream, setLocalMediaStream, user, caller, receiver){

  setLocalMediaStream(stream)
  const peer = peerServer(user)

  if(user != caller) {
    setfriendMediaStream(stream)
  }

  peer.on('error', (err) => {
    console.log(err)
  })
  
  peer.on('open', (peerId) => {
      
    socketIO.emit('join-video-call', (peerId, stream))

    socketIO.on('join-call', (peerid,streamF) => {

      setfriendMediaStream(stream)

      connectToNewUser(peer, peerid, stream, setLocalMediaStream, setfriendMediaStream)

    })
  })  

  peer.on('call', (call) => {

    call.on('error', (error) => {
      console.log('ERROR: ' + error)
    })

    setfriendMediaStream(stream)

    call.answer(stream)

    call.on('stream', (friendStream) => {
      setLocalMediaStream(stream)
      setLocalMediaStream(friendStream)
    })

    console.log(call.peerConnection)

    call.open ? console.log("OKAY") : console.log("F")
  })
}

function connectToNewUser(peer, peerId, stream, setLocalMediaStream, setfriendMediaStream){
  
    const call = peer.call(peerId, stream)

    call.on('error', () => {
      console.log('ERROR'+ error)
    })  
    
    call.on('stream', (str) => {
      setLocalMediaStream(stream)
      setfriendMediaStream(str)
    })
  
}

