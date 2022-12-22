import { StyleSheet, Text, View, ScrollView, ActivityIndicator, ToastAndroid } from 'react-native'
import React, { useEffect, useState, useRef, useContext } from 'react'
import Dialog from 'react-native-dialog'
import { SERVER_IP } from '../constaint'
import ReceiverMessage from './ReceiverMessage'
import SenderMessage from './SenderMessage'
import MessageContext from '../utils/Context/MessageContext'
import socketIO from '../utils/socketIO'
import RNFS from 'react-native-fs'

const Message = ({navigation, user, friend}) => {

  const { message, setMessage, refresh, setRefresh } = useContext(MessageContext)
  

  const scrollViewRef = useRef();

  const [ showDate, setShowDate ] = useState([])
  const [ limit, setLimit] = useState(15)
  const [ loading, setLoading ] = useState(true)
  const [ downloadDialog, setDownloadDialog] = useState(null)

  
  useEffect(() => {
    socketIO.on('receive-message', payload => {
      if(payload.sender == friend._id){
        const newMessage = [...message, payload.message]
        setMessage(newMessage)
      }
    })

    return () => {
      socketIO.removeListener('receive-message')
    }
  })

  useEffect(() => {
    fetch(`${SERVER_IP}/user/message?a=${user}&b=${friend._id}&limit=${limit}`)
    .then(res => res.json())
    .then(res => {
      setLoading(false)
      setMessage(res.reverse())
    })
  }, [limit, refresh])

  const handleScrollToTop = (offset) => {
    if(offset == 0 && message.length >= limit){
      setLoading(true)
      setLimit(limit + 20)
    }
  }

  handleDownloadFile = () => {
    console.log(downloadDialog.url)
    console.log(`${RNFS.DocumentDirectoryPath}/${downloadDialog.name}`)
    RNFS.downloadFile({
      fromUrl: downloadDialog.url,
      toFile: `${RNFS.DocumentDirectoryPath}/${downloadDialog.name}`,
    }).promise.then((r) => {
      if(r.statusCode == 200){
        ToastAndroid.show(`File downloaded at: ${RNFS.DocumentDirectoryPath}/${downloadDialog.name}`, ToastAndroid.SHORT)
        setDownloadDialog(null)
      }
      else{
        ToastAndroid.show(`File download failed`, ToastAndroid.SHORT)
        setDownloadDialog(null)
      }
    });
  }
  function items(_id, user1, user2, message, messageType, id, sentDate, idx){
    
    let show = null
    if(showDate.includes(idx))
      show = sentDate
    if(user == user1) {
      return <SenderMessage
      navigation={navigation}
      key={idx} 
      idx={idx}
      message = {message} 
      sender = {user1} 
      messageType = {messageType} 
      id={_id} 
      downloadImage = {setDownloadDialog}
      show = {show}
      setShowDate = {setShowDate}/>
    }
    else {
      return <ReceiverMessage 
      navigation={navigation}
      key={idx} 
      idx={idx}
      message = {message} 
      receiver = {user1} 
      messageType = {messageType} 
      id={_id} 
      downloadImage = {setDownloadDialog}
      show = {show}
      setShowDate = {setShowDate}/>
    }
  }

  return (
    <View style={styles.MessageContainer}>
      <ScrollView
      ref={scrollViewRef}
      alwaysBounceVertical={true}
      onScrollEndDrag={(e) => handleScrollToTop(e.nativeEvent.contentOffset.y)}
      onContentSizeChange={() => limit == 15 ? scrollViewRef.current.scrollToEnd({animated: true}): null }
      >
        {
          loading ?
          <ActivityIndicator size='large' color="0000ff"/> : <></>
        }
        {
          message ? 
          message.map((mess, idx) => items(mess._id, mess.user1, mess.user2, mess.message, mess.messageType, mess._id, mess.sentDate, idx))
          :
          <></>
        }
      </ScrollView>
      <Dialog.Container visible={downloadDialog ? true : false}>
        <Dialog.Title>Download Image</Dialog.Title>
        <Dialog.Description>
          Do you want to download this image ?
        </Dialog.Description>
        <Dialog.Button label="Cancel" 
        onPress={() => setDownloadDialog(null)}/>
        <Dialog.Button label="Download" 
        onPress={handleDownloadFile}/>
      </Dialog.Container>
    </View>
  )
}

export default Message

const styles = StyleSheet.create({
    MessageContainer: {
        flex: 9,
        backgroundColor: '#251B37'
    }
})


