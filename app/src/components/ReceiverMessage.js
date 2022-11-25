import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'

const ReceiverMessage = ({message, user}) => {
  return (
    <View style={styles.receiverContainer}>
        <Image
            style={styles.userAvatar}
            source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}/>
        <Text style={styles.message}>{message}</Text>
        
    </View>
  )
}

export default ReceiverMessage

const styles = StyleSheet.create({
    receiverContainer: {
        
        alignItems: 'flex-start',
        padding: 10,
        maxWidth: '70%',
        flexDirection: 'row'
    },
    message: {
        padding: 10,
        backgroundColor: '#2146C7',
        marginLeft: 20,
        borderRadius: 10,
        color: 'white'
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30
    }
})