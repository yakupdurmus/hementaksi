import React from 'react'
import { Text } from 'react-native'

export const BasicText = (props) => {
    return (
        <Text {...props}>
            {props.children}
        </Text>
    )
} 