import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import * as Progress from 'react-native-progress';
import { BasicText } from '../components';
import { setUser } from '../helper'
import Tts from 'react-native-tts';
import LottieView from 'lottie-react-native';


let selectedWord = [];
const WordSelect = (props) => {

    const { route, navigation } = props
    const WIDTH = Dimensions.get('window').width
    const [index, setIndex] = useState(0)

    useEffect(() => {

        nextPage(1500)

    }, [])


    const nextPage = (animationTime = 1) => {

        if (selectedWord.length < 5) return
        setUser(selectedWord)
        setTimeout(() => {
            navigation.navigate('WordLearn', { selectedWord })
        }, animationTime)

    }

    const onPress = (type) => {

        nextPage()

        if (type == "yes") {
            Tts.speak(mock[index].en);
            selectedWord.push(mock[index])
        }

        setIndex((index + 1) % mock.length)

        nextPage(1500)
    }

    if (selectedWord.length > 4) return <View style={{ flex: 1, backgroundColor: '#fff' }}><LottieView source={require('../assets/success.json')} loop={false} autoPlay /></View>

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
                <BasicText>{selectedWord.length} / 5</BasicText>
                <Progress.Bar progress={(selectedWord.length) / 5} color="#00b7cd" width={WIDTH * .9} />

            </View>
        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1,
    },
    imageStyle: { width: '100%', height: 200, borderRadius: 10, marginTop: '10%' },
    textContent: { flex: 1, alignItems: 'center', padding: 20, paddingTop: 50 },
    firstText: { marginTop: 20, fontSize: 40 },
    secondText: { marginTop: 20, fontSize: 25 },
    buttonContent: { position: 'absolute', width: '100%', bottom: 30, left: 20, height: 100, flexDirection: 'row' },
    buttonStyle: { flex: 1, height: '100%', justifyContent: 'center', alignItems: 'center' },
    buttonImageStyle: { width: 60, height: 60 },

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
        tr: "Dört",
        en: "Four",
        img: "https://galeri14.uludagsozluk.com/808/4_1301627.jpg"
    },
    {
        tr: "Beş",
        en: "Five",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/TV5_%28ABC5%29_Logo.svg/1200px-TV5_%28ABC5%29_Logo.svg.png"
    }
]