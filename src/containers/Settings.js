import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { BasicButton, BasicInput, BasicText } from '../components';


const Settings = (props) => {

    const [wordCount, setWordCount] = useState(15)

    return (
        <>
            <View style={styles.containerStyle} />

        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1,
        backgroundColor:'#00b7cd'
    },
    imageStyle: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },

})

export default React.memo(Settings);