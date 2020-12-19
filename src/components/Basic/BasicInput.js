import React from 'react'
import { TextInput, View } from 'react-native'
import { BasicText } from './BasicText'

export const BasicInput = (props) => {

    const {
        require, title, error, errorMessage, contentStyle, style
    } = props
    return (
        <View style={[styles.content, contentStyle]}>
            {title && <BasicText style={styles.titleStlye}>{title}{require && < BasicText style={styles.requireStar}>*</BasicText>}</BasicText>}
            <TextInput
                {...props}
                style={[styles.textInput, (error ? styles.errorBorderStyle : {}), style]}
            />
            {errorMessage ? error ? <BasicText style={styles.errorTextStyle}>{errorMessage}</BasicText> : <BasicText /> : null}
        </View>
    )
}


const styles = {
    content: {
    },
    errorBorderStyle: {
        borderWidth: 1,
        borderColor: 'red',
    },
    errorTextStyle: {
        fontSize: 12,
        opacity: .6,
        color: 'red',
    },
    textInput: {
        height: 40,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#aaa',
        borderRadius: 5
    },
    titleStlye: {

    },
    requireStar: {
        color: 'red',
    }
}