import React, { useState } from 'react';
import { View } from 'react-native'
import { AppBackground, LoginForm } from '../components';

const Login = (props) => {
    const [lock, setLock] = useState(false)
    const [lockAnonymous, setLockAnonymous] = useState(false)
    const onSubmit = (model) => {
        setLock(true);
        setTimeout(() => {
            if (model.email == "admin" && model.password == "1234") {
                props.navigation.navigate('Home')
            } else {
                alert("Hatalı şifre")
            }
            setLock(false)
        }, 1000);
    }
    const onSubmitAnonymous = (model) => {
        console.log("onSubmitAnonymous Model ", model);
    }
    return (
        <View style={{ flex: 1 }}>
            <AppBackground />
            <LoginForm
                lock={lock}
                lockAnonymous={lockAnonymous}
                onSubmit={onSubmit}
                onSubmitAnonymous={onSubmitAnonymous}
                goRegister={() => props.navigation.navigate('Register')}
            />
        </View>
    )
};

export default Login;