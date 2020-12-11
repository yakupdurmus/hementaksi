import React, { useState, PureComponent } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Text, Button, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress';
import { BasicText } from '../components';

let selectedWord = [];
const WordSelect = ({ route, navigation }) => {

    const { wordCount } = route.params
    const [index, setIndex] = useState(0)

    const onPress = (type) => {
        if (type == "yes") {
            selectedWord.push(mock[index])
        } else {

        }
        if (selectedWord.length == 5) {
            navigation.navigate('WordLearn')
        }
        setIndex((index + 1) % mock.length)
    }
    const width = Dimensions.get('window').width

    return (
        <>
            <View style={styles.containerStyle}>
                <Image
                    source={{ uri: mock[index].img }}
                    style={styles.imageStyle}
                />
                <View style={styles.textContent}>
                    <BasicText style={styles.firstText}>{mock[index].en}</BasicText>
                    <BasicText style={styles.secondText}>{mock[index].tr}</BasicText>
                </View>
                <View style={styles.buttonContent}>
                    <TouchableOpacity onPress={() => onPress('no')} style={styles.buttonStyle}>
                        <Image
                            source={{ uri: "https://d29fhpw069ctt2.cloudfront.net/icon/image/39219/preview.png" }}
                            style={styles.buttonImageStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onPress('yes')} style={styles.buttonStyle}>
                        <Image
                            source={{ uri: "https://icon-library.net/images/icon-ok/icon-ok-0.jpg" }}
                            style={styles.buttonImageStyle} />
                    </TouchableOpacity>
                </View>
                <Text>{selectedWord.length + 1} / 5</Text>
                <Progress.Bar progress={(selectedWord.length + 1) / 5} width={width * .9} />

            </View>
        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1
    },
    imageStyle: { width: '100%', height: 200, borderRadius: 10, marginTop: '10%' },
    textContent: { flex: 1, alignItems: 'center', padding: 20, paddingTop: 50 },
    firstText: { marginTop: 20, fontSize: 40 },
    secondText: { marginTop: 20, fontSize: 25 },
    buttonContent: { position: 'absolute', width: '100%', bottom: 30, left: 20, height: 100, flexDirection: 'row' },
    buttonStyle: { flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' },
    buttonImageStyle: { width: 60, height: 60 }

})

export default React.memo(WordSelect);


const mock = [
    {
        tr: "Ekmek",
        en: "Bread",
        img: "https://www.thespruceeats.com/thmb/e-0bRf8RWzJzvm3K3S3HgU80vpA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg"
    }, {
        tr: "Bardak",
        en: "Glass",
        img: "https://www.mepal.com/en/604/0/0/1/ffffff00/c7f95583/a70ff74c34db6dbe117f5e90358e361e759ba87ee46e06b2ef7573188b91c2cd/glass-wave-200-ml-transparent.jpg"
    },
    {
        tr: "Terk Etmek",
        en: "Abonden",
        img: "https://i1.wp.com/itanndy.com/wp-content/uploads/2019/01/vignette-abandon-675.jpg?resize=600%2C386&ssl=1"
    }, {
        tr: "Ekmek",
        en: "Bread",
        img: "https://www.thespruceeats.com/thmb/e-0bRf8RWzJzvm3K3S3HgU80vpA=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/loaf-of-bread-182835505-58a7008c5f9b58a3c91c9a14.jpg"
    },
    {
        tr: "Bardak",
        en: "Glass",
        img: "https://www.mepal.com/en/604/0/0/1/ffffff00/c7f95583/a70ff74c34db6dbe117f5e90358e361e759ba87ee46e06b2ef7573188b91c2cd/glass-wave-200-ml-transparent.jpg"
    }
]