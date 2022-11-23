import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import { SERVER_IP } from '../constaint'

const ChangePassword = ({navigation, route}) => {

    const [ password, setPassword ] = useState("")
    const [ oldPassword, setOldPassword ] = useState("")
    const [ newPassword, setNewPassword ] = useState("")
    const [ errorMessage, setErrorMessage ] = useState()

    const handleChangePassword = () => {
        if(!password || !oldPassword || !newPassword)
            return setErrorMessage("Please fill all infomation")

        if(password != newPassword) {
            return setErrorMessage("Your confirm password is not correct")
        }

        fetch(`${SERVER_IP}/user/password/${route.params.user}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                oldPassword: oldPassword,
                newPassword: password
            })
        }).then(res => res.json())
        .then(res => {
            console.log(res)
            if (res.status == 200)
                navigation.goBack()
            else if (res.status == 404){
                setErrorMessage(res.message)
            }
            else {
                setErrorMessage("Something went wrong")
            }
        })
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.input}
                secureTextEntry={true}
                placeholder='Old password'
                value={oldPassword}
                onFocus={() => setErrorMessage("")}
                onChangeText={(value) => setOldPassword(value)}
                >
                </TextInput>
            <TextInput style={styles.input}
            secureTextEntry={true}
                placeholder='New password'
                value={password}
                onFocus={() => setErrorMessage("")}
                onChangeText={(value) => setPassword(value)}
                ></TextInput>
            <TextInput style={styles.input}
                secureTextEntry={true}
                value={newPassword}
                onFocus={() => setErrorMessage("")}
                onChangeText={(value) => setNewPassword(value)}
                placeholder='Confirm new password'
                ></TextInput>
            <Button 
                title='Confirm'
                onPress={() => handleChangePassword()}
                ></Button>
            {
                errorMessage ?
                <View style={styles.errorMessage}>
                    <Text style={styles.errorText}>{errorMessage}</Text>
                </View>
                :
                <></>
            }
            
        </View>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    container: {
        padding: 20,
        width: '100%',
        height: '100%'
    },
    input: {
        borderWidth: 0.2,
        paddingLeft: 10
    },
    errorMessage: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderColor: 'red',
        backgroundColor: 'rgba(255,0,0, 0.3)',
    }

})