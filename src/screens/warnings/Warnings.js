import React, { useState, useEffect } from "react";

import { View, FlatList, Text, StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Warnings.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";
import { WarningsTile } from "../../compenents/WarningsTile";

// Test data
import * as testData from "../../../testData.json";

// Https
import { getMessages } from "../../services/Https";

export function Warnings({ navigation, route }){

    // Spinner 
    const [spinnerState, setSpinnerState] = useState(true);

    const [studentMessages, setStudentMessages] = useState([]);

    useEffect(() => {
        getMessages()
        .then((res) => {        
            console.log(res.data[0].messages);
            setTimeout(() => {
                setStudentMessages(res.data);
                setSpinnerState(false);
            }, 500)
        })
        .catch((error) => {
            console.log(error.error)
        })
    }, [])  

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
                }}>{ item.day }</Text>
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
                    data = { studentMessages }
                    renderItem = { WarningContainer }
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