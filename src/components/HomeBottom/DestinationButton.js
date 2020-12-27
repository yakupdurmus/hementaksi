import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { color } from '../../helper';
import { BasicIcon, BasicText } from '../index'



const DestinationButton = ({ onPressSearch }) => {
    return (
        <TouchableOpacity
            onPress={() => onPressSearch('destination')}
            activeOpacity={.75}
            style={styles.searchInput}>
            <BasicIcon style={styles.iconStyle} type="FontAwesome5" name="map-pin" />
            <BasicText style={{ color: color.placeholder }}>Nereye Gitmek İstiyorsun ?</BasicText>
        </TouchableOpacity>
    )
}

export default DestinationButton

const styles = StyleSheet.create({
    searchInput: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: color.placeholder,
        paddingVertical: 5,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconStyle: {
        fontSize: 20,
        width: 20,
        textAlign: 'center',
        marginRight: 5,
        color: color.orange
    }
})