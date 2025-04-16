import React from "react";

import { View, ToucableOpacity, TouchableOpacity } from 'react-native';

// Plugins
import Ionicons from "react-native-vector-icons/Ionicons";

export const Footer = () => {

    return(
        <View
            style = {{
                width: '100%',
                borderTopWidth: 1,
                borderColor: '#D8D8D8',
                height: 65,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity 
                onPress = {() => {
                    console.log('HomeFooter');
                }}
                style = {{ paddingVertical: 10, paddingHorizontal: 50 }}
            >
                <Ionicons style = {{ fontSize: 30, color: '#747474' }} name="home-outline"/>
            </TouchableOpacity>
            <View style = {{ height: '60%', backgroundColor: '#D8D8D8', width: 1 }}/>
            <TouchableOpacity
                onPress = {() => {
                    console.log('LogoutFooter');
                }}
                style = {{ paddingVertical: 10, paddingHorizontal: 50 }}
            >
                <Ionicons style = {{ fontSize: 35, color: '#747474' }} name="log-out-outline"/>
            </TouchableOpacity>
        </View>
    )
}