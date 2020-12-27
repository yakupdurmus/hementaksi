import React, { useEffect, useState, useContext } from 'react'
import { View, Image } from 'react-native'
import { BasicText } from './index'
import { color } from '../helper'
import AppContext from '../context'
import { getGeocodeCordToAddress } from '../services';

//Haritanın ortasında duran pin resmi
export const MapPointer = () => {

    const { selectCoord } = useContext(AppContext)
    const [regionText, setRegionText] = useState("Konumunuz")
    useEffect(() => {

        // getGeocodeCordToAddress(selectCoord.latitude, selectCoord.longitude).then(data => {
        //     //Genellikle : Cadde + Sokak + No, Bazen : Sokak + No + Posta Kodu  
        //     const str = data.address_components[2]?.short_name + " " + data.address_components[1]?.short_name + " " + data.address_components[0]?.short_name
        //     setRegionText(str)
        //     console.log("selectCoord Location değiştiğinde ", str, data);
        // })
    }, [selectCoord])

    return (
        <View pointerEvents="none" style={{ position: 'absolute', zIndex: 2, top: 0, bottom: 0, left: 0, right: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                {/* <View style={{ backgroundColor: color.border2, padding: 3, borderRadius: 3, opacity: .5 }}><BasicText style={{ color: color.white, textAlign: 'center', fontSize: 12 }}>{regionText}</BasicText></View> */}
                <Image

                    style={{
                        width: 50,
                        height: 50,
                    }}
                    source={require('../assets/locationpinpersonb-64x64.png')} />
            </View>
        </View>
    )
}