import { View, Text, SafeAreaView, StyleSheet, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'

import {useFocusEffect} from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {SERVER_IP} from '../constaint'
import storeLoggedIn from '../utils/storeLoggedIn'
import getLoggedIn from '../utils/getLoggedIn'
import Ionicons from 'react-native-vector-icons/Ionicons'

const chatIcon = <Ionicons name="chatbubbles" size={70} color={"white"}></Ionicons>

const chatIconForm = <Ionicons name="chatbubbles" size={120} color={"white"}></Ionicons>

const Login = ({navigation}) => {

    const [error, setError] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [resolvedLoggedIn, setResolvedLoggedIn] = useState(false)
    
    useFocusEffect(
        useCallback(() => {
            const log = async () => {
                const loggedIn = await getLoggedIn(navigation)
                if(loggedIn != true)
                    navigation.navigate('Tab Activities', {
                        screen: 'Home',
                        params: {_id: loggedIn}
                })
                else
                    setResolvedLoggedIn(!resolvedLoggedIn)
            }
            log()
        },[])
    )
    

    const handleLogin = () => {
        if(!email || !password){
            setError('Email or Password is missing')
            return
        }

        if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
            setError('Invalid email')
            return
        }

        fetch(`${SERVER_IP}/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(res => res.json())
        .then(res => {
            if(res.status === 200) {
                storeLoggedIn(navigation, res._id)
            }
            else {
                ToastAndroid.showWithGravity(res.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
            }
        })
    }

    const handleRegister = () => {
        navigation.navigate("Register")
    }

  return (
    <>
    { 
    resolvedLoggedIn ?
        <View style={style.container}>
            <SafeAreaView style={{height: '100%'}}>       
                <View style={style.label}>
                    {chatIconForm}
                    <Text style={{color: 'white'}}>Chat app</Text>
                </View>
                <View style={style.content}>
                    <TextInput 
                        onFocus={() => setError(null)}
                        style={style.input} 
                        value={email} 
                        placeholder="Email"
                        onChangeText={(Email) => setEmail(Email)}
                    ></TextInput>
                    <TextInput
                        onFocus={() => setError(null)}
                        style={style.input} 
                        value={password} 
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText = {(pwd) => setPassword(pwd)}
                    ></TextInput>
                    <TouchableOpacity 
                        style={style.button}
                        onPress={handleLogin}
                    >
                        <Text style={{
                            color: 'white',
                            fontSize: 15
                        }}>
                            Login
                        </Text>
                    </TouchableOpacity>
                    <Text style={style.text}
                    onPress={handleRegister}>
                        Dont have a account? Register here
                    </Text>
                    {
                            error && 
                            <View style={style.errorContainer}>
                                <Text style={style.error}>{error}</Text>
                            </View>
                    }
                </View>
                
            </SafeAreaView>
        </View>
        :
        <View style={style.loadingScreen}>
            {chatIcon}
            <Text style={style.loadingText}>Nguyen Huu Nang</Text>
            <Text style={style.loadingText}>51900764</Text>
        </View>
    }
    
    </>
  )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#251B37'
    },
    label: {
        alignSelf: 'center',
        justifyContent:'center',
        flex: 4,
    },
    input: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 3,
        paddingLeft: 10,
        backgroundColor: 'white'
    },
    content: {
        flex: 6
    },
    button: {
        height: 60,
        marginTop: 20,
        padding: 10,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4649FF',
        borderRadius: 5
    },
    text: {
        alignSelf: 'center',
        marginTop: 20,
        color: 'white'
    },
    loadingScreen: {
        width: '100%',
        height: '100%',
        backgroundColor: '#251B37',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'white',
        fontSize: 40
    },
    errorContainer: {
        borderColor: 'rgba(255,0,0,0.4)',
        padding: 10,
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: 'rgba(255,0,0,0.2)',
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center'
    },
    error: {
        color: "white"
    }
})

export default Login