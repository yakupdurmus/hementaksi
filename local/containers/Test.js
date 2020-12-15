import React, { useState } from 'react'
import { View, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { SelectableText } from "@astrocoders/react-native-selectable-text";

//Tanımlamalar
const LOREM = `Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.Lorem Ipsum, dizgi ve baskı endüstrisinde kullanılan mıgır metinlerdir. Lorem Ipsum, adı bilinmeyen bir matbaacının bir hurufat numune kitabı oluşturmak üzere bir yazı galerisini alarak karıştırdığı 1500'lerden beri endüstri standardı sahte metinler olarak kullanılmıştır. Beşyüz yıl boyunca varlığını sürdürmekle kalmamış, aynı zamanda pek değişmeden elektronik dizgiye de sıçramıştır. 1960'larda Lorem Ipsum pasajları da içeren Letraset yapraklarının yayınlanması ile ve yakın zamanda Aldus PageMaker gibi Lorem Ipsum sürümleri içeren masaüstü yayıncılık yazılımları ile popüler olmuştur.`
const docId = -1
const doc2 = { content: LOREM }
let selectionClear = []
const CopyIcon = () => null
const HeadPhoneIcon = () => null
const CommentIcon = () => null
const EditIcon = () => null
const ShareIcon = () => null

export default Test = ({ navigation, route }) => {
    const [selectionText, setSelectionText] = useState("")
    const [actionBarVisible, setActionBarVisible] = useState(false)

    const buttonHide = () => {
        setSelectionText(undefined);
        if (actionBarVisible && selectionClear.length > 0) selectionClear.map(clear => clear && clear()) //Sadece androidde çalışıyor. Menüye tıkladıktan sonra seçimi temizliyor.
        setActionBarVisible(false)

    }

    const onTouchStart = () => {
        buttonHide()
    }

    const onSelection = (props) => {
        const {
            content,
            eventType,
            selectionStart,
            selectionEnd
        } = props
        setSelectionText(props)
        if (selectionStart != selectionEnd) setActionBarVisible(true)
        else setActionBarVisible(false)
        //dispatch(onSelection(target, start, end, doc2.chapter, doc2.page, doc2.id, doc2.content, setSelectionText))
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TextOptionsBar
                selectionText={selectionText}
                buttonHide={buttonHide}
                actionBarVisible={actionBarVisible}
                navigation={navigation}
            />
            <View style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: 50 }}
                    onTouchStart={onTouchStart}>
                    <SelectableText
                        selectionClear={(state) => { selectionClear.push(state) }} //Sadece androidde çalışıyor. Menüye tıkladıktan sonra seçimi temizliyor.
                        onSelection={(props) => onSelection(props)}
                        highlights={docId !== -1 ? highlights[docId].data : []}
                        value={doc2.content}
                        style={{ marginBottom: 10 }}
                    />
                    <SelectableText
                        selectionClear={(state) => { selectionClear.push(state) }}
                        onSelection={(props) => onSelection(props)}
                        highlights={docId !== -1 ? highlights[docId].data : []}
                        value={doc2.content}
                        style={{ marginBottom: 10 }}
                    />
                    <SelectableText
                        selectionClear={(state) => { selectionClear.push(state) }}
                        onSelection={(props) => onSelection(props)}
                        highlights={docId !== -1 ? highlights[docId].data : []}
                        value={doc2.content}
                        style={{ marginBottom: 10 }}
                    />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const TextOptionsBar = ({ actionBarVisible, selectionText, buttonHide }) => {
    return (
        <>
            {actionBarVisible && <View style={[styles.ActionBarStyle]}>
                <View style={styles.general}>
                    <View style={styles.row}>
                        <TouchableOpacity onPress={(e) => dispatch(colorSelect("#00DCD6"))} >
                            <View style={[styles.colorButton, { backgroundColor: "#00DCD6", marginLeft: 8 }]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => dispatch(colorSelect("#FFCC25"))} >
                            <View style={[styles.colorButton, { backgroundColor: "#FFCC25" }]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => dispatch(colorSelect("#FF4702"))} >
                            <View style={[styles.colorButton, { backgroundColor: "#FF4702" }]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => dispatch(colorSelect("#3865f9"))} >
                            <View style={[styles.colorButton, { backgroundColor: "#3865f9", borderWidth: 1, borderColor: "#ddd" }]}></View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={(e) => dispatch(colorSelect("#FFF"))} >
                            <View style={[styles.colorButton, { backgroundColor: "#FFF", borderWidth: 1, borderColor: "#ddd" }]}></View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.hr}></View>
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            console.log("ONPRESS", selectionText);
                            buttonHide()
                        }}>
                            <CopyIcon style={{ width: 20, height: 20 }} />
                            <Text style={styles.buttonText}>Menü1</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <HeadPhoneIcon style={{ width: 20, height: 20 }} />
                            <Text style={styles.buttonText}>Menü2</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <CommentIcon style={{ width: 20, height: 20 }} />
                            <Text style={styles.buttonText}>Menü3</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <EditIcon style={{ width: 20, height: 20 }} fill="#333" />
                            <Text style={styles.buttonText}>text</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <ShareIcon style={{ width: 20, height: 20 }} />
                            <Text style={styles.buttonText}>text</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>}
        </>
    )
}


const styles = StyleSheet.create({
    ActionBarStyle: {
        width: '100%',
        height: 60,
        backgroundColor: 'red',
        zIndex: 999,
        position: 'absolute',
        bottom: 0,
    },
    row: {
        flexDirection: 'row'
    },
    button: {
        padding: 20,
        backgroundColor: '#fff'
    }

})