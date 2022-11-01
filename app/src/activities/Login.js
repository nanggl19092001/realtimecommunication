import { View, Text, SafeAreaView, StyleSheet, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import {SERVER_ADDRESS} from '../constaint'

const Login = ({navigation}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        fetch(`${SERVER_ADDRESS}/login`, {
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
                navigation.navigate('Home')
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
    }
})

export default Login