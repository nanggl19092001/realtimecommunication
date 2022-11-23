import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import logout from '../utils/logout'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'

const UserOptions = ({navigation, route}) => {

  const [ user, setUser ] = useState(
    {
      firstName: '',
      lastName: '',
      email: '',
      phonenumber: ''
    }
  )

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
          <Text style={styles.optionsText}>Change avatar</Text>
        </TouchableHighlight>
        <TouchableHighlight 
          style={styles.options}
          onPress={()=>{}}>
          <Text style={styles.optionsText}>Profile infomation</Text>
        </TouchableHighlight>
        
      </View>
      <View style={styles.accountOptions}>
        <Text style={styles.text}>
          Account
        </Text>
        <TouchableHighlight 
          style={styles.options}
          onPress={() => handleChangePassword()}>
          <Text style={styles.optionsText}>Change password</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.options}>
          <Text style={styles.optionsText}
        onPress={() => handleLogout()}>Log out</Text>
        </TouchableHighlight>
        
      </View>
    </View>
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
  }
})