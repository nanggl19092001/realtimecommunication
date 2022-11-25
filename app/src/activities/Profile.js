import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'

const Profile = ({navigation, route}) => {

  const { id, user } = route.params

  const [ loading, setLoading ] = useState(true)
  const [ isFriend, setIsFriend ] = useState(false)
  const [ profile, setProfile ] = useState(null)

  useEffect(() => {
    fetch(`${SERVER_IP}/user/profileinfo?userProfile=${id}&user=${user}`)
    .then(res => res.json())
    .then(res => {
      setLoading(false)
      setProfile(res.results.profile)
      setIsFriend(res.results.isFriend)
    })
  }, [])

  const handleAddFriend = () => {
    
  }

  const handleUnFriend = () => {

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
            isFriend ? 
            <Button
              title='Un Friend'/> : 
            <Button
              title='Add Friend'/>
          
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