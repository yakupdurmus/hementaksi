import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BasicIcon, BasicButton } from './index'
import { color, onZoom, goLocation } from '../helper'

let map
const onZoomIn = () => onZoom(1, map)
const onZoomOut = () => onZoom(-1, map)
const goLocationAnimated = () => {
    goLocation(map)
}

export const MapButtons = ({ mapRef, hideMinus, hidePlus, buttonStyle }) => {
    map = mapRef
    return (
        <View style={styles.buttonContainer}>
            <BasicButton onPress={goLocationAnimated} style={[styles.button, buttonStyle]}>
                <BasicIcon style={styles.icon} name="location-pin" type="SimpleLineIcons" />
            </BasicButton>
            {!hidePlus && <BasicButton onPress={onZoomIn} style={[styles.button, buttonStyle]}>
                <BasicIcon style={styles.icon} name="plus" type="SimpleLineIcons" />
            </BasicButton>}
            {!hideMinus && <BasicButton onPress={onZoomOut} style={[styles.button, buttonStyle]}>
                <BasicIcon style={styles.icon} name="minus" type="SimpleLineIcons" />
            </BasicButton>}
            <View style={{ flexDirection: 'row' }}>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {

    },
    button: {
        padding: 8,
        margin: 5,
        backgroundColor: color.orange,
        alignSelf: 'flex-end',
        borderRadius: 5,
    },
    icon: {
        fontSize: 22,
        flex: 1,
        color: color.white,
    },
});