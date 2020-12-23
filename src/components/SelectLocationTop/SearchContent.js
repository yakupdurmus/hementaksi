import React from 'react'
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import { BasicText } from '../index'
import { color, capitalize } from '../../helper'
import { Content } from 'native-base'

export const SearchContent = ({ searchResult, onPressSearchItem }) => {
    return (
        <Content style={styles.content}>
            <FlatList
                keyboardShouldPersistTaps="always"
                data={searchResult}
                keyExtractor={({ item, index }) => "list-" + index}
                ListHeaderComponent={() => {
                    if (!searchResult || searchResult.length == 0) return null
                    return (
                        <TouchableOpacity
                            onPress={() => onPressSearchItem(-1)}
                            activeOpacity={.75}
                            style={styles.listItem}>
                            <BasicText h1>★ Haritadan Seç</BasicText>
                        </TouchableOpacity>
                    )

                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { onPressSearchItem(item) }}
                            activeOpacity={.75} style={styles.listItem}>
                            <BasicText h1>{capitalize(item.structured_formatting.main_text)}</BasicText>
                            <BasicText style={{ fontSize: 12 }}>{capitalize(item.structured_formatting.secondary_text)}</BasicText>
                        </TouchableOpacity>
                    )
                }} />
        </Content>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: color.yellow,
        padding: 10
    },
    listItem: {
        padding: 10,
        paddingVertical: 15,
        backgroundColor: color.white,
        borderBottomWidth: 1,
        borderColor: color.border1
    },

})