import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef, useContext } from 'react'
import Dialog from 'react-native-dialog'
import { SERVER_IP } from '../constaint'
import ReceiverMessage from './ReceiverMessage'
import SenderMessage from './SenderMessage'
import MessageContext from '../utils/Context/MessageContext'
import socketIO from '../utils/socketIO'

const Message = ({user, friend}) => {

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
      console.log(res[0])
    })
  }, [limit, refresh])

  const handleScrollToTop = (offset) => {
    if(offset == 0 && message.length >= limit){
      setLoading(true)
      setLimit(limit + 20)
    }
  }

  const items = ({message, user1, user2, messageType, _id, sentDate}, idx) => {
    
    let show = null
    if(showDate.includes(idx))
      show = sentDate
    if(user1 == user)
      return <SenderMessage
      key={idx} 
      idx={idx}
      message = {message} 
      user = {user1} 
      messageType = {messageType} 
      id={_id} 
      downloadImage = {setDownloadDialog}
      show = {show}
      setShowDate = {setShowDate}/>
    else
      return <ReceiverMessage 
      key={idx} 
      idx={idx}
      message = {message} 
      user = {user2} 
      messageType = {messageType} 
      id={_id} 
      downloadImage = {setDownloadDialog}
      show = {show}
      setShowDate = {setShowDate}/>
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
          message.map((mess, idx) => items(mess, idx))
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
        <Dialog.Button label="Download" />
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