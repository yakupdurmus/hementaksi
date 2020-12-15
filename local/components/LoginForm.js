import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Button, Text, Item } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AppInput } from './AppInput';
var Spinner = require('react-native-spinkit');

export const LoginForm = ({ onSubmit, lock, onSubmitAnonymous, lockAnonymous, goRegister }) => {

    const [email, setEmail] = useState("admin");
    const [password, setPassword] = useState("1234");

    return (

        <View style={{ flex: 1, padding: 20 }}>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>

                <Text style={{ color: '#fff', fontSize: 20, marginBottom: 5,  }}>YDS Kelime Öğren</Text>
                <Text style={{ color: '#fff', fontSize: 35, marginBottom: 5, }}>Giriş Yap</Text>

                <AppInput
                    reqired
                    autoCapitalize='none'
                    input={email}
                    inputChange={(input) => { setEmail(input) }}
                    title="Email" />

                <AppInput
                    reqired
                    secureTextEntry
                    input={password}
                    inputChange={(input) => { setPassword(input) }}
                    title="Şifre" />

                <View style={{}}>
                    <Button
                        disabled={lock}
                        full
                        style={{ backgroundColor: '#2980b9', borderColor: '#2980b9', borderRadius: 10 }}
                        onPress={() => onSubmit({ email: email, password: password })}>
                        {!lock && <Text >Giriş Yap</Text>}
                        <Spinner isVisible={!!lock} size={30} type={"Wave"} color={"white"} />
                    </Button>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Button style={{ flex: 1 }} onPress={() => goRegister()} transparent full>
                        <Text style={{  fontWeight: '300' }}>Kayıt Ol</Text>
                    </Button>
                    <Text style={{ justifyContent: 'center', alignSelf: 'center', color: 'white' }}>|</Text>
                    <Button style={{ flex: 1 }} onPress={() => onSubmitAnonymous()} transparent full>
                        {!lockAnonymous && <Text style={{  fontWeight: '300' }}>Üyeliksiz Giriş</Text>}
                        <Spinner isVisible={!!lockAnonymous} size={30} type={"Wave"} color={"white"} />
                    </Button>
                </View>


            </KeyboardAwareScrollView>
        </View>

    )

}

