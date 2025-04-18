import React, { useState } from "react";

import { View, FlatList, Text, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Scores.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";

// Test data
import * as testData from "../../../testData.json";

export function Scores({ navigation, route }){

    const EvaluationTile = ({ item, index }) => {

        return(
            <View style = {{ backgroundColor: index % 2 == 0 ? '#F5F5F5' : '#E4E4E4', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 5 }}>
                <View>
                    <View style = {{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                        <Text style = {{ color: '#000000', fontWeight: 700 }}>Avaliação</Text>
                        <View style = {{ backgroundColor: '#000000', height: 3, width: 3, borderRadius: 3, marginHorizontal: 5 }}/>
                        <Text style = {{ color: '#000000' }}>{ item.name }</Text>
                    </View>
                    <Text style = {{ color: '#000000' }}>{ item.date }</Text>
                </View>
                <View>
                    <Text style = {{ color: '#000000', marginBottom: 5 }}><Text style = {{ fontWeight: 700 }}>Nota:</Text> { item.score }</Text>
                    <Text style = {{ color: '#000000' }}><Text style = {{ fontWeight: 700 }}>Peso:</Text> { item.weight }</Text>
                </View>
            </View>
        )
    }

    const ScoresTile = ({ item, index }) => {
    
        return(
            <View
                style = {{
                    borderBottomWidth: 1,
                    borderColor: '#D8D8D8',
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingBottom: 20
                }}
            >
                <View
                    style = {{
                        flexDirection: 'row',
                        paddingVertical: 15,
                    }}
                >
                    <View style = {{ height: 10, width: 10, borderRadius: 10, backgroundColor: '#ADADAD', marginTop: 10, marginRight: 15 }}/>
                    <Text style = {{ color: '#000000', fontSize: 20, fontWeight: 500, flex: 1 }}>{ item.subjectName }</Text>
                    <View style = {{ backgroundColor: '#A0F5B9', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                        <Text style = {{ color: '#000000' }}><Text style = {{ fontWeight: 600 }}>Média:</Text> 7.6</Text>
                    </View>
                </View>
                <FlatList
                    data = { item.evaluations }
                    renderItem = { EvaluationTile }
                    keyExtractor = { item => item.id }
                    numColumns = { 1 }
                />
            </View>
        )
    }

    return(
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header label = { 'Notas' }/>
            <View style = {{ flex: 1 }}>
                <FlatList
                    data = { testData.scores }
                    renderItem = { ScoresTile }
                    keyExtractor = { item => item.id }
                    numColumns = { 1 }
                />
            </View>
            <Footer/>
        </SafeAreaView>
    )
}