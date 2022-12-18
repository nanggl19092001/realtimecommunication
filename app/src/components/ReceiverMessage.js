import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'

const ReceiverMessage = ({idx, message, user, messageType, id, downloadImage, show, setShowDate}) => {
    
    
    if(messageType == "text"){
        return (
            <View style={styles.receiverContainer}>
                <Image
                    style={styles.userAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}/>
                <Text
                onPress={() => setShowDate([idx])}
                style ={styles.message}>{message}</Text>
                {
                    show && <Text>{show}</Text>
                }
            </View>
          )
    }
    else if(messageType.includes("image")){
        return (
            <View style={styles.receiverContainer}>
                <Image
                    style={styles.userAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}/>
                <TouchableOpacity
                onPress={() => setShowDate([idx])}
                onLongPress={() => downloadImage(`${SERVER_IP}/public/messageImage/${id}.${messageType.split('/')[1]}`)}>
                    <Image 
                    style={{width: "60%", height: undefined, aspectRatio: 135 / 76, marginLeft: 20}}
                    source={{uri: `${SERVER_IP}/public/messageImage/${id}.${messageType.split('/')[1]}`}}
                    ></Image>
                </TouchableOpacity>
                {
                    show && <Text>{show}</Text>
                }
            </View>
          )
    }
  
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