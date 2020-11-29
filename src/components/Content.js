import React from 'react';
import { View, Text } from 'react-native'

export const Content = (props) => {
    return (
        <View>
            {props.title && <Text>{props.title}</Text>}
        </View>
    )
};