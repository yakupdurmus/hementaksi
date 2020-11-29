import React from 'react';
import { Text, Button } from 'react-native'

export const MainButton = (props) => {
    return (
        <Button
            title={props.title}
            onPress={props.onPress}>
        </Button>
    )
};