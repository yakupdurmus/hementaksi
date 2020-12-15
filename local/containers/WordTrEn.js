import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';


import { useState } from 'react/cjs/react.development';
import { BasicLoader, BasicText, BasicButton } from '../components';
import LottieView from 'lottie-react-native';
import Tts from 'react-native-tts';
import { shuffle } from '../helper'

const WordTrEn = (props) => {

    const { navigation, route } = props
    const { selectedWord } = route.params
    const [index, setIndex] = useState(0);
    const [currentWord, setCurrentWord] = useState()
    const [otherWord, setOtherWord] = useState()

    useEffect(() => {
        setTimeout(() => words(), 100)
    }, [])

    const words = (_index = 0) => {

        const _currentWord = selectedWord[_index]
        let _otherWord = [...selectedWord]
        _otherWord.splice(_index, 1)
        _otherWord = shuffle(_otherWord)
        _otherWord.pop()
        _otherWord = _otherWord.concat(_currentWord)
        _otherWord = shuffle(_otherWord)
        setCurrentWord(_currentWord)
        setOtherWord(_otherWord)
    }

    const onPress = (selectWord) => {
        Tts.speak(selectedWord[index].word);

        const nextIndex = index + 1
        if (nextIndex > 4) {
            setIndex(-1)
            nextPage(1500)
            return
        }

        setIndex(nextIndex)
        words(nextIndex)

    }

    const nextPage = (animationTime = 1) => {

        setTimeout(() => {
            navigation.navigate('WordEnTr', { selectedWord })
        }, animationTime)

    }

    if (!currentWord || !otherWord) return <BasicLoader />
    if (index == -1) return <View style={{ flex: 1, backgroundColor: '#fff' }}><LottieView source={require('../assets/success.json')} loop={false} autoPlay /></View>


    return (
        <View style={styles.containerStyle} >
            <View style={styles.currentWordContent}>
                <BasicText h4 style={{ color: '#fff' }}>{currentWord.kelime}</BasicText>
            </View>

            <BasicButton onPress={() => onPress(otherWord[0])} primary textStyle={styles.buttonTextStyle} style={styles.buttonStyle}>{otherWord[0].word}</BasicButton>
            <BasicButton onPress={() => onPress(otherWord[1])} primary textStyle={styles.buttonTextStyle} style={styles.buttonStyle}>{otherWord[1].word}</BasicButton>
            <BasicButton onPress={() => onPress(otherWord[2])} primary textStyle={styles.buttonTextStyle} style={styles.buttonStyle}>{otherWord[2].word}</BasicButton>
            <BasicButton onPress={() => onPress(otherWord[3])} primary textStyle={styles.buttonTextStyle} style={styles.buttonStyle}>{otherWord[3].word}</BasicButton>

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
    buttonTextStyle: {
        fontWeight: 'bold',
    },
    textStyle: {
        marginBottom: 200,
    },
    currentWordContent: {

        backgroundColor: '#e1393a',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 5,
        borderRadius: 5,
    },
    buttonStyle: {
        width: '100%',
        marginVertical: 5,
        paddingVertical: 18,
        fontWeight: 'bold'
    }
})

export default React.memo(WordTrEn);