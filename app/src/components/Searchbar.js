import { View, Text, TextInput, StyleSheet, TouchableHighlight } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SERVER_IP } from '../constaint'

const Searchbar = ({navigation, user}) => {
  const [ searchText, setSearchText ] = useState("")
  const [ searchResult, setSearchResult] = useState([])

  const handleSearchText = (text) => {
    setSearchText(text)
  }

  const handleProfile = (id) => {
    navigation.navigate('Profile', {id: id, user: user})
  }

  useEffect(() => {

    if(searchText) {
      
      fetch(`${SERVER_IP}/user/searchuser/${searchText}`)
      .then(res => res.json())
      .then(res => {
        setSearchResult(res)
      })
    }
    else {
      setSearchResult([])
    }
  }, [searchText])

  return (
    <>
      <View style={style.container}>
        <TextInput 
        style={style.searchInput} 
        placeholder="Find friends with email, password"
        onChangeText={(text) => handleSearchText(text)}/>
        {
          searchResult ?
          searchResult.map((result) => 

              
                <TouchableHighlight
                  onPress={() => handleProfile(result._id)}
                  key={result._id}>
                  <View style={style.userProfile}>
                    <Text style={style.name} >
                      {result.firstName + " " + result.lastName}
                    </Text>
                  </View>
                </TouchableHighlight>
              
            
          )
          :
          <></>
        }
      </View>
    </>
  )
}

export default Searchbar

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 10
  },
  searchInput: {
    paddingLeft: 10,
    backgroundColor: '#9F91B4',
    borderRadius: 5
  },
  dropdown: {
    position: 'absolute'
  },
  name: {
    color: 'black'
  },
  userProfile:
  {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: "#B2A7C3",
    padding: 10
  }
})