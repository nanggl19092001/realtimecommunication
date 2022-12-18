import { View, Text, TextInput, StyleSheet, Button, TouchableHighlight } from 'react-native'
import { SERVER_IP } from '../constaint'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'

const Register = () => {

  const navigation = useNavigation()

  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ phoneNumber, setPhonenumber] = useState("")

  const [ password, setPassword] = useState("")
  const [ confirmPassword, setConfirmPassword] = useState("")

  const [ date, setDate ] = useState(new Date())
  const [ mode, setMode ] = useState('date')
  const [ show, setShow ] = useState(false)

  const [ error, setError ] = useState(null)

  const onDateChange = (e, selectedDate) => {
    const currDate = selectedDate;
    setShow(false)
    setDate(currDate)
  }

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode)
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const handleSubmit = () => {

    if(!firstName || !lastName || !date || !email || !phoneNumber || !password || !confirmPassword){
      return setError("Please fill out all infomation !")
    }

    if(!/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
      return setError("Invalid email")
    }

    if(password != confirmPassword) {
      return setError("Confirm password is not correct")
    }

    try {
      fetch(`${SERVER_IP}/register`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          birthday: date,
          email: email,
          phonenumber: phoneNumber,
          password: password
        })
      }).then(res => res.json())
      .then(res => {
        if(res.status != 200)
        {
          return setError(res.message)
        }
        navigation.goBack()
      })
      
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <TextInput 
          style={styles.textInput}
          placeholder={"First Name"}
          value={firstName}
          onChangeText = {(input) => setFirstName(input)}/>
        <TextInput 
          style={styles.textInput}
          value={lastName}
          placeholder={"Last Name"}
          onChangeText = {(input) => setLastName(input)}/>
        <TextInput 
          style={styles.textInput}
          value={email}
          placeholder={"Email"}
          onChangeText = {(input) => setEmail(input)}/>
        <TextInput 
            style={styles.textInput}
            value={phoneNumber}
            placeholder={"Phone number"}
            onChangeText = {(input) => setPhonenumber(input)}/>
        <View style={styles.birthday}>
          <Text style = {styles.birthdayText}>Your birth day: {date.toLocaleDateString()}</Text>
          <TouchableHighlight
            style={styles.changeButton}
            onPress={showDatepicker}
          >
            <Text style={styles.changeText}>
              Change
            </Text>
          </TouchableHighlight>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display='default'
              onChange={onDateChange}
            />
          )}
          
        </View>
        <TextInput 
          style={styles.textInput}
          value={password}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText = {(input) => setPassword(input)}/>
        <TextInput 
          style={styles.textInput}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder={"Confirm Password"}
          onChangeText = {(input) => setConfirmPassword(input)}/>
        
      <TouchableHighlight
      style={styles.submitButton}
      onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableHighlight>
      { error &&
      <View style={styles.error}>
        <Text style={styles.errorText}>
          {error}
        </Text>
      </View> }
      
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
  ,
  textInput: {
    width: '100%',
    height: 40,
    borderColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0.5,
    marginTop: 20,
    padding: 10
  },
  birthday: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  changeButton: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 10
  },
  changeText: {
    color: 'white',
    fontWeight: 'bold'
  },
  birthdayText: {
    fontWeight: 'bold',
    fontSize: 16
  },
  error: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderColor: 'red',
    backgroundColor: 'rgba(255,0,0, 0.3)',
  },
  submitButton: {
    alignSelf: 'center',
    padding: 20,
    marginTop: 20,
    backgroundColor: 'blue',
    borderRadius: 10
  },
  submitText: {
    color: 'white'
  }
})
export default Register

