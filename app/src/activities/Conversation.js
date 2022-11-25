import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native'
import React, { useCallback, useState } from 'react'
import TextBar from '../components/TextBar'
import Message from '../components/Message'
import StatusBar from '../components/StatusBar'
import MessageContext from '../utils/Context/MessageContext'

const Conversation = ({navigation, route}) => {

  const [ message, setMessage ] = useState([])

  return (
    <View style={styles.container} >
      <MessageContext.Provider value = {{message, setMessage}}>
        <StatusBar navigation = {navigation} user = {route.params.user} friend = {route.params.friend}/>
        <Message user = {route.params.user} friend = {route.params.friend}/>
        <TextBar user = {route.params.user} friend = {route.params.friend}/>
      </MessageContext.Provider>
    </View>
  )
}

export default Conversation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    }
})