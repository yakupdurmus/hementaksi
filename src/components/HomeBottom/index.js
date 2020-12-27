import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { color, homeButtons } from '../../helper';
import { BasicIcon, BasicButton, BasicText, MapButtons } from '../index'
import DestinationButton from './DestinationButton'
import SourceButton from './SourceButton'

export const HomeBottom = ({ mapRef, navigation }) => {

    const [selection, setSelection] = useState({
        callType: 2,
        driverType: 2
    })


    const onPressButton = (key, id) => {
        selection[key] = id
        setSelection({ ...selection })
    }

    const onPressGetTaxi = () => {

    }

    const onPressSearch = (type) => {
        // type  => source|destination
        navigation.navigate('SelectLocation', type);
    }


    const activeStyle = { borderWidth: 1, borderColor: color.border2 }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ height: 5 }} />
            <SourceButton onPressSearch={onPressSearch} />
            <DestinationButton onPressSearch={onPressSearch} />
            <View style={{ height: 5 }} />

            <View style={styles.content} >
                <View style={{ flex: 1 }}>
                    {homeButtons.map((rowItem, rowIndex) => (
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
                style={{ height: 42 }}
                textStyle={{ fontWeight: 'bold' }}
            >Hemen Taksi Gönder</BasicButton>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

    container: {
        height: 275,
        backgroundColor: '#fff'
    },
    content: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
        paddingVertical: 0
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