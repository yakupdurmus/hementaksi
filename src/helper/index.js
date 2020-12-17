import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info'
import { Dimensions } from 'react-native'

//#region CONSTANTS
export const KEY_CONST = "temp";
export const color = {
    yellow: "#f3b743",
    black: "#000000",
    orange: "#EE5622",
    gray1: "#221E22",
    gray2: "#31263E",
    gray3: "#44355B",
    white: "#fff",
    smoke: "#f7f7f7",
    border1:"#eee",
    border2:"#333",
}
export const screenWidth = Dimensions.get('screen').width;
export const screenHeight = Dimensions.get('screen').height;

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

export const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Basic Store
let user
export const getUser = () => user
export const setUser = (_user) => user = { ...user, ..._user }
export const appVersion = DeviceInfo.getVersion()