import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const fileIcon = <FontAwesome name={'file-text'} size={150} color="gray"/>

const ReceiverMessage = ({idx, message, receiver, messageType, id, downloadImage, show, setShowDate}) => {

    
    if(messageType == "text"){
        return (
            <View style={styles.receiverContainer}>
                <Image
                    style={styles.receiverAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${receiver}.jpg?${Date()}`}}/>
                <Text
                onPress={() => setShowDate([idx])}
                style ={styles.message}>{message}</Text>
                {
                        show && <Text style={styles.dateText}>{show.split('T')[0]}</Text>
                    }
            </View>
          )
    }
    else if(messageType.includes("image")){
        return (
            <View style={styles.receiverContainer}>
                <Image
                    style={styles.receiverAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${receiver}.jpg?${Date()}`}}/>
                <View style={{width: "90%", height: undefined, aspectRatio: 135 / 76}}>
                    <TouchableOpacity
                    style={{width: "100%", height: undefined, aspectRatio: 135 / 76}}
                    onPress={() => setShowDate([idx])}
                    onLongPress={() => downloadImage({url: `${SERVER_IP}/public/messageImage/${id}.${messageType.split('/')[1]}`,name: `${id}.${messageType.split('/')[1]}`})}>
                        <Image 
                        style={{width: "100%", height: undefined, aspectRatio: 135 / 76, marginLeft: 20}}
                        source={{uri: `${SERVER_IP}/public/messageImage/${id}.${messageType.split('/')[1]}`}}
                        ></Image>
                    </TouchableOpacity>
                    {
                            show && <Text style={styles.dateText}>{show.split('T')[0]}</Text>
                        }
                </View>
            </View>
          )
    }
    else{
        return (
            <View style={styles.receiverContainer}>
                <Image
                    style={styles.receiverAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${receiver}.jpg?${Date()}`}}/>
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity
                    style={{marginLeft: 20}}
                    onPress={() => setShowDate([idx])}
                    onLongPress={() => downloadImage({url: `${SERVER_IP}/public/messageFile/${id}.${messageType.split('/')[1]}`,name: `${id}.${messageType.split('/')[1]}`})}>
                        {fileIcon}
                        <Text style={styles.dateText}>{messageType.split("/")[1]}</Text>
                    </TouchableOpacity>
                    {
                            show && <Text style={styles.dateText}>{show.split('T')[0]}</Text>
                        }
                </View>
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
    receiverAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30
    },
    dateText: {
        position: 'relative',
        color: 'rgba(255,255,255,0.6)',
    }
})