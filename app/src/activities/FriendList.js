import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import getLoggedIn from '../utils/getLoggedIn'
import FriendListHeader from '../components/FriendListHeader'
import ListFriend from '../components/ListFriend'
import { useIsFocused } from '@react-navigation/native'

const FriendList = ({navigation, route}) => {

    const [user, setUser] = useState()

    useEffect(() => {
        const logged = async () => {
            const id = await getLoggedIn()
            setUser(id)
        }
        logged()
    }, [])

  return (
    <View>
      <FriendListHeader navigation={navigation} user={user}/>
      <ListFriend navigation={navigation} user={user}/>
    </View>
  )
}

export default FriendList

const styles = StyleSheet.create({})