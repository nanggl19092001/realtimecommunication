import { StyleSheet, View, SafeAreaView, ToastAndroid} from 'react-native'
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
            <Buttons navigation = {navigation}/>
            <Friends user={route.params._id}/>
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