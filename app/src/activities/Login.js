import { View, Text, SafeAreaView, StyleSheet, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'
import {SERVER_IP} from '../constaint'
import storeLoggedIn from '../utils/storeLoggedIn'
import getLoggedIn from '../utils/getLoggedIn'
import UserContext from '../utils/Context/UserContext'

const Login = ({navigation}) => {

    const isFocused = useIsFocused()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [resolvedLoggedIn, setResolvedLoggedIn] = useState(false)

    useEffect(() => {
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
    }, [])
    

    const handleLogin = () => {
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
                    <Text>Login</Text>
                </View>
                <View style={style.content}>
                    <TextInput 
                        style={style.input} 
                        value={email} 
                        placeholder="Email"
                        onChangeText={(Email) => setEmail(Email)}
                    ></TextInput>
                    <TextInput 
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
                </View>
            </SafeAreaView>
        </View>
        :
        <View style={style.loadingScreen}>
            <Text style={style.loadingText}>Text</Text>
        </View>
    }
    </>
  )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 10
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
        paddingLeft: 10
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
        marginTop: 20
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
    }
})

export default Login