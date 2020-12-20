import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { color } from '../helper';
import { BasicInput } from './Basic/BasicInput';
import { BasicIcon, BasicButton, BasicText, BasicLoader, MapButtons } from './index'

export const BottomContent = ({ mapRef, navigation }) => {

    const [selection, setSelection] = useState({
        callType: 2,
        driverType: 2
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
    const onPressButton = (key, id) => {
        selection[key] = id
        setSelection({ ...selection })
    }

    const onPressGetTaxi = () => {

    }

    const onPressSearch = () => {
        navigation.navigate('SelectLocation');
    }


    const activeStyle = { borderWidth: 1, borderColor: color.border2 }
    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity
                onPress={onPressSearch}
                activeOpacity={.75}
                style={styles.searchInput}>
                <BasicIcon type="EvilIcons" name="search" />
                <BasicText style={{ color: color.placeholder }}>Nereye Gitmek İstiyorsun ?</BasicText>
            </TouchableOpacity>

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

            <BasicButton
                onPress={onPressGetTaxi}
                orange
                style={{ height: 50 }}
                textStyle={{ fontWeight: 'bold' }}
            >Hemen Taksi Gönder</BasicButton>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

    container: {
        height: 280,
        backgroundColor: '#fff'
    },
    searchInput: {
        marginHorizontal: 30,
        borderBottomWidth: 1,
        borderColor: color.placeholder,
        paddingVertical: 5,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center'
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
        marginTop: -4,
    },
    textStyle: {
        textAlign: 'center',
        marginTop: -4,
        backgroundColor: color.white
    },
})