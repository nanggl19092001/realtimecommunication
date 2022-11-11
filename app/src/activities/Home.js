import { StyleSheet, View, SafeAreaView, ToastAndroid, Pressable, FlatList } from 'react-native'
import { useEffect } from 'react'

import React from 'react'
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'
import Buttons from '../components/Buttons'
import Friends from '../components/Friends'
import Contact from '../components/Contact'

import socket from '../utils/socket'

const Home = ({navigation, route}) => {


  useEffect(() => {
    socket.on('join', route.params._id)
  }, [])

  ToastAndroid.showWithGravity(route.params._id, ToastAndroid.SHORT, ToastAndroid.CENTER)

  return (
    <View style={style.container}>
        <SafeAreaView style={{height: '100%'}}>
            <Header/>
            <Searchbar/>
            <Buttons navigation = {navigation}/>
            <Friends/>
            <View>
              
            </View>
        </SafeAreaView>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: '#251B37'
    }
})

export default Home