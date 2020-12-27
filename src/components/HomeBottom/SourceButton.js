import React, { useEffect, useState, useContext } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { color } from '../../helper';
import { BasicIcon, BasicText } from '../index'
import AppContext from '../../context'
import { getGeocodeCordToAddress } from '../../services'

const SourceButton = ({ onPressSearch }) => {


    const { sourceCoord } = useContext(AppContext)
    const [regionText, setRegionText] = useState("Nerden Bineceksin ?")
    useEffect(() => {
        getGeocodeCordToAddress(sourceCoord.latitude, sourceCoord.longitude).then(data => {
            //Genellikle : Cadde + Sokak + No, Bazen : Sokak + No + Posta Kodu  
            const str = data.address_components[2]?.short_name + " " + data.address_components[1]?.short_name + " " + data.address_components[0]?.short_name
            setRegionText(str)
            console.log("[*] Source Button, selectCoord, Location değiştiğinde ", str, data);
        })
    }, [sourceCoord])


    return (
        <TouchableOpacity
            onPress={() => onPressSearch('source')}
            activeOpacity={.75}
            style={styles.searchInput}>
            <BasicIcon style={styles.iconStyle} type="FontAwesome5" name="male" />
            <BasicText style={{ color: color.placeholder }}>{regionText}</BasicText>
        </TouchableOpacity>
    )
}

export default SourceButton

const styles = StyleSheet.create({
    searchInput: {
        marginHorizontal: 20,
        borderBottomWidth: 1,
        borderColor: color.placeholder,
        paddingVertical: 5,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconStyle: {
        fontSize: 20,
        width: 20,
        textAlign: 'center',
        marginRight: 5,
        color: color.orange
    }
})