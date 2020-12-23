import React, { useState, useEffect, useContext } from 'react'
import { SafeAreaView, StyleSheet, Keyboard } from 'react-native'
import { SearchContent } from './SearchContent'
import { SearchInput } from './SearchInput'

import { getQueryAutoComplete, getPlaceDetail } from '../../services'
import { color } from '../../helper'
import AppContext from '../../context'



let timer;
export const SelectLocationTop = (props) => {
    const { navigation, currentCoord, } = props

    const [searchTerm, setSearchTerm] = useState("")
    const [searchResult, setSearchResult] = useState([])
    const [historyResult, setHistoryResult] = useState([])
    const { selectCoord, setSelectCoord } = useContext(AppContext)


    const onChangeText = (term) => {
        setSearchTerm(term)
        timer && clearTimeout(timer)
        timer = setTimeout(() => {

            if (term.length > 2) {
                //TODO response içerisinde NEAR kısmı gözden geçirilecek 
                getQueryAutoComplete(term, currentCoord.latitude, currentCoord.longitude).then(data => {
                    setSearchResult(data)
                })
            }

        }, 500)
    }

    const onPressSearchItem = (selectedItem) => {

        const { place_id } = selectedItem
        Keyboard.dismiss()
        getPlaceDetail(place_id).then(data => {

            const { location } = data.geometry
            setSelectCoord({ ...selectCoord, ...{ latitude: location.lat, longitude: location.lng } })
            setSearchResult([]);
            setSearchTerm('');

        })

    }

    const onPressSearch = (term) => Keyboard.dismiss() //Keyboard On Press Search Button
    const onPressCancel = () => setSearchResult([]) //Search bar cancel buton

    return (
        <SafeAreaView style={styles.safeAreaStyle}>

            <SearchInput
                value={searchTerm}
                onChangeText={onChangeText}
                onPressCancel={onPressCancel}
                onPressSearch={onPressSearch} />

            <SearchContent
                searchResult={searchResult}
                onPressSearchItem={onPressSearchItem} />

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
    }
})