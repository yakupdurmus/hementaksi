import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native'
import { BasicButton, BasicInput, BasicText } from '../components';


const Progress = (props) => {

    const [wordCount, setWordCount] = useState(15)
    return (
        <>
            <View style={styles.containerStyle} >
                <Text onPress={() => alert('a')}>Progress</Text>
            </View>

        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1,
        backgroundColor: '#f73f40',
    },
    imageStyle: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },

})

export default React.memo(Progress);