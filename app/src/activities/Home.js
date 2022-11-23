import { StyleSheet, View, Text, SafeAreaView, ToastAndroid, ScrollView} from 'react-native'
import { useEffect, useState } from 'react'

import React from 'react'
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'
import Buttons from '../components/Buttons'
import Friends from '../components/Friends'
import Contact from '../components/Contact'

import socket from '../utils/socket'
import { SERVER_IP } from '../constaint'

const Home = ({navigation, route}) => {


  ToastAndroid.showWithGravity(route.params._id, ToastAndroid.SHORT, ToastAndroid.CENTER)

  return (
    <View style={style.container}>
        <SafeAreaView style={{height: '100%'}}>
            <Header navigation={navigation} user={route.params._id}/>
            <Searchbar/>
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