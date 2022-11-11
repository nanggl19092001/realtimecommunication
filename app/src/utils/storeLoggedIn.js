import AsyncStore from "@react-native-async-storage/async-storage"
import { Alert } from "react-native";

async function storeLoggedIn(navigation, _id) {
    try{
        await AsyncStore.setItem("id", _id);
        navigation.navigate('Home', {_id: _id})
    }
    catch (e) {
        Alert.alert("Error! localstorage")
    }
}

export default storeLoggedIn