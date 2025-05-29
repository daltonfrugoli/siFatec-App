import React, { useState, useEffect } from "react";

import { View, FlatList, Text, StatusBar, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Scores.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";
import { ScoreTile } from "../../compenents/ScoreTile";

// Test data
import * as testData from "../../../testData.json";

// Https 
import { getScores } from '../../services/Https'

export function Scores({ navigation, route }){

    // Spinner 
    const [spinnerState, setSpinnerState] = useState(true);

    const [studentScores, setStudentScores] = useState([]);

    useEffect(() => {
        getScores()
        .then((res) => {        
            setTimeout(() => {
                setStudentScores(res.data);
                setSpinnerState(false);
            }, 500)
        })
        .catch((error) => {
            console.log(error.error)
        })
    }, [])

    const ScoreTileComponent = ({ item, index }) => <ScoreTile item = { item } index = { index }/>
    
    return(
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header label = { 'Notas' }/>
            <ScrollView style = {{ flex: 1 }}>
                <FlatList
                    data = { studentScores }
                    renderItem = { ScoreTileComponent }
                    keyExtractor = { (_, index) => index.toString() }
                    numColumns = { 1 }
                    scrollEnabled = { false }
                />
            </ScrollView>
            <Footer/>
            { spinnerState == true ? 
                <>
                    <View style = {[ styles.spinner, { backgroundColor: "#000000", opacity: 0.3 } ]}>
                    </View>
                    <View style = {[ styles.spinner, ]}>
                        <ActivityIndicator size="large" color={ '#B70E0E' } />
                        <Text style = {{ color: '#FFFFFF', fontStyle: 'italic', marginTop: 3, fontWeight:'bold' }}>Carregando...</Text>
                    </View>
                </>
            : null } 
        </SafeAreaView>
    )
}