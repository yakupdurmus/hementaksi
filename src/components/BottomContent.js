import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { color } from '../helper';
import { BasicIcon, BasicButton, BasicText, BasicLoader, MapButtons } from './index'

export const BottomContent = ({ mapRef }) => {

    const [selection, setSelection] = useState({
        callType: 0,
        driverType: 0
    })

    const buttons = [
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
                label: "En Hızlısı"
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
                label: "En Hızlısı"
            }
        ]
    ]
    const onPressButton = (key, id) => {
        selection[key] = id
        setSelection({ ...selection })
    }

    const activeStyle = { borderWidth: 1, borderColor: color.border2 }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content} >
                <View style={{ flex: 1 }}>
                    {buttons.map((rowItem, rowIndex) => (
                        <View key={"row-" + rowIndex} style={styles.row}>
                            {rowItem.map((item, index) => (
                                <TouchableOpacity
                                    onPress={() => onPressButton(item.key, item.id)}
                                    key={index + "-" + item.type}
                                    activeOpacity={.75}
                                    style={[styles.button, (selection[item.key] == item.id) ? activeStyle : {}]}>
                                    <Image
                                        resizeMode="contain"
                                        source={item.image}
                                        style={styles.imageStyle} />
                                    <BasicText style={styles.textStyle}>{item.label}</BasicText>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </View>
                <MapButtons mapRef={mapRef} />
            </View >
            <BasicButton orange style={{height:50}} textStyle={{ fontWeight: 'bold' }} >Hemen Taksi Gönder</BasicButton>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

    container: {
        height: 240, backgroundColor: '#fff'
    },

    content: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 16,
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    button: {
        margin: 5,
        padding: 5,
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.border1,
    },
    imageStyle: {
        width: "100%",
        height: 30,
    },
    textStyle: {
        textAlign: 'center',
    }
})