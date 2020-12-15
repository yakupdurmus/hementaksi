import React from 'react'
import { Text, View } from 'react-native'
import Spinner from 'react-native-spinkit'

export const BasicLoader = (props) => {

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Spinner color="#3e3e3e" type="Plane" />
        </View>
    )
}