import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SERVER_IP } from '../constaint'

const StatusBar = ({navigation, user, friend}) => {
  return (
    <View style={styles.StatusBarContainer}>
        <TouchableOpacity
        style={styles.container}
        onPress>
            <Text style={styles.friendName}>Back</Text>
            <Image style={styles.friendAvatar}
                source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}
            ></Image>
            <Text style={styles.friendName}>{`${friend.lastName} ${friend.firstName}`}</Text>
        </TouchableOpacity>
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