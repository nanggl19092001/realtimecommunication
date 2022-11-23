import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native'
import React, {useCallback, useState} from 'react'
import DocumentPicker from 'react-native-document-picker'
import { SERVER_IP } from '../constaint'

const TextBar = ({user, friend}) => {
    const [ file, setFile ] = useState([])
    const [ text, setText ] = useState("")
    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'formSheet'
            })

            setFile(response)
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
      if(res.status == 200)
        setText("")
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
      <TouchableHighlight
      style={styles.FileInput}
      onPress={handleDocumentSelection}
      Text={file}
      >
        <Text>File</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.SendTextBut}
        onPress={handleSendText}
        Text={file}
      >
        <Text style={{color: 'white'}}>Send</Text>
      </TouchableHighlight>
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
      alignItems: 'center'
    }
})