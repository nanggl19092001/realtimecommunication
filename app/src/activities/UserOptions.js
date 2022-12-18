import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native'
import logout from '../utils/logout'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const ImageIcon = <Entypo name='image' size={25} color={"white"}/>
const infoIcon = <Ionicons name='information' size={25} color={"white"}/>
const lockIcon = <MaterialComunityIcon name='key-change' size={25} color={"white"}/>
const LogoutIcon = <MaterialComunityIcon name='logout' size={25} color={"white"}/>

const UserOptions = ({navigation, route}) => {

  const [ user, setUser ] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      phonenumber: ''
    }
  )

  const handleProfileInfo = () => {
    navigation.navigate('Profile Infomation', {user: route.params.user})
  }

  const handleChangePassword = () => {
    navigation.navigate('Change Password', {user: route.params.user})
  }

  const handleLogout = async () => {
    const result = await logout(navigation)
  }

    useEffect(() => {
      fetch(`${SERVER_IP}/user/profile/${route.params.user}`)
      .then(res => res.json())
      .then(res => {
          setUser(
            {
              firstName: res[0].firstName,
              lastName: res[0].lastName,
              email: res[0].email,
              phonenumber: res[0].phonenumber
            }
          )
      })
    }, [])

  return (
    <ScrollView>
    <View style={styles.container}>
      <View>
        <Image 
        style={styles.avatar}
        source={{uri: `${SERVER_IP}/public/avatar/${route.params.user}.jpg`}}
        ></Image>
        <Text style = {styles.username}>
          {`${user.firstName} ${user.lastName}`}
        </Text>
      </View>
      
      <View style={styles.profileOptions}>
        <Text style={styles.text}>
          Profile
        </Text>
        <TouchableHighlight 
          style={styles.options}
          onPress={()=>{}}
          >
            <View style={styles.optionContainer}>
              <View style={styles.imageIcon}>
                {ImageIcon}
              </View>
              <Text style={styles.optionsText}>Change avatar</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.options}
          onPress={handleProfileInfo}>
          <View style={styles.optionContainer}>
            <View style={styles.infoImage}>
              {infoIcon}
            </View>
            <Text style={styles.optionsText}>Profile infomation</Text>
          </View>
        </TouchableHighlight>
        
      </View>
      <View style={styles.accountOptions}>
        <Text style={styles.text}>
          Account
        </Text>
        <TouchableHighlight 
          style={styles.options}
          onPress={() => handleChangePassword()}>
            <View style={styles.optionContainer}>
              <View style={styles.changePassImage}>
                {lockIcon}
              </View>
              <Text style={styles.optionsText}>Change password</Text>
            </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.options}>
            <View style={styles.optionContainer}>
              <View style={styles.changePassImage}>
                {LogoutIcon}
              </View>
              <Text style={styles.optionsText}
              onPress={() => handleLogout()}>Log out</Text>
            </View>
        </TouchableHighlight>
        
      </View>
    </View>
    </ScrollView>
  )
}

export default UserOptions

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#251B37',
    height: '100%',
    padding: 20,
    paddingTop: 40
  },
  avatar: {
    alignSelf: 'center',
    width: 125,
    height: 125,
    borderRadius: 300,
    marginBottom: 20
  },
  accountOptions: {
    padding: 20
  },
  profileOptions: {
    padding: 20
  },
  options: {
    borderRadius: 20,
    padding: 10,
    paddingVertical: 20,
    marginLeft: 10,
  },
  optionsText: {
    color: 'white',
    fontSize: 15
  },
  text: {
    color: 'white'
  },
  username: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageIcon: {
    marginRight: 10,
    backgroundColor: '#227C70',
    padding: 10,
    borderRadius: 30
  },
  infoImage: {
    marginRight: 10,
    backgroundColor: '#4B56D2',
    padding: 10,
    borderRadius: 30
  },
  changePassImage: {
    padding: 10,
    backgroundColor: '#678983',
    borderRadius: 50,
    marginRight: 10
  }
})