import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native'
import { ListItem, Left, Body, Right } from 'native-base';
import { BasicText, BasicIcon } from '../components'
import { appVersion } from '../helper'
const Settings = (props) => {

    const RenderItem = ({ text, value, type, iconType, iconName, description, rightIconName, rightIconType }) => {
        if (type == "title")
            return (
                <ListItem icon>
                    <Body>
                        <BasicText style={{ fontWeight: '600' }}>{text}</BasicText>
                    </Body>
                </ListItem>
            )

        return (
            <ListItem icon onPress={() => { }}>
                {iconName && <Left><BasicIcon type={iconType ? iconType : "MaterialIcons"} style={{ color: "#f03a3a", width: 32, marginLeft: -5, marginRight: -10, fontSize: 23 }} active name={iconName} /></Left>}
                <Body>
                    <BasicText>{text}</BasicText>
                </Body>
                <Right>
                    <BasicText style={{ fontSize: 14 }}>{value}</BasicText>
                    {rightIconName && <BasicIcon type={rightIconType ? rightIconType : "MaterialIcons"} style={{ color: "#f03a3a", width: 32, marginLeft: -5, marginRight: 0, fontSize: 23 }} active name={rightIconName} />}
                </Right>

            </ListItem>
        )
    }

    return (
        <>
            <View style={{ flex: 1 }}>
                <ScrollView>
                    <RenderItem type="title" text="Hesap Ayarları" />
                    <View style={{ backgroundColor: 'white' }}>
                        <RenderItem text="Üyeliğim" value="Standart" iconName="person-outline" />
                    </View>

                    <RenderItem type="title" text="Uygulama Ayarları" />
                    <View style={{ backgroundColor: 'white' }}>
                        <RenderItem text="Kelime Sayısı" iconName="grade" />
                        <RenderItem text="Gizlilik" iconName="security" />
                        <RenderItem text="Sözleşme" iconName="assignment" />
                        <RenderItem text="Sıkça Sorulan Sorular" iconType="AntDesign" iconName="questioncircleo" />
                        <RenderItem text="Geri Bildirim" rightIconType="Feather" rightIconName="external-link" iconType="FontAwesome" iconName="pencil-square-o" />
                        <RenderItem text="Uygulama Dili" iconName="language" />
                        <RenderItem iconName="mail-outline" text="İletişim" value="info@ydsdil.com" />
                    </View>

                    <RenderItem type="title" text="Premium" />
                    <View style={{ backgroundColor: 'white' }}>
                        <RenderItem text="Üyeliği Yeniden Yükle" iconType="FontAwesome" iconName="diamond" />
                        <RenderItem text="Çıkış Yap" iconName="logout" iconType="AntDesign" />
                    </View>

                    <RenderItem type="title" text="Uygulama Hakkında" />
                    <View style={{ backgroundColor: 'white', padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                            style={{ width: '100%', height: 50,marginBottom:10 }}
                            resizeMode="contain"
                            source={{ url: 'https://cdn.iconscout.com/icon/free/png-256/languages-1891043-1597953.png' }}
                        />
                        <BasicText style={{ color: '#ddd', fontSize: 12, textAlign: 'center' }}>YDS App {appVersion}v{"\n"}All Rights Reserved.</BasicText>
                    </View>
                </ScrollView>
            </View>

        </>
    )
};




const styles = StyleSheet.create({
    containerStyle: {
        padding: 20,
        flex: 1,
        backgroundColor: '#00b7cd'
    },
    imageStyle: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },

})

export default React.memo(Settings);

