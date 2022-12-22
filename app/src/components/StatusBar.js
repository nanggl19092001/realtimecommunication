import { StyleSheet, Text, View, Image, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const IconArrowBack = <Icon name="arrow-back" size={25} color={"white"}></Icon>

const videoCallIcon = <FontAwesome5 name="video" size={30} color={"white"}></FontAwesome5>

const StatusBar = ({navigation, user, friend}) => {

    const handleNavigateProfile = () => {
        navigation.navigate('Profile', {id: friend._id, user: user})
      }

    const handleGoBack = () => {
        navigation.goBack()
    }

    const handleCall = () => {
        navigation.navigate('Video Call', {caller: user, receiver: friend, user: user})
    }
    
  return (
    <View style={styles.StatusBarContainer}>
        <View
        style={styles.container}>
            <TouchableHighlight
            style={styles.backArrow}
            onPress={handleGoBack}>
                <View>
                    {IconArrowBack}
                </View>
            </TouchableHighlight>
                <Image style={styles.friendAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg?${Date()}`}}
                ></Image>
            <TouchableOpacity
            onPress={handleNavigateProfile}>  
                <Text style={styles.friendName}>{`${friend.lastName} ${friend.firstName}`}</Text>
            </TouchableOpacity>
            
        </View>
            <TouchableOpacity 
            style={styles.callButton}
            onPress={
                handleCall
            }
            >
                {videoCallIcon}
            </TouchableOpacity>
    </View>
  )
}

export default StatusBar

const styles = StyleSheet.create({
    StatusBarContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#251B37',
        paddingLeft: 10,
        paddingRight: 20,
        paddingVertical: 10,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backArrow: {
        borderRadius: 30,
        padding: 5
    },
    friendAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: 'white',
        marginLeft: 20
    },
    friendName: {
        color: 'white',
        marginLeft: 20,
        fontWeight: 'bold'
    },
    callButton: {
        alignSelf: "center"
    }
})