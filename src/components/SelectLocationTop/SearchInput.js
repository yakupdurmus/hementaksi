import React from 'react'
import { View, StyleSheet } from 'react-native'
import { BasicInput, BasicIcon } from '../index'
import { color } from '../../helper'

export const SearchInput = ({ onChangeText, onPressCancel, value, onPressSearch }) => {
    return (
        <View style={styles.searchInputContainer}>
            <BasicInput
                placeholder="🔍 Nereye gitmek istiyorsun? "
                autoFocus
                autoCapitalize={false}
                autoCompleteType={'street-address'}
                contextMenuHidden
                maxLength={30}
                returnKeyType={'search'}
                returnKeyLabel={"Ara"}
                onSubmitEditing={() => { onPressSearch && onPressSearch(value) }}
                blurOnSubmit={false}
                value={value}
                onChangeText={onChangeText}
                contentStyle={styles.searchInputContent}
                style={styles.searchInput}>
            </BasicInput>
            <BasicIcon
                onPress={onPressCancel}
                style={styles.basicIcon}
                name="close-a"
                type="Fontisto" />
        </View>
    )
}

const styles = StyleSheet.create({
    searchInputContainer: {
        backgroundColor: color.yellow,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    searchInputContent: {
        margin: 10,
        flex: 1,
    },
    searchInput: {
        backgroundColor: color.white
    },
    basicIcon: { fontSize: 20, padding: 5, paddingHorizontal: 10, }
})