import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'

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

  return (
    <View style={styles.container}>
        {
          loading ? 
          <ActivityIndicator size={'large'}/> :
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar}
            source={{uri: `${SERVER_IP}/public/avatar/${id}.jpg`}}>
            </Image>
          </View>
        }
        {
          loading ? <></> :
            pendingFriendRequest ? 
            <Button 
            style={styles.button}
            title='Pending'
            disabled={true}>
            </Button>:
            isFriend ? 
            <Button
            style={styles.button}
              title='Un Friend'
              onPress={handleUnfriend}/> : 
            <Button
            style={styles.button}
              title='Add Friend'
              onPress={handleAddFriend}/>
          
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
              <Text style={styles.text}>
                {`${profile.email}`}
                {`${profile.birthday}`}
              </Text>
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
  }
})