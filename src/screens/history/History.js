import React, { useState, useEffect } from "react";

import { View, FlatList, Text, StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./History.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";
import { HistoryTile } from "../../compenents/HistoryTile";

// Test data
import * as testData from "../../../testData.json";

// Https
import { getHistory } from "../../services/Https";

export function History({ navigation, route }){

    // Spinner 
    const [spinnerState, setSpinnerState] = useState(true);

    const [studentHistory, setStudentHistory] = useState([]);

    useEffect(() => {
        getHistory()
        .then((res) => {        
            console.log(res.data[0].subjects);
            setTimeout(() => {
                setStudentHistory(res.data);
                setSpinnerState(false);
            }, 500)
        })
        .catch((error) => {
            console.log(error.error)
        })
    }, [])

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
                    keyExtractor = { (_, index) => index.toString() }
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
                data = { studentHistory }
                renderItem = { PeriodContainer }
                keyExtractor = { (_, index) => index.toString() }
                numColumns = { 1 }
                //scrollEnabled = { false }
            />
            </View>
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