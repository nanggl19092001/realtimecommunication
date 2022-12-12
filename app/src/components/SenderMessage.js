import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'

const SenderMessage = ({message, user, messageType, id}) => {
    if(messageType == "text"){
        return (
            <View style={styles.senderContainer}> 
            <Text style={styles.senderText}>{message}
                </Text>
             <Image
                    style={styles.userAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}/>
                
            </View>
          )
    }
    else if(messageType.includes("image")){
        return (
            <View style={styles.senderContainer}> 
            <Image 
                style={{width: "60%", height: undefined, aspectRatio: 135 / 76, marginRight: 20}}
                source={{uri: `${SERVER_IP}/public/messageImage/${id}.${messageType.split('/')[1]}`}}></Image>
             <Image
                    style={styles.userAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}/>

            </View>
        )
    }
  
}

export default SenderMessage

const styles = StyleSheet.create({
    senderContainer: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    senderText: {
        padding: 10,
        backgroundColor: '#2146C7',
        marginRight: 20,
        borderRadius: 10,
        color: 'white',
        maxWidth: '70%'
    },
    userAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30
    }
})