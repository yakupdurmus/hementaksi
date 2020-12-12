import React from 'react'
import { Text } from 'react-native'

export const BasicText = (props) => {
    const {
        h1, h2, h3,h4, style
    } = props
    return (
        <Text
            {...props}
            style={[
                styles.textStyle,
                h1 && styles.h1,
                h2 && styles.h2,
                h3 && styles.h3,
                h4 && styles.h4,
                style
            ]}
        >
            {props.children}
        </Text>
    )
}

const styles = {
    textStyle: {
        color: '#3e3e3e',
    },
    h1: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom:5,
    },
    h2: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom:7,
    },
    h3: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingBottom:10,
    },
    h4: {
        fontSize: 44,
        fontWeight: 'bold',
        paddingBottom:10,
    }

}