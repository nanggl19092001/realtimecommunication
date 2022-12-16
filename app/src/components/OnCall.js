import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SERVER_IP } from '../constaint'

const OnCall = ({user, friend}) => {

    useEffect(() => {
        fetch(`${SERVER_IP}`)
    }, [])
  return (
    <View>
      <Text>OnCall</Text>
    </View>
  )
}

export default OnCall

const styles = StyleSheet.create({})