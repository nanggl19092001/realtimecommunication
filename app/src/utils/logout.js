import AsyncStorage from "@react-native-async-storage/async-storage";

async function logout(navigation) {
    const result = await AsyncStorage.removeItem('id')
    navigation.navigate('Login')
}

export default logout