import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BasicButton,MapButtons } from '../index'
import {color} from '../../helper'

export const SelectLocationBottom = ({ mapRef }) => {

    return (
        <View style={styles.bottomContent}>
            <BasicButton
                onPress={() => { }}
                orange
                style={{ height: 50, flex: 1, marginLeft: 5 }}
                textStyle={{ fontWeight: 'bold' }}
            >Tamam</BasicButton>
            <MapButtons buttonStyle={{ height: 50 }} hideMinus hidePlus mapRef={mapRef} />
        </View>
    )
}

const styles = StyleSheet.create({
    bottomContent: {
        position: 'absolute',
        width: '100%',
        height: 70,
        bottom: 0,
        backgroundColor: color.white,
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});