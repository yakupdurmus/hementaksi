
import React from 'react'
import { TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { color } from '../helper'
import { BasicIcon } from './Basic/BasicIcon'


export const TopButton = () => {
    return (
        <SafeAreaView style={styles.contaniner}>
            <TouchableOpacity activeOpacity={.75} style={styles.buttonStyle}>
                <BasicIcon name="menu" type="Entypo" />
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contaniner: {
        position: 'absolute',
        zIndex:3,
    },
    buttonStyle: {
        marginTop:10,
        marginLeft:10,
        padding:10,
        borderWidth:1,
        borderColor:color.border3,
        borderRadius:5,
        backgroundColor:color.white,
    }
})