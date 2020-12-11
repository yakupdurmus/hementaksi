import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native'
import { BasicButton, BasicInput, BasicText, WordAnimation } from '../components';
import { setStoreValue, wordCountRegex, KEY_WORDCOUNT } from '../helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { StackActions } from '@react-navigation/native';

const FirstLaunch = (props) => {

    const [wordCount, setWordCount] = useState(15)
    const [isErr, setIsErr] = useState(false)

    const replaceScreen = (value) => {
        setStoreValue(KEY_WORDCOUNT, value.toString())
        props.navigation.dispatch(
            StackActions.replace('Home', {
                wordCount: value,
            })
        );
    }
    const onChangeText = (str) => {
        setIsErr(!wordCountRegex(str))
        setWordCount(str)
    }

    return (
        <>
            <View style={styles.containerStyle}>
                <WordAnimation style={styles.animationStyle} />
                <KeyboardAwareScrollView
                    contentContainerStyle={{ flex: 1 }}
                    keyboardShouldPersistTaps='always'
                >
                    <View style={styles.content}>
                        <BasicText h1>Sınav sürecinin her adımında yanındayız.</BasicText>
                        <BasicText style={{ marginBottom: 10 }}>Günlük kaç kelime öğrenmek istersin? Merak etme uygulama içerisinden değiştirebileceksin.</BasicText>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <BasicInput
                                keyboardType="numeric"
                                error={isErr}
                                errorMessage="Lütfen 1-15 arasında bir sayı giriniz."
                                title="Günde öğrenilecek kelime sayısı"
                                require
                                value={wordCount.toString()}
                                onChangeText={onChangeText}
                                contentStyle={styles.inputContent}
                                style={styles.inputStyle}
                            />
                            <BasicButton
                                style={styles.buttonStyle}
                                border
                                label="Kaydet"
                                onPress={() => wordCountRegex(wordCount) && replaceScreen(wordCount)} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        flex: 1
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 10,
        flex: 1,
        position: 'absolute',
        bottom: 0
    },
    buttonStyle: {
        marginLeft: 10,
        padding: 12,
        backgroundColor: '#fff'
    },
    inputStyle: {
        backgroundColor: '#fff'
    },
    inputContent: { flex: 1 },
    animationStyle: { position: 'absolute', width: '100%' }

})

export default React.memo(FirstLaunch);