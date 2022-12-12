import { StyleSheet, Text, View, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native'
import React, {useCallback, useContext, useEffect, useState} from 'react'
import DocumentPicker from 'react-native-document-picker'
import { SERVER_IP } from '../constaint'
import MessageContext from '../utils/Context/MessageContext'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import socketIO from '../utils/socketIO'

const addFileIcon = <AntDesign name="addfile" size={30} color="white"></AntDesign>

const sendIcon = <Feather name="send" size={30} color="white"></Feather>

const TextBar = ({user, friend}) => {

    const { message, setMessage, refresh, setRefresh } = useContext(MessageContext) 
    const [ text, setText ] = useState("")

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'formSheet'
            })

            if(response[0]){
              const data = new FormData()

              data.append("sender", user)
              data.append("receiver", friend._id)
              data.append("filetype", response[0].type)
              data.append("file",response[0])

              fetch(`${SERVER_IP}/user/filemessage`, {
                method: 'post',
                headers: {
                  'Content-Type': 'multipart/form-data'
                },
                body: data,
              }).then(res => res.json())
              .then(res => {
                if(res.status == 200){
                  setRefresh(!refresh)
                }

              })
            }
        }
        catch (err) {
            console.warn(err)}
    })

  const handleSendText = () => {
    if(!text)
      return

    fetch(`${SERVER_IP}/user/message`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: user,
        receiver: friend._id,
        message: text
      })
    }).then(res => res.json())
    .then(res => {
      if(res.status == 200){
        setText("")
        setMessage([...message, res.results])
      }
    })
  }

  return (
    <View style={styles.TextBarContainer}>
      <TextInput
        style={styles.InputText}
        placeholder={"Enter message"}
        placeholderTextColor="rgba(255,255,255,0.5)"
        value={text}
        onChangeText={(txt) => setText(txt)}
      />
      <TouchableOpacity
      style={styles.FileInput}
      onPress={handleDocumentSelection}
      >
        <View>
          {addFileIcon}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.SendTextBut}
        onPress={handleSendText}
      >
        <View>
          {sendIcon}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default TextBar

const styles = StyleSheet.create({
    TextBarContainer: {
        flex: 1,
        backgroundColor: 'red',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#251B37',
        paddingVertical: 10
    },
    InputText: {
      flex: 3,
      backgroundColor: "#665f73",
      borderRadius: 10,
      marginLeft: 10,
      color: 'rgba(255,255,255,1)',
      paddingHorizontal: 10
    },
    FileInput: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    SendTextBut: {
      flex: 1,
      justifyContent: 'center',
    }
})