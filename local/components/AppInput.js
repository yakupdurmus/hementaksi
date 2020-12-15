import React, { useState } from 'react'
import { View } from 'react-native'
import { Input, Item, Button, Text, Icon } from 'native-base'

export const AppInput = ({ autoCapitalize, input, inputChange, title, returnKeyType, onSubmitEditing, inputStyle, textStyle, containerStyle, secureTextEntry, reqired, placeholder, autoFocus }) => {
    const [isShowingText, setIsShowingText] = useState(secureTextEntry);
    return <View style={{ marginBottom: 5 }}>
        <Text style={Object.assign({ color: '#fff', marginBottom: 5, fontSize: 14,  }, textStyle)}>{title}{reqired && <Text style={{ color: 'red' }}> *</Text>}</Text>
            <Item style={Object.assign({ height: 50, backgroundColor: '#fff', borderRadius: 10,borderBottomWidth:1,borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderColor:'#aaa' }, containerStyle)}>
                <Input
                    autoFocus={autoFocus}
                    placeholderTextColor="#ccc"
                    style={Object.assign({ paddingLeft: 10, borderColor: '#aaa', borderRadius: 10,  }, inputStyle)}
                    placeholder={placeholder}
                    value={input}
                    autoCapitalize={autoCapitalize}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    secureTextEntry={isShowingText}
                    onChangeText={(input) => inputChange(input)} />
                {secureTextEntry != undefined && <Icon onPress={() => {
                    if (secureTextEntry != undefined) setIsShowingText(!isShowingText);
                }} style={{ color: '#555', paddingLeft: 10, paddingRight: 10 }} active name={isShowingText ? 'eye' : 'eye-off'} />}
            </Item>
    </View>
}