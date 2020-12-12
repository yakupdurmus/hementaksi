import React from 'react';
import {View,StyleSheet, Image} from 'react-native';
import { DraxProvider, DraxView } from 'react-native-drax';
import { useState } from 'react/cjs/react.development';
import { BasicText } from '../components';
import Tts from 'react-native-tts';

const WordImageMatch = (props) => {

    const { navigation, route } = props
    const { selectedWord } = route.params
    const [index, setIndex] = useState(0);
    const [pass, setPass] = React.useState([]);
    const [learn, setLearn] = React.useState([]);

    const onReceiveDragDrop = (type, payload) => {

        if (type == "LEARN") {

        } 

        Tts.speak(selectedWord[index].en);
        if (index + 1 > 4) {

        }
        setIndex((index + 1) % 5)

    }

    return (<View></View>)
    return (
        <DraxProvider>
            <View style={styles.draggableContent}>
                <Image
                    source={{ uri: selectedWord[index].img }}
                    style={styles.imageStyle}
                />
                <BasicText h2>{selectedWord[index].tr}</BasicText>
                <DraxView
                    style={[styles.centeredContent, styles.draggableBox]}
                    draggingStyle={styles.dragging}
                    dragReleasedStyle={styles.dragging}
                    hoverDraggingStyle={styles.hoverDragging}
                    dragPayload={selectedWord[index]}
                    longPressDelay={0}
                >
                    <BasicText h3 style={{ color: '#fff', paddingBottom: 0 }}>{selectedWord[index].en}</BasicText>
                </DraxView>
            </View>
            <View style={styles.container}>
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receivingPass}
                    renderContent={() => {
                        return <BasicText h1>YENİ SAYFA</BasicText>
                    }}
                    onReceiveDragDrop={(event) => {
                        setPass([
                            ...pass,
                            event.dragged.payload
                        ]);
                        onReceiveDragDrop("PASS", event.dragged.payload)
                    }}
                />
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receivingSuccess}
                    renderContent={() => {
                        return <BasicText h1>ÖĞRENDİM</BasicText>
                    }}
                    onReceiveDragDrop={(event) => {
                        setLearn([
                            ...learn,
                            event.dragged.payload
                        ]);
                        onReceiveDragDrop("LEARN", event.dragged.payload)
                    }}
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

export default WordImageMatch;
