import { StyleSheet, View, SafeAreaView } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Searchbar from '../components/Searchbar'
import Buttons from '../components/Buttons'
import Friends from '../components/Friends'

const Home = ({navigation}) => {

  return (
    <View style={style.container}>
        <SafeAreaView style={{height: '100%'}}>
            <Header/>
            <Searchbar/>
            <Buttons navigation = {navigation}/>
            <Friends/>
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