import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { BasicButton, BasicInput, BasicText } from '../components';


const WordLearn = (props) => {

   

    return (
        <>
            <View style={styles.containerStyle}>
              
            </View>
        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1
    },
    imageStyle: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },

})

export default React.memo(WordLearn);