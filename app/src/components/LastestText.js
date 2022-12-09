import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const LastestText = ({message, user}) => {
    if(!message)
        return (
        <Text style={styles.notRead}>{`${messageFormat(message)}`}</Text>
        )

    if(message.read || message.user1 == user)
        return (
            <Text style={styles.read}>{`${messageFormat(message)}`}</Text>
        )
    return (
        <Text style={styles.notRead}>{`${messageFormat(message)}`}</Text>
    )
}

export default LastestText

const styles = StyleSheet.create({
    read: {
        color: 'rgba(255,255,255,0.6)',
        marginLeft: 20
    },
    notRead: {
        color: 'rgba(255,255,255,1)',
        marginLeft: 20,
        fontWeight: 'bold'
    }
})

function messageFormat(message) {
    if(message)
      return message.message
    else
      return ""
  }