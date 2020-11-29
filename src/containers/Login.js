import React from 'react';
import { View } from 'react-native'
import { Content,MainButton } from '../components';

const Login = (props) => {
    return (
        <View>
            <Content title="Login" />
            <MainButton 
            onPress={()=>props.navigation.navigate('Home')}
            title="Go Home"/>
        </View>
    )
};

export default Login;