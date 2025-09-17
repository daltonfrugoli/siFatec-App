import React, { useState, useEffect } from "react";

import { View, FlatList, Text, StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Schedule.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";
import { ScheduleTile } from "../../compenents/ScheduleTile";

// Test data
import * as testData from "../../../testData.json";

// Https 
import { getSchedule } from "../../services/Https";

export function Schedule({ navigation, route }){

    // Spinner 
    const [spinnerState, setSpinnerState] = useState(true);

    const [studentSchedule, setStudentSchedule] = useState([]);

    useEffect(() => {
        getSchedule()
        .then((res) => {        
            console.log(res.data[0].subjects);
            setTimeout(() => {
                setStudentSchedule(res.data);
                setSpinnerState(false);
            }, 500)
        })
        .catch((error) => {
            console.log(error.error)
        })
    }, [])

    const RenderScheduleTile = ({ item, index }) => {

        return(
            <ScheduleTile item = { item } index = { index }/>
        )
    }

    const DayContainer = ({ item, index }) => {

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
                }}>{ item.week_day }</Text>
                <FlatList
                    data = { item.subjects }
                    renderItem = { RenderScheduleTile }
                    keyExtractor = { (_, index) => index.toString() }
                    numColumns = { 1 }
                />
            </View>
        )
    }

    return(
        <SafeAreaView style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Header label = { 'Agenda' }/>
            <View style = {{ flex: 1 }}>
            <FlatList
                data = { studentSchedule }
                renderItem = { DayContainer }
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