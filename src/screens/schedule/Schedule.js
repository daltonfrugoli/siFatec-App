import React, { useState } from "react";

import { View, FlatList, Text} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

// Styles
import { styles } from "./Schedule.style";

// Components
import { Header } from "../../compenents/Header";
import { Footer } from "../../compenents/Footer";

export function Schedule({ navigation, route }){

    return(
        <SafeAreaView style = {{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}>
            <Header label = { 'Agenda' }/>
            <View style = {{ flex: 1 }}></View>
            <Footer/>
        </SafeAreaView>
    )
}