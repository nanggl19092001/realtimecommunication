import { View, Text, SafeAreaView, StyleSheet, TextInput, ToastAndroid, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const toast = () => {
        ToastAndroid.show(email + " " + password, ToastAndroid.SHORT)
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
                    onPress={toast}
                >
                    <Text style={{
                        color: 'white',
                        fontSize: 15
                    }}>
                        Login
                    </Text>
                </TouchableOpacity>
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
        marginTop: 10,
        padding: 10,
        width: '50%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4649FF',
        borderRadius: 5
    }
})

export default Login