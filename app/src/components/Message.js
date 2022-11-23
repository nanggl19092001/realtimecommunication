import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { SERVER_IP } from '../constaint'
import ReceiverMessage from './ReceiverMessage'
import SenderMessage from './SenderMessage'

const Message = ({user, friend}) => {

  const scrollViewRef = useRef();
  const [ limit, setLimit] = useState(15)
  const [ message, setMessage ] = useState(null)
  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    fetch(`${SERVER_IP}/user/message?a=${user}&b=${friend._id}&limit=${limit}`)
    .then(res => res.json())
    .then(res => {
      setLoading(false)
      setMessage(res.reverse())
    })
  }, [limit])

  const handleScrollToTop = (offset) => {
    if(offset == 0 && message.length == limit){
      setLoading(true)
      setLimit(limit + 20)
    }
  }

  const items = ({message, user1, user2}, idx) => {
    if(user1 == user)
      return <SenderMessage key={idx} message = {message} user = {user1}/>
    else
      return <ReceiverMessage key={idx} message = {message} user = {user2}/>
  }

  return (
    <View style={styles.MessageContainer}>
      <ScrollView
      ref={scrollViewRef}
      alwaysBounceVertical={true}
      onScrollEndDrag={(e) => handleScrollToTop(e.nativeEvent.contentOffset.y)}
      onContentSizeChange={() => limit == 15 ? scrollViewRef.current.scrollToEnd({animated: false}): null }
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