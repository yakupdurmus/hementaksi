import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { DraxProvider, DraxView } from 'react-native-drax';
import { useState } from 'react/cjs/react.development';
import { BasicText } from '../components';
import LottieView from 'lottie-react-native';
import Tts from 'react-native-tts';

const WordLearn = (props) => {

    const { navigation, route } = props
    const { selectedWord } = route.params
    const [index, setIndex] = useState(0);


    const onReceiveDragDrop = (type) => {

        if (type == "LEARN") {
            selectedWord[index].learn = true
        } else {
            selectedWord[index].learn = false
        }

        Tts.speak(selectedWord[index].word);
        const nextIndex = getNextIndex(index)
        if (nextIndex == -1) {
            setIndex(-1)
            nextPage(1500)
            return
        }
        setIndex(nextIndex)
    }

    const getNextIndex = (currentIndex) => {

        const isNextPage = selectedWord.filter(item => item.learn == true).length > 4
        if (isNextPage) return -1

        for (let i = currentIndex + 1; selectedWord.length > i; i++) {
            let item = selectedWord[i]
            if (!item.learn) return i
        }

        for (let i = 0; currentIndex + 1 > i; i++) {
            let item = selectedWord[i]
            if (!item.learn) return i
        }

    }

    const nextPage = (animationTime = 1) => {

        setTimeout(() => {
            navigation.navigate('WordImageMatch', { selectedWord })
        }, animationTime)

    }

    if (index == -1) return <View style={{ flex: 1, backgroundColor: '#fff' }}><LottieView source={require('../assets/success.json')} loop={false} autoPlay /></View>

    return (
        <DraxProvider>
            <View style={styles.draggableContent}>
                <Image
                    source={{ uri: selectedWord[index].url }}
                    style={styles.imageStyle}
                />
                <BasicText h2>{selectedWord[index].kelime}</BasicText>
                <DraxView
                    style={[styles.centeredContent, styles.draggableBox]}
                    draggingStyle={styles.dragging}
                    dragReleasedStyle={styles.dragging}
                    hoverDraggingStyle={styles.hoverDragging}
                    dragPayload={selectedWord[index]}
                    longPressDelay={0}
                >
                    <BasicText h3 style={{ color: '#fff', paddingBottom: 0 }}>{selectedWord[index].word}</BasicText>
                </DraxView>
            </View>
            <View style={styles.container}>
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receivingPass}
                    renderContent={() => {
                        return <BasicText h1>ATLA</BasicText>
                    }}
                    onReceiveDragDrop={(event) => { onReceiveDragDrop("PASS") }}
                />
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receivingSuccess}
                    renderContent={() => {
                        return <BasicText h1>ÖĞRENDİM</BasicText>
                    }}
                    onReceiveDragDrop={(event) => { onReceiveDragDrop("LEARN") }}
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
        width: '80%',
        height: 200,
        marginBottom: 50,
    },
    draggableContent: {
        flex: 1, alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20
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
    receivingPass: {
        borderColor: 'red',
        borderWidth: 2,
    },
    receivingSuccess: {
        borderColor: 'green',
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
