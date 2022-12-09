import { StyleSheet, Text, View } from 'react-native'
import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import getLoggedIn from '../utils/getLoggedIn'
import FriendListHeader from '../components/FriendListHeader'

const FriendList = ({navigation, route}) => {

    const [user, setUser] = useState()

    useEffect(() => {
        const logged = async () => {
            const id = await getLoggedIn()
            setUser(id)
        }
        logged()
    }, [])

    
    console.log(user)
  return (
    <View>
      <FriendListHeader navigation={navigation} user={user}/>
    </View>
  )
}

export default FriendList

const styles = StyleSheet.create({})