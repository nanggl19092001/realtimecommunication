import { StyleSheet, Text, View, Linking, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'
import Ionicons from 'react-native-vector-icons/Ionicons'

const personIcon = <Ionicons name='person-add' size={25} color="white"></Ionicons>
const removePersonIcon = <Ionicons name='person-remove' size={25} color="white"></Ionicons>
const mailIcon = <Ionicons name="mail" color="white" size={25}/>
const giftIcon = <Ionicons name="gift-sharp" color="white" size={25}/>


const Profile = ({navigation, route}) => {

  const { id, user } = route.params

  const [ refresh, setRefresh ] = useState(false)
  const [ loading, setLoading ] = useState(true)
  const [ isFriend, setIsFriend ] = useState(false)
  const [ profile, setProfile ] = useState(null)
  const [ pendingFriendRequest, setPendingFriendRequest ] = useState(false)

  useEffect(() => {
    fetch(`${SERVER_IP}/user/profileinfo?userProfile=${id}&user=${user}`)
    .then(res => res.json())
    .then(res => {
      setLoading(false)
      setProfile(res.results.profile)
      setIsFriend(res.results.isFriend)
      setPendingFriendRequest(res.results.pendingRequest)
    })
  }, [refresh])

  const handleAddFriend = () => {
    fetch(`${SERVER_IP}/user/friendrequest`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        friend: id
      })
    }).then(res => res.json())
    .then(res => {
      if(res.status == 200)
        setRefresh(!refresh)
    })
  }

  const handleUnfriend = () => {
    fetch(`${SERVER_IP}/user/friend`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: user,
        friend: id
      })
    }).then(res => res.json())
    .then(res => {
      if(res.status == 200)
        setRefresh(!refresh)
    })
  }

  handleMailActive = () => {
    Linking.openURL('mailto:support@example.com?subject=SendMail&body=Description')
  }

  return (
    <View style={styles.container}>
        {
          loading ? 
          <ActivityIndicator size={'large'}/> :
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar}
            source={{uri: `${SERVER_IP}/public/avatar/${id}.jpg?${Date()}`}}>
            </Image>
          </View>
        }
        {
          loading ? <></> :
            pendingFriendRequest ? 
            <TouchableOpacity
            disabled={true}
            onPress={handleUnfriend}
            style={styles.buttonPending}
            >
              <Text>...</Text>
            </TouchableOpacity>:
            isFriend ?
            <TouchableOpacity
            onPress={handleUnfriend}
            style={styles.button}
            >
              {removePersonIcon}
            </TouchableOpacity> : 
            <TouchableOpacity
            onPress={handleAddFriend}
            style={styles.button}
            >
              {personIcon}
            </TouchableOpacity>
          
        }
        {
          profile ? 
          <View>
            <Text style={styles.name}>{`${profile.lastName} ${profile.firstName}`}</Text>
            <View style={{
              padding: 30,
              marginTop: 30
            }}>
              <Text style={styles.sectionText}>
                {`About ${profile.lastName}`}
              </Text>
              <View style={styles.infoContainer}>
                {mailIcon}
                <Text
                onPress={handleMailActive} 
                style={styles.text}>
                  {`${profile.email}`}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                {giftIcon}
                <Text style={styles.text}>{`${profile.birthday.split('T')[0]}`}</Text>
              </View>
              <Text style={styles.text}>

              </Text>
              <Text style={styles.text}>

              </Text>
            </View>
          </View> : 
          <></>
        }
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#251B37',
    width: '100%',
    height: '100%'
  },
  avatar: {
    backgroundColor: 'white',
    width: 100,
    height: 100,
    borderRadius: 100
  },
  avatarContainer: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: 'white',
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20
  },
  sectionText: {
    color: 'rgba(255,255,255, 0.6)'
  },
  text: {
    color: 'white',
    paddingLeft: 20
  },
  button: {
    backgroundColor: '#1778F2',
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  buttonPending: {
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20
  },
  infoContainer: {
    flexDirection: 'row',
    padding: 20
  }
})