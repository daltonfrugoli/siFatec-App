import React, { useState } from "react";

import { View, FlatList, Text, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./History.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";
import { HistoryTile } from "../../compenents/HistoryTile";

// Test data
import * as testData from "../../../testData.json";

export function History({ navigation, route }){

    const RenderHistoryTile = ({ item, index }) => {

        return(
            <HistoryTile item = { item } index = { index }/>
        )
    }

    const PeriodContainer = ({ item, index }) => {

        return(
            <View style = {{
                width: '100%',
                paddingHorizontal: 20,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderColor: '#D6D6D6'
            }}>
                <View style = {{ flexDirection: 'row', alignItems: 'center', marginBottom: 15 }}>
                    <Text style = {{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#680000',
                        marginLeft: 10
                    }}>{ item.year }</Text>
                    <View style = {{ height: 5, width: 5, backgroundColor: '#ADADAD', borderRadius: 5, marginHorizontal: 5 }}/>
                    <Text style = {{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: '#680000',
                    }}>{ item.period }</Text>
                </View>
                
                <FlatList
                    data = { item.subjects }
                    renderItem = { RenderHistoryTile }
                    keyExtractor = { item => item.id }
                    numColumns = { 1 }
                />
            </View>
        )
    }

    return(
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header label = { 'Histórico' }/>
            <View style = {{ flex: 1 }}>
            <FlatList
                data = { testData.history }
                renderItem = { PeriodContainer }
                keyExtractor = { item => item.id }
                numColumns = { 1 }
                //scrollEnabled = { false }
            />
            </View>
            <Footer/>
        </SafeAreaView>
    )
}