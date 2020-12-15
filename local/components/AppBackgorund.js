import React from 'react'
import { View, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const borderRadius = 100;
const backgroundColor1 = "#3498db";
const backgroundColor2 = "#e74c3c";
const opacity = .4;

export const AppBackground = (props) => {
    switch (props.type) {
        case "single":
            return renderSingle();
        case "header":
            return renderHeader();

        default:
            return renderFull();


    }
}

const renderFull = () => {
    return <View style={{ width: screenWidth, height: screenHeight, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', width: screenWidth, height: screenWidth + 150, backgroundColor: backgroundColor1, borderRadius: borderRadius / 4, opacity: opacity }} />
        <View style={{ position: 'absolute', width: screenWidth + 150, height: screenWidth + 150, backgroundColor: backgroundColor1, borderRadius: borderRadius, opacity: opacity, transform: [{ rotate: '45deg' }] }} />
        <View style={{ position: 'absolute', width: screenWidth, height: screenWidth, backgroundColor: backgroundColor1, borderRadius: borderRadius, opacity: opacity, transform: [{ rotate: '80deg' }] }} />
        <View style={{ position: 'absolute', width: screenWidth, height: screenWidth, backgroundColor: backgroundColor1, borderRadius: borderRadius, opacity: opacity, transform: [{ rotate: '30deg' }] }} />
        <View style={{ position: 'absolute', width: screenWidth - 150, height: screenWidth - 150, backgroundColor: backgroundColor1, borderRadius: borderRadius, opacity: opacity, transform: [{ rotate: '80deg' }] }} />
    </View>
}
const renderSingle = () => {
    return <View style={{ width: screenWidth, height: screenHeight, position: 'absolute', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ position: 'absolute', width: screenWidth, height: screenWidth + 150, backgroundColor: backgroundColor1, borderRadius: borderRadius / 4, opacity: opacity }} />
    </View>
}
const renderHeader = () => {
    return <View style={{ width: screenWidth, height: screenHeight, position: 'absolute', }}>
        <View style={{ width: '200%', height: 200,marginTop:-50,marginLeft:-150, backgroundColor: backgroundColor2, opacity: .6,transform:[{rotate:'45deg'}] }} />
        <View style={{ width: '150%', height: screenHeight,marginTop:5,marginLeft:-0, backgroundColor: backgroundColor1,opacity: .6 ,transform:[{rotate:'45deg'}] }} />
    </View>
}