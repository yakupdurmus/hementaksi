import React, { useEffect } from 'react';
import { View, StyleSheet, Image,Vibration } from 'react-native';


import { useState } from 'react/cjs/react.development';
import { BasicLoader, BasicText, BasicButton } from '../components';
import LottieView from 'lottie-react-native';
import Tts from 'react-native-tts';
import { shuffle } from '../helper'

const WordStuffing = (props) => {

    const { navigation, route } = props
    const { selectedWord } = route.params
    const [index, setIndex] = useState(0);
    const [wordStuff, setWordStuff] = useState("")
    const [characterArr, setCharacterArr] = useState([])


    useEffect(() => {
        word(0)
    }, [])

    const word = (_index) => {
        let arr = selectedWord[_index].en.split('')
        arr = shuffle(arr)
        setCharacterArr(arr)
    }

    const onPress = (character, characterIndex) => {

        const stuffing = wordStuff + character
        const nextIndex = index + 1;

        if (stuffing == selectedWord[index].en) {
            if (nextIndex > 4) {
                setIndex(-1)
                nextPage(1500)
                return;
            }
            Tts.speak(selectedWord[index].en);
            setWordStuff("")
            word(nextIndex)
            setIndex(nextIndex)
            return;
        }
        const arr = wordStuff.split('')
        if (selectedWord[index].en[arr.length] == character) {
            setWordStuff(stuffing)
        } else {
            Vibration.vibrate(1000);
            setTimeout(()=>{
                Vibration.vibrate(500);
            },500)
        }

    }

    const nextPage = (animationTime = 1) => {

        setTimeout(() => {
            navigation.navigate('Home', { selectedWord })
        }, animationTime)

    }

    if (!selectedWord) return <BasicLoader />
    if (index == -1) return <View style={{ flex: 1, backgroundColor: '#fff' }}><LottieView source={require('../assets/success.json')} loop={false} autoPlay /></View>

    return (
        <View style={styles.containerStyle} >
            <View style={styles.currentWordContent}>
                <Image source={{ uri: selectedWord[index].img }} style={styles.imageStyle} />
            </View>
            <View style={styles.wordStuffingContent}>
                <BasicText h3 style={styles.textStyle}>{wordStuff}</BasicText>
            </View>
            <View style={styles.alpahabetContent}>
                {characterArr.map((item, index) => {
                    return (
                        <BasicButton onPress={() => onPress(item, index)} textStyle={styles.buttonTextStyle} style={styles.buttonStyle} primary key={"alphabet-" + index}>{item}</BasicButton>
                    )
                })}
            </View>



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
    currentWordContent: {

        backgroundColor: '#e1393a',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        borderRadius: 5,
    },
    imageStyle: {
        width: '100%',
        height: 200,
    },
    alpahabetContent: {
        width: '100%',
        flex: .5,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
    },
    buttonStyle: {
        width: 50,
        height: 50,
    },
    wordStuffingContent: {
        width: '100%',
        height: 50,
        backgroundColor: '#ddd',
        marginBottom: 5,
        borderRadius: 5,
        justifyContent:'center',
        alignItems:'center'
    },
    textStyle:{
        letterSpacing:5,
        paddingBottom:0,
    },
    buttonTextStyle:{
        fontWeight:'bold',
        fontSize:22,
    }

})

export default React.memo(WordStuffing);