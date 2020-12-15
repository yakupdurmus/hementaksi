import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { BasicText } from './BasicText'

export const BasicButton = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={.75}
            {...props}
            style={[
                styles.buttonStyle,
                props.border ? styles.bordered : {},
                props.left ? styles.left : {},
                props.right ? styles.right : {},
                props.light ? styles.light : {},
                props.danger ? styles.danger : {},
                props.primary ? styles.primary : {},
                props.style
            ]}
        >
            <BasicText
                {...props.textProps}
                style={[
                    props.danger ? styles.danger : {},
                    props.primary ? styles.primary : {},
                    props.textStyle,
                ]}
            >{props.children}{props.label}</BasicText>
        </TouchableOpacity>
    )
}

/*
genel #fff  #f7f7f7  #ddd #3e3e3e #000 #f73f40 #e1393a #00b7cd
border #eee
light button #ddd
danger button #f73f40
primary button : #00b7cd

*/

const styles = StyleSheet.create({
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
    },
    light: {
        backgroundColor: '#ddd',
        borderRadius: 3,
    },
    danger: {
        backgroundColor: '#f73f40',
        color:'#fff',
        borderRadius: 3,
    },
    primary: {
        backgroundColor: '#00b7cd',
        color:'#fff',
        borderRadius: 3,
    }

})