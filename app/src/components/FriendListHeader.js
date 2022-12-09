import { StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { SERVER_IP } from '../constaint'

const FriendListHeader = ({navigation, user}) => {

    const handleUser = () => {
        navigation.navigate('UserOptions', {user: user})
    }

    return (
        <View style={styles.container}>
          <Text style={styles.text}>FriendList</Text>
          <View style={styles.userContainer}>
            <TouchableHighlight
            onPress={() => handleUser()}
            >
              <Image
              style={styles.avatar} 
              source={{uri: `${SERVER_IP}/public/avatar/${user}.jpg`}}></Image>
            </TouchableHighlight>
          </View>
        </View>
      )
}

export default FriendListHeader

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: '#251B37'
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 30
    },
    userContainer: {
      flexDirection: 'row'
    }
})