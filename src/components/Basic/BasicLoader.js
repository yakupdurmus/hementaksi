import React from 'react'
import { View } from 'react-native'
import Spinner from 'react-native-spinkit'
import { color } from '../../helper'

export const BasicLoader = (props) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner
                size={50}
                color={color.white}
                type="ArcAlt"
                {...props}
            />
        </View>
    )
}