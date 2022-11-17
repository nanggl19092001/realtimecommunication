import AsyncStore from "@react-native-async-storage/async-storage"
import { Alert } from "react-native";

async function getLoggedIn(navigation) {
    try{
        const value = await AsyncStore.getItem("id");
        if(value)
            return value
        else
            return true
    }
    catch (e) {
        Alert.alert("Error! localstorage")
    }
}

export default getLoggedIn