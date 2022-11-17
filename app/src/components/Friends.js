import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'

const Friends = ({user}) => {

  const [ friends, setFriends ] = useState([])
  
  useEffect(() => {
    fetch(`${SERVER_IP}/user/friends/${user}`)
    .then(res => res.json())
    .then(res => console.log(res))
  })
  return (
    <>
      <View>
        <Text>Friends</Text>
      </View>
    </>
  )
}

export default Friends