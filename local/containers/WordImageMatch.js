import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { DraxProvider, DraxView } from 'react-native-drax';
import { useState } from 'react/cjs/react.development';
import { BasicLoader, BasicText } from '../components';
import LottieView from 'lottie-react-native';
import Tts from 'react-native-tts';
import { shuffle } from '../helper'

const WordLearn = (props) => {

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


    const onReceiveDragDrop = () => {
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
            navigation.navigate('WordTrEn', { selectedWord })
        }, animationTime)

    }


    if (index == -1) return <View style={{ flex: 1, backgroundColor: '#fff' }}><LottieView source={require('../assets/success.json')} loop={false} autoPlay /></View>
    if (!currentWord || !otherWord) return <BasicLoader />

    return (
        <DraxProvider>
            <View style={styles.container}>
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receiving}
                    renderContent={() => {
                        return <Image source={{ uri: otherWord[0].url }} style={styles.imageStyle} />
                    }}
                    onReceiveDragDrop={(event) => { onReceiveDragDrop() }}
                />
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receiving}
                    renderContent={() => {
                        return <Image source={{ uri: otherWord[1].url }} style={styles.imageStyle} />
                    }}
                    onReceiveDragDrop={(event) => { onReceiveDragDrop() }}
                />
            </View>
            <View style={styles.draggableContent}>
                <DraxView
                    style={[styles.centeredContent, styles.draggableBox]}
                    draggingStyle={styles.dragging}
                    dragReleasedStyle={styles.dragging}
                    hoverDraggingStyle={styles.hoverDragging}
                    dragPayload={currentWord}
                    longPressDelay={0}
                >
                    <BasicText h3 style={{ color: '#fff', paddingBottom: 0 }}>{currentWord.word}</BasicText>
                </DraxView>
            </View>
            <View style={styles.container}>
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receiving}
                    renderContent={() => {
                        return <Image source={{ uri: otherWord[2].url }} style={styles.imageStyle} />
                    }}
                    onReceiveDragDrop={(event) => { onReceiveDragDrop() }}
                />
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receiving}
                    renderContent={() => {
                        return <Image source={{ uri: otherWord[3].url }} style={styles.imageStyle} />
                    }}
                    onReceiveDragDrop={(event) => { onReceiveDragDrop() }}
                />
            </View>
        </DraxProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        justifyContent: 'space-between',
        flexDirection: 'row',
        bottom: 0,
        width: '100%'
    },
    imageStyle: {
        width: 100,
        height: 100,
    },
    draggableContent: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
    },
    centeredContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    receivingZone: {
        height: 200,
        flex: 1,
        margin: 5,
        borderRadius: 10,
    },
    receiving: {
        borderColor: '#333',
        borderWidth: 2,
    },
    draggableBox: {
        width: 140,
        height: 80,
        borderRadius: 10,
        backgroundColor: '#f73f40',
    },
    dragging: {
        opacity: 0.2,
    },
    hoverDragging: {
        borderWidth: 2,
    }
});

export default WordLearn;
