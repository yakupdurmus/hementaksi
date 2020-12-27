import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info'
import React from 'react'
import { Dimensions, Platform, View, Linking, Alert } from 'react-native'

import Geolocation from 'react-native-geolocation-service'
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import { showMessage as _showMessage, hideMessage as _hideMessage } from 'react-native-flash-message'
import { Icon } from 'native-base';
import { BasicLoader } from '../components';


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

export const appVersion = DeviceInfo.getVersion()

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
    border1: "#eee",
    border2: "#333",
    border3: "#ddd",
    placeholder: '#aaa',
}
export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

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

//#region MAPS

const isAndroid = Platform.OS == "android"
export const onPermission = async () => {
    const perText = isAndroid ? PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION : PERMISSIONS.IOS.LOCATION_ALWAYS
    try {
        const locationAccess = await request(perText)
        console.log("onPermission :", locationAccess);
        return locationAccess

    } catch (err) {
        alert(err.message)
        console.log("onPermission ERR :", err);
        return false
    }
}

export const goLocation = async (map, reRequest = 0) => {

    Geolocation.getCurrentPosition(
        ({ coords }) => {
            if (map) {

                map?.current?.animateToRegion({
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.0074150770677476885,
                    longitudeDelta: 0.004999999999967031
                })
            }
        },
        (error) => {
            console.log("ERROR :", error);
            if (error.code == error.PERMISSION_DENIED) {
                alert("Lokasyon bilgisi alınamadı. Ayarlar kısmından lokasyona izin verin");
            }
            else if (error.code == error.POSITION_UNAVAILABLE) {
                alert("Lokasyon bilgisi mevcut değil.");
            }
            else if (error.code == error.TIMEOUT) {
                if (reRequest > 4) {
                    alert("Lokasyon bilgisine ulaşılamadı. Tekrar deneyiniz.");
                    return
                }
                setTimeout(() => {
                    onLocation(map, reRequest + 1)
                }, 1000)
            }
        },
        { enableHighAccuracy: true }
    )
}

export const onLocation = (callback, reRequest = 0) => {

    console.log("onLocation : init")
    Geolocation.getCurrentPosition(

        ({ coords }) => {
            console.log("onLocation : ", coords)
            callback && callback(coords)
        },
        (error) => {
            console.log("onLocation ERROR :", error);
            if (error.code == 1) { // daha bir izin isteği verilmemişse
                onPermission().then(response => {
                    //true de olsa false de olsa
                    if (response == RESULTS.BLOCKED && isAndroid) {
                        Alert.alert(
                            'Lokasyon',
                            'Kullanım için lokasyon erişimine izin vermelisin.',
                            [
                                {
                                    text: 'İzin ver',
                                    onPress: () => {
                                        Linking.openSettings();
                                    }
                                },
                                {
                                    text: 'Vazgeç',
                                    onPress: () => console.log('Cancel Pressed'),
                                    style: 'cancel'
                                }
                            ],
                            { cancelable: false }
                        );
                        //Linking.openURL('app-settings:');
                        return;
                    } else if (response == RESULTS.BLOCKED && !isAndroid) {
                        if (reRequest > 2) {
                            Alert.alert(
                                'Lokasyon',
                                'Kullanım için lokasyon erişimine izin vermelisin.',
                                [
                                    {
                                        text: 'İzin ver',
                                        onPress: () => {
                                            Linking.openSettings();
                                        }
                                    },
                                    {
                                        text: 'Vazgeç',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel'
                                    }
                                ],
                                { cancelable: false }
                            );
                            return;
                        } else {
                            setTimeout(() => {
                                onLocation(callback, reRequest + 1)
                            }, 500)
                        }
                    }
                    setTimeout(() => {
                        onLocation(callback, reRequest)
                    }, 1000)
                })
            }
            else if (error.code == error.PERMISSION_DENIED) {
                alert("Lokasyon bilgisi alınamadı. Ayarlar kısmından lokasyona izin verin");
            }
            else if (error.code == error.POSITION_UNAVAILABLE) {
                alert("Lokasyon bilgisi mevcut değil.");
            }
            else if (error.code == error.TIMEOUT) { // ilk seferde bazen timeout'a düşüyor.
                if (reRequest > 4) {
                    alert("Lokasyon bilgisine ulaşılamadı. Tekrar deneyiniz.");
                    return
                }
                setTimeout(() => {
                    onLocation(callback, reRequest + 1)
                }, 1000)
            } else if (error.code == 5) { //google isteği hayır dediğinde
                setTimeout(() => {
                    onLocation(callback, reRequest)
                }, 1000)
            }
        },
        { enableHighAccuracy: true }
    )

    console.log("onLocation : ended")
}

const zoomDelta = 0.005;
export const onZoom = (zoomSign, map) => {
    if (!map || !map.current) return;
    const region = map.current.__lastRegion
    const zoomedRegion = {
        latitude: region.latitude,
        longitude: region.longitude,
        latitudeDelta: region.latitudeDelta - zoomDelta * zoomSign,
        longitudeDelta: region.longitudeDelta - zoomDelta * zoomSign,
    };
    map.current?.animateToRegion(zoomedRegion);
    return zoomedRegion
    //setRegion(zoomedRegion);
};

//#endregion

//#region  FLASH MESSAGE
export const showMessage = (props) => {
    _showMessage({
        type: "success",
        message: "Başarılı",
        floating: true,
        style: { marginTop: 30 },
        renderFlashMessageIcon: () => <Icon name="person" />,
        ...props
    });
}
export const showFullMessage = (props) => {
    _showMessage({
        message: null,
        type: "info",
        position: 'top',
        autoHide: true,
        onPress: () => { },
        hideOnPress: true,
        style: { paddingLeft: 0, marginLeft: 0, paddingBottom: 0, backgroundColor: color.border1 },
        renderCustomContent: () => {
            return <View style={{ width: 500, height: 500, backgroundColor: color.border1 }}></View>
        },
    });
}
export const showLoading = (props) => {
    _showMessage({
        message: null,
        type: "info",
        position: 'top',
        autoHide: false,
        onPress: () => { },
        hideOnPress: true,
        style: { paddingLeft: 0, marginLeft: 0, marginTop: 0, paddingTop: 0, paddingBottom: 0, backgroundColor: 'rgba(0, 0, 0, .5)' },
        renderCustomContent: () => {
            return <View style={{ height: screenHeight, justifyContent: 'center', alignItems: 'center' }}>
                <BasicLoader />
            </View>
        },
    });
}
export const hideMessage = () => _hideMessage()
//#endregion


export const capitalize = (str) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const mockSearchData = [
    { text: "Levent Metro" },
    { text: "Levent Durak" },
    { text: "4.Levent" },
    { text: "Metorcity" },
    { text: "Safit Alışveriş merkezi" },
    { text: "Kanyon Alışveriş merkezi" },
    { text: "Levent Metro" },
    { text: "Levent Durak" },
    { text: "4.Levent" },
    { text: "Metorcity" },
    { text: "Safit Alışveriş merkezi" },
    { text: "Kanyon Alışveriş merkezi" },
    { text: "Levent Metro" },
    { text: "Levent Durak" },
    { text: "4.Levent" },
    { text: "Metorcity" },
    { text: "Safit Alışveriş merkezi" },
    { text: "Kanyon Alışveriş merkezi" },
]

export const homeButtons = [
    [
        {
            key: "callType",
            id: 0,
            image: require('../assets/taxi-256x256.png'),
            label: "Taksi Çağır"
        },
        {
            key: "callType",
            id: 1,
            image: require('../assets/station-256x256.png'),
            label: "Duraktan Taksi Çağır"
        },
        {
            key: "callType",
            id: 2,
            image: require('../assets/pintaxi-256x256.png'),
            label: "Fark Etmez"
        },
    ],
    [
        {
            key: "driverType",
            id: 0,
            image: require('../assets/male-256x256.png'),
            label: "Erkek Sürücü"
        },
        {
            key: "driverType",
            id: 1,
            image: require('../assets/female-256x256.png'),
            label: "Kadın Sürücü"
        },
        {
            key: "driverType",
            id: 2,
            image: require('../assets/pintaxi-256x256.png'),
            label: "Fark Etmez"
        }
    ]
]