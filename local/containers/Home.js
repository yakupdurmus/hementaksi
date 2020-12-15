import React from 'react';
import { View, StyleSheet } from 'react-native'
import { BasicButton, BasicText, BasicIcon } from '../components'
import { getKelimeImageList } from '../services'


const Home = (props) => {

    const { navigation } = props
    const onPress = () => navigation.navigate("WordSelect")
    return (
        <View style={styles.containerStyle} >
            <BasicIcon style={styles.iconStyle} type="AntDesign" name="like2" />
            <BasicText style={styles.textStyle}>Kelimeler öğrenilmeye hazır.</BasicText>
            <BasicButton danger onPress={onPress}> Hemen öğrenmeye başla!</BasicButton>
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
        fontSize: 90,
        marginBottom: 20,
    },
    textStyle: {
        marginBottom: 200,
        fontSize: 18
    }
})

export default React.memo(Home);