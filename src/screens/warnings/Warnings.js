import React, { useState } from "react";

import { View, FlatList, Text, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Warnings.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";
import { WarningsTile } from "../../compenents/WarningsTile";

// Test data
import * as testData from "../../../testData.json";

export function Warnings({ navigation, route }){

    const RenderWarningsTile = ({ item, index }) => {

        return(
            <WarningsTile item = { item } index = { index }/>
        )
    }

    const WarningContainer = ({ item, index }) => {

        return(
            <View style = {{
                width: '100%',
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: '#D6D6D6'
            }}>
                <Text style = {{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#680000',
                    marginBottom: 15,
                    marginLeft: 10
                }}>{ item.date }</Text>
                <FlatList
                    data = { item.messages }
                    renderItem = { RenderWarningsTile }
                    keyExtractor = { item => item.id }
                    numColumns = { 1 }
                />
            </View>
        )
    }

    return(
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Header label = { 'Avisos' }/>
            <View style = {{ flex: 1 }}>
            <FlatList
                data = { testData.warnings }
                renderItem = { WarningContainer }
                keyExtractor = { item => item.id }
                numColumns = { 1 }
                //scrollEnabled = { false }
            />
            </View>
            <Footer/>
        </SafeAreaView>
    )
}