import React from 'react';
import { View, Text } from 'react-native'
import { Content, MainButton } from '../components';

const Home = (props) => {
    return (
        <View>
            <Content title={"Home"} />
            <MainButton title="Go Back" onPress={()=>props.navigation.goBack()} />
        </View>
    )
};

export default Home;