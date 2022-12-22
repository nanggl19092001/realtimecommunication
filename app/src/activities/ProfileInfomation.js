import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity, ToastAndroid, Keyboard } from 'react-native'
import React, { useEffect, useState, useReducer } from 'react'
import { SERVER_IP } from '../constaint'
import AntDesign from 'react-native-vector-icons/AntDesign'

const EditIcon = <AntDesign name="edit" size={20} color={'white'}/>
const MailIcon = <AntDesign name="mail" size={20} color={'white'}/>
const PhoneIcon = <AntDesign name="phone" size={20} color={'white'}/>

const reducer = (state, action) => {
  let temp = {...state}

  switch (action.type){
    case "SET":
      return action.value
    case "CHANGE_FIRST_NAME":
      temp.firstName = action.value
      return temp
    case "CHANGE_LAST_NAME":
      temp.lastName = action.value
      return temp
    case "CHANGE_BIRTHDAY":
      temp.birthday = action.value
      return temp
    default:
      return state
  }
}

const ProfileInfomation = ({navigation, route}) => {

  const [ info, dispatch ] = useReducer(reducer, null)
  const [ focus, setFocus ] = useState(null)

  useEffect(() => {
    fetch(`${SERVER_IP}/user/profile/${route.params.user}`)
    .then(res => res.json())
    .then(res => {
      dispatch({type: "SET", value: res[0]})
    })
  }, [])

  const handleChangeFirstName = (value) => {
    dispatch({type: "CHANGE_FIRST_NAME", value: value})
  }

  const handleChangeLastName = (value) => {
    dispatch({type: "CHANGE_LAST_NAME", value: value})
  }

  const submitChange = () => {
    fetch(`${SERVER_IP}/user/profile/${route.params.user}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(
        {firstName: info.firstName, lastName: info.lastName, birthday: info.birthday}
      )
    }).then(res => res.json())
    .then(res => {
      if(res.status == 200){
        ToastAndroid.show("Infomation updated", ToastAndroid.SHORT)
        Keyboard.dismiss()
      }
    })
  }

  return (
    <View style={styles.container}>
      {
        info ?
        <View style={styles.infoContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Name</Text>
            <View style={styles.option}>
              <Text style={styles.text}>First name: </Text>
              <TextInput
              onChangeText={handleChangeFirstName}
              style={styles.text}
              value={info.firstName}/>
              <TouchableOpacity
              onPress={submitChange}>
                {EditIcon}
              </TouchableOpacity>
            </View>
            <View style={styles.option}>
              <Text style={styles.text}>Last name: </Text>
              <TextInput
              onChangeText={handleChangeLastName}
              style={styles.text}
              value={info.lastName}/>
              <TouchableOpacity
              onPress={submitChange}>
                {EditIcon}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionText}>Contact</Text>
            <View style={{height: 20}}></View>
            <View style={styles.option}>
              {MailIcon}
              <Text style={styles.text}>Email: {info.email}</Text>
            </View>
            <View style={{height: 20}}></View>
            <View style={styles.option}>
              {PhoneIcon}
              <Text style={styles.text}>Phone number: {info.phoneNumber}</Text>
            </View>
          </View>
        </View> :
        <ActivityIndicator
        size={100}
        style={{width: 100, height: 100, marginTop: 100, alignSelf: 'center'}}></ActivityIndicator>
      }
    </View>
  )
}

export default ProfileInfomation

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#251B37',
    width: '100%',
    height: '100%',
    padding: 30
  },
  infoContainer: {

  },
  section: {

  },
  sectionText: {
    color: 'white'
  },
  option: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center'
  },
  text: {
    color: 'white'
  }

})