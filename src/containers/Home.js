import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { BasicButton, BasicInput, BasicText, BasicIcon } from '../components';

const Home = (props) => {

    const { navigation } = props

    return (
        <View style={styles.containerStyle} >
            <BasicIcon style={styles.iconStyle} type="Feather" name="book-open" />
            <BasicText style={styles.textStyle}>Kelimeler öğrenilmeye hazır.</BasicText>
            <BasicButton danger> Hemen öğrenmeye başla!</BasicButton>
        </View>
    )
};


//genel #fff  #f7f7f7  #ddd #3e3e3e #000 #f73f40 #e1393a #00b7cd

const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconStyle: {
        fontSize: 90
    },
    textStyle:{
        marginBottom:200,
    }
})

export default React.memo(Home);