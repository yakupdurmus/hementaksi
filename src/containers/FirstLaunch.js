import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { BasicButton, BasicInput, BasicText } from '../components';
import { StackActions } from '@react-navigation/native';

const FirstLaunch = (props) => {

    const replaceScreen = (value) => {

        props.navigation.dispatch(
            StackActions.replace('Home', {
                wordCount: value,
            })
        );
    }

    return (
        <>
            <View style={styles.containerStyle}>

            </View>
        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor: '#f7f7f7'
    },
})

export default React.memo(FirstLaunch);