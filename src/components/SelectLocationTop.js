import React from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import { color } from '../helper'
import { BasicInput } from './Basic/BasicInput'
import { BasicText } from './Basic/BasicText'

const data = [
    { text: "Levent Metro" },
    { text: "Levent Durak" },
    { text: "4.Levent" },
    { text: "Metorcity" },
    { text: "Safit Alışveriş merkezi" },
    { text: "Kanyon Alışveriş merkezi" },
    { text: "Levent Metro" },
    { text: "Levent Durak" },
    { text: "4.Levent" },
    { text: "Metorcity" },
    { text: "Safit Alışveriş merkezi" },
    { text: "Kanyon Alışveriş merkezi" },
    { text: "Levent Metro" },
    { text: "Levent Durak" },
    { text: "4.Levent" },
    { text: "Metorcity" },
    { text: "Safit Alışveriş merkezi" },
    { text: "Kanyon Alışveriş merkezi" },
]

const SearchInput = () => {
    return (
        <View style={styles.container}>
            <BasicInput
                placeholder="🔍 Nereye gitmek istiyorsun? "
                autoFocus
                //title="Gitmek istediğin yeri girin veya harita üzerinden seçim yapın"
                contentStyle={styles.searchInputContent}
                style={styles.searchInput}>
            </BasicInput>
        </View>
    )
}

const SearchContent = () => {
    return (
        <View style={{ backgroundColor: color.yellow, padding: 10 }}>
            <FlatList
                keyboardShouldPersistTaps="always"
                data={data.slice(0, 10)}
                keyExtractor={(item, index) => "list-" + index}
                ListHeaderComponent={() => {
                    return (
                        <TouchableOpacity activeOpacity={.75} style={{ padding: 10, paddingVertical: 15, backgroundColor: color.white, borderBottomWidth: 1, borderColor: color.border1 }}>
                            <BasicText>★ Haritadan Seç</BasicText>
                        </TouchableOpacity>
                    )

                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity activeOpacity={.75} style={{ padding: 10, paddingVertical: 15, backgroundColor: color.white, borderBottomWidth: 1, borderColor: color.border1 }}>
                            <BasicText style={{}}>{item.text}</BasicText>
                        </TouchableOpacity>
                    )
                }} />
        </View>
    )
}


export const SelectLocationTop = () => {
    return (
        <SafeAreaView style={styles.safeAreaStyle}>
            <SearchInput />
            <SearchContent />
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
    searchInputContent: {
        margin: 10,
    },
    searchInput: {
        backgroundColor: color.white
    }
})