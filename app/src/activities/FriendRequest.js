import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SERVER_IP } from '../constaint'
import formatDate from '../utils/formatDate'
import socketIO from '../utils/socketIO'

const FriendRequest = ({navigation, route}) => {

    const [ request, setRequest ] = useState([])
    const [ refresh, setRefresh ] = useState(false)

    useEffect(() => {
        fetch(`${SERVER_IP}/user/friendrequest/${route.params.user}`)
        .then(res => res.json())
        .then(res => {
            setRequest(res)
        })
    }, [refresh])

    useEffect(() => {
        socketIO.emit('join', route.params.user)
        socketIO.on('receive-request', () => {
            setRefresh(!refresh)
        })

        return () => {
            socketIO.removeListener('receive-request')
        }
    })

    const handleAccept = (requestId, sender, receiver) => {
        fetch(`${SERVER_IP}/user/friend`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                requestId: requestId,
                sender: sender,
                receiver: receiver
            })
        }).then(res => res.json())
        .then(res => {
            if(res.status == 200)
                setRefresh(!refresh)
        })
    }

    const handleReject = (requestId) => {
        fetch(`${SERVER_IP}/user/friendrequest`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                requestId: requestId
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
        request.length == 0 ? 
        <View style={styles.noRequest}>
            <Text style={styles.textNoRequest}>
            No friend request found
            </Text>
        </View> : 
        request.map((res, idx) => 
            <View style={styles.requestContainer} key={idx}>
                <Image
                    style={styles.avatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${res.account._id}.jpg`}}/>
                <View style={styles.info}>
                    <Text style={styles.buttonText}>
                        {`${res.account.lastName} ${res.account.firstName}`}
                    </Text>
                    <Text style={{ color: 'white'}}>{formatDate(res.request.sent)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                        style={styles.button}
                        onPress={() => handleAccept(res.request._id, res.request.sender, res.request.receiver)}>
                        <Text style={styles.buttonText}>Accept</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={styles.button}
                        onPress={() => handleReject(res.request._id)}
                        >
                        <Text style={styles.buttonText}>Decline</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
      }
    </View>
  )
}

export default FriendRequest

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: '#251B37'
    },
    noRequest: {
        width: "100%",
        height: "50%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    textNoRequest: {
        color: 'rgba(255,255,255,0.5)'
    },
    requestContainer: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: 'white',
        borderRadius: 40
    },
    button: {
        backgroundColor: '#17A9FD',
        padding: 10,
        borderRadius: 10,
        marginRight: 10
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    info: {
        alignSelf: 'flex-start'
    }
})