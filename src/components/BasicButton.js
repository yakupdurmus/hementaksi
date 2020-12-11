import React from 'react'
import { TouchableOpacity } from 'react-native'
import { BasicText } from './BasicText'

export const BasicButton = (props) => {
    return (
        <TouchableOpacity
            {...props}
            style={[
                styles.buttonStyle,
                props.border ? styles.bordered : {},
                props.left ? styles.left : {},
                props.right ? styles.right : {},
                props.style
            ]}
        >
            <BasicText
                {...props.textProps}
            >{props.children}{props.label}</BasicText>
        </TouchableOpacity>
    )
}

const styles = {
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    bordered: {
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 3,
    },
    textStyle: {
    },
    left: {
        alignSelf: 'flex-start',
    },
    right: {
        alignSelf: 'flex-end'
    }

}