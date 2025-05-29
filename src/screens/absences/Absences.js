import React, { useState, useEffect } from "react";

import { View, FlatList, Text, StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Absences.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";
import { AbsencesTile } from "../../compenents/AbsencesTile";

// Test data
import * as testData from "../../../testData.json";

// Chart
import PieChart from "react-native-pie-chart";

// Https
import { getAbsences } from "../../services/Https";

export function Absences({ navigation, route }){

    // Spinner 
    const [spinnerState, setSpinnerState] = useState(true);

    const [studentAbsences, setStudentAbsences] = useState([]);

    useEffect(() => {
        getAbsences()
        .then((res) => {        
            console.log(res.data);
            setTimeout(() => {
                setStudentAbsences(res.data);
                setSpinnerState(false);
            }, 500)
        })
        .catch((error) => {
            console.log(error.error)
        })
    }, [])  

    const AbsencesTileComponent = ({item, index}) => <AbsencesTile item = { item } index = { index }/>

    return(
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header label = { 'Faltas' }/>
            <FlatList
                data = { studentAbsences }
                renderItem = { AbsencesTileComponent }
                keyExtractor = { (_, index) => index.toString() }
                numColumns = { 1 }
            />
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