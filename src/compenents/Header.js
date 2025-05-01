import React from "react";

import { View, Text, TouchableOpacity } from "react-native";

// Plugins
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export const Header = (props) => {

    const navigation = useNavigation();

    return(
        <View style = {{
            width: '100%',
            height: 65,
            borderBottomWidth: 1,
            borderColor: '#D8D8D8',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <TouchableOpacity
                style = {{ position: 'absolute', left: 15 }}
                onPress = { () => navigation.goBack() }
            >
                <Ionicons style = {{ color: '#ADADAD', fontSize: 35 }} name="chevron-back-circle-outline"/>
            </TouchableOpacity>
            <Text style = {{ color: '#000000', fontWeight: 600, fontSize: 24 }}>{ props.label }</Text>
        </View>
    )
}