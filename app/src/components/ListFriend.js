import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'
import { useFocusEffect } from '@react-navigation/native'

const ListFriend = ({navigation, user}) => {

    const [friends, setFriends] = useState([])

    useFocusEffect( useCallback(() => {
            fetch(`${SERVER_IP}/user/friends/${user}`)
            .then(res => res.json())
            .then(res => {
                setFriends(res)
            })
        }, [user])
    )

    const handleFriendPress = (id) => {
        return navigation.navigate('Profile', {id: id, user: user})
    }

    const renderItem = ({item}) => {
        return <TouchableOpacity
        onPress={() => handleFriendPress(item._id)}
        style={styles.itemContainer}
        >
            <View style={styles.viewContainer}>
                <Image
                style={styles.avatar}
                source={{uri: `${SERVER_IP}/public/avatar/${item._id}.jpg`}}
                ></Image>
                <Text style={styles.name}>
                    {`${item.firstName} ${item.lastName}`}
                </Text>
            </View>
        </TouchableOpacity>
    }

  return (
    <View style={styles.container}>
      {
        friends.length > 0 ? 
        <FlatList
        style={styles.list}
        data={friends}
        renderItem={renderItem}
        keyExtractor = {(item) => item._id}
        ></FlatList>
         :
        <></>
      }
    </View>
  )
}

export default ListFriend

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#251B37'
    },
    list: {
        width: '100%',
        height: '100%'
    },
    itemContainer: {
        padding: 20
    },
    viewContainer: {
        flexDirection: 'row'
    },
    name: {
        color: "white",
        fontWeight: "bold"
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 40,
        marginRight: 20
    }
})