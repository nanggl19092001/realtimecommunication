import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const fileIcon = <FontAwesome name={'file-text'} size={150} color="gray"/>

const SenderMessage = ({navigation, idx, message, sender, messageType, id, downloadImage, show, setShowDate}) => {

    if(messageType == "text"){
        return (
            <View style={styles.senderContainer}>
                <View style={styles.textContainer}>
                    <Text 
                onPress={() => setShowDate([idx])}
                style={styles.senderText}>{message}
                    </Text>
                    {
                        show && <Text style={styles.dateText}>{show.split('T')[0]}</Text>
                    }
                </View>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('UserOptions', {user: sender})}>
                        <Image
                            style={styles.senderAvatar}
                            source={{uri: `${SERVER_IP}/public/avatar/${sender}.jpg?${Date()}`}}/>
                    </TouchableOpacity>
                
            </View>
          )
    }
    else if(messageType.includes("image")){
        return (
            <View style={styles.senderContainer}>
                <View style={{width: "70%", height: undefined, aspectRatio: 135 / 76, marginRight: 20}}>
                    <TouchableOpacity
                    onLongPress={() => downloadImage({url: `${SERVER_IP}/public/messageImage/${id}.${messageType.split('/')[1]}`,name: `${id}.${messageType.split('/')[1]}`})}
                    style={{width: "100%", height: undefined, aspectRatio: 135 / 76, marginRight: 20}}
                    onPress={() => setShowDate([idx])}>
                    <Image 
                        style={{width: "100%", height: undefined, aspectRatio: 135 / 76, marginRight: 20}}
                        source={{uri: `${SERVER_IP}/public/messageImage/${id}.${messageType.split('/')[1]}`}}></Image>
                    </TouchableOpacity>
                    {
                        show && <Text style={styles.dateText}>{show.split('T')[0]}</Text>
                    }
                </View>
                
             <TouchableOpacity
                    onPress={() => navigation.navigate('UserOptions', {user: sender})}>
                        <Image
                            style={styles.senderAvatar}
                            source={{uri: `${SERVER_IP}/public/avatar/${sender}.jpg?${Date()}`}}/>
                    </TouchableOpacity>

            </View>
        )
    }
    else{
        return <View style={styles.senderContainer}>
                <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity 
                    onPress={() => setShowDate([idx])}
                    onLongPress={() => downloadImage({url: `${SERVER_IP}/public/messageFile/${id}.${messageType.split('/')[1]}`,name: `${id}.${messageType.split('/')[1]}`})}
                    style={styles.fileContainer}>
                        {fileIcon}
                        <Text style={styles.dateText}>{messageType.split("/")[1]}</Text>
                    </TouchableOpacity>
                    {
                        show && <Text style={styles.dateText}>{show.split('T')[0]}</Text>
                    }
                </View>
             <TouchableOpacity
                    onPress={() => navigation.navigate('UserOptions', {user: sender})}>
                        <Image
                            style={styles.senderAvatar}
                            source={{uri: `${SERVER_IP}/public/avatar/${sender}.jpg?${Date()}`}}/>
                    </TouchableOpacity>

            </View>
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
        
    },
    senderAvatar: {
        width: 30,
        height: 30,
        borderRadius: 30
    },
    textContainer: {
        maxWidth: '70%',
    },
    dateText: {
        position: 'relative',
        color: 'rgba(255,255,255,0.6)',
    }
})