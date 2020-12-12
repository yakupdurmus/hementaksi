import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';

import { DraxProvider, DraxView } from 'react-native-drax';
import { BasicIcon, BasicText } from '../components';

const WordLearn = () => {
    const [received, setReceived] = React.useState([]);
    alert(received)
    return (
        <DraxProvider>
            <View style={styles.draggableContent}>
                <DraxView
                    style={[styles.centeredContent, styles.draggableBox]}
                    draggingStyle={styles.dragging}
                    dragReleasedStyle={styles.dragging}
                    hoverDraggingStyle={styles.hoverDragging}
                    dragPayload={'Y'}
                    longPressDelay={0}
                >
                    <BasicText h3 style={{ color: '#fff', paddingBottom: 0 }}>KELİME</BasicText>
                </DraxView>
            </View>
            <View style={styles.container}>
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receivingPass}
                    renderContent={({ viewState }) => {
                        const receivingDrag = viewState && viewState.receivingDrag;
                        const payload = receivingDrag && receivingDrag.payload;
                        return <BasicText h1>ATLA</BasicText>
                    }}
                    onReceiveDragDrop={(event) => {
                        setReceived([
                            ...received,
                            event.dragged.payload || '?',
                        ]);
                    }}
                />
                <DraxView
                    style={[styles.centeredContent, styles.receivingZone]}
                    receivingStyle={styles.receivingSuccess}
                    renderContent={({ viewState }) => {
                        const receivingDrag = viewState && viewState.receivingDrag;
                        const payload = receivingDrag && receivingDrag.payload;
                        return <BasicText h1>YÜKLE</BasicText>
                    }}
                    onReceiveDragDrop={(event) => {
                        setReceived([
                            ...received,
                            event.dragged.payload || '?',
                        ]);
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
    draggableContent: {
        flex: 1,alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20
    },
    centeredContent: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    receivingZone: {
        height: 200,
        flex:1,
        margin:5,
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
