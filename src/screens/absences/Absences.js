import React, { useState } from "react";

import { View, FlatList, Text, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Absences.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";

// Test data
import * as testData from "../../../testData.json";

export function Absences({ navigation, route }){

    const AbsencesTile = ({ item, index }) => {

        return(
            <View
                style = {{
                    borderBottomWidth: 1,
                    borderColor: '#D8D8D8',
                    width: '100%',
                    alignItems: 'center'
                }}
            >
                <View
                    style = {{
                        flexDirection: 'row',
                        padding: 20,

                    }}
                >
                    <View style = {{ height: 10, width: 10, borderRadius: 10, backgroundColor: '#ADADAD', marginTop: 10, marginRight: 15 }}/>
                    <View style = {{ flex: 1 }}>
                        <Text style = {{ color: '#000000', fontSize: 20, fontWeight: 500 }}>{ item.subjectName }</Text>
                        <View style = {{ flexDirection: 'row' }}>
                            <Text style = {{ color: '#A83535', fontWeight: 600, fontSize: 16, marginRight: 20 }}>Faltas: <Text style = {{ color: '#545454', fontWeight: 400 }}>{ item.absences }</Text></Text>
                            <Text style = {{ color: '#545454', fontWeight: 600, fontSize: 16 }}>Presenças: <Text style = {{ fontWeight: 400 }}>{ item.presences }</Text></Text>
                        </View>
                    </View>
                    <View style = {{ height: 48, width: 48, borderRadius: 48, borderColor: '#B70E0E', borderWidth: 4, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style = {{ color: '#000000', fontSize: 14 }}>99%</Text>
                    </View>
                </View>
            </View>
        )
    }

    return(
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header label = { 'Faltas' }/>
            <FlatList
                data = { testData.absences }
                renderItem = { AbsencesTile }
                keyExtractor = { item => item.id }
                numColumns = { 1 }
            />
            <Footer/>
        </SafeAreaView>
    )
}