import React from 'react'
import { TextInput } from 'react-native'

export const BasicInput = (props) => {
    return (
        <TextInput
            {...props}
            style={textInput}
        />
    )
}

const textInput = { width: '100%', height: 40, paddingLeft: 10, borderWidth: 1, borderColor: '#aaa', borderRadius: 5 }