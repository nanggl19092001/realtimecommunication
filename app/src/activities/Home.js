import { StyleSheet, View, Text, SafeAreaView, ToastAndroid, ScrollView} from 'react-native'
import { useCallback, useEffect } from 'react'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'

import React from 'react'
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'
import Buttons from '../components/Buttons'
import Friends from '../components/Friends'
import socketIO from '../utils/socketIO'

const Home = ({navigation, route}) => {

  ToastAndroid.showWithGravity(route.params._id, ToastAndroid.SHORT, ToastAndroid.CENTER)

  useFocusEffect(
    useCallback(() => {
      socketIO.emit('join', route.params._id)
      socketIO.on('receive-call', (friend) => {
        navigation.navigate('Call', {user: route.params._id, friend: friend, receive: true})
      })
    })
  )

  return (
    <View style={style.container}>
        <SafeAreaView style={{height: '100%'}}>
            <Header navigation={navigation} user={route.params._id}/>
            <Searchbar navigation={navigation} user={route.params._id}/>
            <ScrollView style={style.textContainer}>
              <Buttons navigation = {navigation} user = {route.params._id}/>
              <Friends navigation = {navigation} user={route.params._id}/>
            </ScrollView>
        </SafeAreaView>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#251B37'
    },
    textContainer: {
      marginTop: 20,
    }
})

export default Home