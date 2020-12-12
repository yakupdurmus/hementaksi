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
                        <BasicText h1 style={{color:'#fff'}}>Sınav sürecinin her adımında yanındayız.</BasicText>
                        <BasicText style={{ marginBottom: 20,color:'#fff' }}>Günlük kaç kelime öğrenmek istersin? Bu ayarı istediğin zaman uygulama içerisinden değiştirebilirsin.</BasicText>
                        <View style={{ flexDirection: 'row', alignItems: 'center',marginBottom:20,justifyContent:'space-evenly'}}>
                            {/* <BasicInput
                                keyboardType="numeric"
                                error={isErr}
                                errorMessage="Lütfen 1-15 arasında bir sayı giriniz."
                                title="Günde öğrenilecek kelime sayısı"
                                require
                                value={wordCount.toString()}
                                onChangeText={onChangeText}
                                contentStyle={styles.inputContent}
                                style={styles.inputStyle}
                            /> */}
                            <BasicButton
                                style={styles.buttonStyle}
                                border
                                light
                                label="5 kelime"
                                onPress={() =>replaceScreen(5)} />
                            <BasicButton
                                style={styles.buttonStyle}
                                border
                                light
                                label="10 kelime"
                                onPress={() =>replaceScreen(10)} />
                            <BasicButton
                                style={styles.buttonStyle}
                                border
                                light
                                label="15 kelime"
                                onPress={() =>replaceScreen(15)} />
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        backgroundColor:'#f7f7f7'
    },
    content: {
        backgroundColor: '#e1393a',
        padding: 10,
        flex: 1,
        width:'100%',
        position: 'absolute',
        bottom: 0
    },
    buttonStyle: {
        marginLeft: 10,
        padding: 12,
        paddingHorizontal:20,
    },
    inputStyle: {
        backgroundColor: '#fff'
    },
    inputContent: { flex: 1 },
    animationStyle: { position: 'absolute', width: '100%' }

})

export default React.memo(FirstLaunch);