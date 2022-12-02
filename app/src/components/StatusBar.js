import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'

const StatusBar = ({navigation, user, friend}) => {

    const handleNavigateProfile = () => {
        navigation.navigate('Profile', {id: friend._id, user: user})
      }

    const handleGoBack = () => {
        navigation.goBack()
    }
  return (
    <View style={styles.StatusBarContainer}>
        <View
        style={styles.container}>
            <TouchableHighlight
            onPress={handleGoBack}>
                <Text style={styles.friendName}>Back</Text>
            </TouchableHighlight>
                <Image style={styles.friendAvatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}
                ></Image>
            <TouchableHighlight
            onPress={handleNavigateProfile}>  
                <Text style={styles.friendName}>{`${friend.lastName} ${friend.firstName}`}</Text>
            </TouchableHighlight>
        </View>
        <View></View>
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
        paddingVertical: 10
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
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
    }
})