import React from "react";

import { View, ToucableOpacity, TouchableOpacity } from 'react-native';

// Local storage
import { db } from "../App";

// Plugins
import Ionicons from "react-native-vector-icons/Ionicons";

// Navigation
import { useNavigation } from "@react-navigation/native";

export const Footer = ({ screen }) => {

    const navigation = useNavigation();

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
                    navigation.navigate('Home');
                }}
                style = {{ paddingVertical: 10, paddingHorizontal: 50 }}
            >
                <Ionicons style = {{ fontSize: 30, color: screen == "Home" ? '#B01C1C' : '#747474' }} name="home-outline"/>
            </TouchableOpacity>
            <View style = {{ height: '60%', backgroundColor: '#D8D8D8', width: 1 }}/>
            <TouchableOpacity
                onPress = {() => {
                    console.log('LogoutFooter');
                        navigation.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });

                    db.transaction((tx) => {
                        tx.executeSql(
                            'DELETE FROM logged_user;',
                            [],
                            () => {
                                console.log('Registro(s) removido(s) com sucesso.');
                            },
                            (tx, error) => {
                                console.log('Erro ao deletar registro:', error);
                            }
                        );
                    });
                      
                }}
                style = {{ paddingVertical: 10, paddingHorizontal: 50 }}
            >
                <Ionicons style = {{ fontSize: 35, color: '#747474' }} name="log-out-outline"/>
            </TouchableOpacity>
        </View>
    )
}