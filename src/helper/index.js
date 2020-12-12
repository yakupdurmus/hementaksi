import AsyncStorage from '@react-native-async-storage/async-storage';


//#region CONSTANTS
export const KEY_WORDCOUNT = "wordcount";
//#endregion


//#region  AsyncStorage
export const setStoreValue = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
        return true
    } catch (e) {
        return false
    }
}

export const setStoreObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        return true
    } catch (e) {
        return false
    }
}

export const getStoreValue = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    } catch (e) {
        return false
    }
}
//#endregion

export const wordCountRegex = (str) => {
    let re = /^(?:[23456789]|1[012345]?)$/;
    return re.test(str);
}

//Basic Store
let user
export const getUser = () => user
export const setUser = (_user) => user = { ...user, ..._user }