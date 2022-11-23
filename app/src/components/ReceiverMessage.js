import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'

const ReceiverMessage = ({message, user}) => {
  return (
    <View style={styles.receiverContainer}>
        <Text style={styles.message}>{message}</Text>
        <Image
            style={styles.userAvatar}
            source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}/>
    </View>
  )
}

export default ReceiverMessage

const styles = StyleSheet.create({
    receiverContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    message: {
        padding: 10,
        backgroundColor: '#2146C7',
        marginRight: 20,
        borderRadius: 10,
        color: 'white'
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30
    }
})