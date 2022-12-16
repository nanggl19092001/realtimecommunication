import { View, Text, TextInput, StyleSheet, TouchableHighlight, Image } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { SERVER_IP } from '../constaint'
import { useFocusEffect } from '@react-navigation/native'

const Searchbar = ({navigation, user}) => {

  const [ searchText, setSearchText ] = useState("")
  const [ searchResult, setSearchResult] = useState([])

  useFocusEffect(
    React.useCallback(() => {
      setSearchText("")
      setSearchResult("")
    }, [])
  )

  const handleSearchText = (text) => {
    setSearchText(text)
  }

  const handleProfile = (id) => {
    if(id == user){
      return navigation.navigate('UserOptions', {user: user})
    }
    else{
      return navigation.navigate('Profile', {id: id, user: user})
    }
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
                    <Image
                    style={style.avatar}
                    source={{uri: `${SERVER_IP}/public/avatar/${result._id}.jpg`}}/>
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
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40
  }
  ,
  searchInput: {
    paddingLeft: 10,
    backgroundColor: '#9F91B4',
    borderRadius: 5
  },
  dropdown: {
    position: 'absolute'
  },
  name: {
    color: 'black',
    marginLeft: 20
  },
  userProfile:
  {
    flexDirection: 'row',
    borderRadius: 5,
    backgroundColor: "#B2A7C3",
    padding: 10
  }
})