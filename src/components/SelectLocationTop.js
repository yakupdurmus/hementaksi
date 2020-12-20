import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, FlatList, TouchableOpacity, Keyboard } from 'react-native'
import { BasicInput, BasicText, BasicIcon } from './index'
import { color, mockSearchData } from '../helper'
import { Content } from 'native-base'

const SearchInput = ({ onChangeText, onPressCancel, value, onPressSearch }) => {
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
                onSubmitEditing={() => { onPressSearch(value) }}
                blurOnSubmit={false}
                value={value}
                onChangeText={onChangeText}
                contentStyle={styles.searchInputContent}
                style={styles.searchInput}>
            </BasicInput>
            <BasicIcon onPress={onPressCancel} style={{ fontSize: 20, padding: 5, paddingHorizontal: 10, }} name="close-a" type="Fontisto" />
        </View>
    )
}

const SearchContent = ({ searchResult, onPressSearchItem }) => {
    return (
        <Content style={{ backgroundColor: color.yellow, padding: 10 }}>
            <FlatList
                keyboardShouldPersistTaps="always"
                data={searchResult?.slice(0, 10)}
                keyExtractor={({ item, index }) => "list-" + index}
                ListHeaderComponent={() => {
                    return (
                        <TouchableOpacity onPress={() => onPressSearchItem(-1)} activeOpacity={.75} style={{ padding: 10, paddingVertical: 15, backgroundColor: color.white, borderBottomWidth: 1, borderColor: color.border1 }}>
                            <BasicText>★ Haritadan Seç</BasicText>
                        </TouchableOpacity>
                    )

                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            onPress={() => { onPressSearchItem(index) }}
                            activeOpacity={.75} style={{ padding: 10, paddingVertical: 15, backgroundColor: color.white, borderBottomWidth: 1, borderColor: color.border1 }}>
                            <BasicText>{item.text}</BasicText>
                        </TouchableOpacity>
                    )
                }} />
        </Content>
    )
}

let timer;
export const SelectLocationTop = ({ navigation }) => {

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [historyResult, setHistoryResult] = useState([])

    useEffect(() => {
    }, [])

    const onChangeText = (term) => {

        setSearchTerm(term)
        timer && clearTimeout(timer)
        timer = setTimeout(() => {

            if (term.length > 2) {
                setSearchResult(mockSearchData)
            }

        }, 500)
    }

    const onPressSearchItem = (id) => {
        setSearchResult([])
        navigation.goBack()

    }
    const onPressCancel = () => {
        setSearchTerm('')
        setSearchResult([])
    }
    const onPressSearch = (term) => {
        Keyboard.dismiss()
        setSearchTerm('')
        setSearchResult([])
    }



    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <SearchInput value={searchTerm} onChangeText={onChangeText} onPressCancel={onPressCancel} onPressSearch={onPressSearch} />
            <SearchContent searchResult={searchResult} onPressSearchItem={onPressSearchItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeAreaStyle: {
        backgroundColor: color.yellow,
        position: 'absolute',
        zIndex: 5,
        width: '100%'
    },
    container: {
        backgroundColor: color.yellow,
    },
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
    }
})