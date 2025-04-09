import React from "react";

import {
    SafeAreaView,
    View,
    Text
} from 'react-native';

import { Styles } from "./Home.style";

export function Home({navigation, route}){

    const email = route.params.email;
    const password = route.params.password;
    const rememberMe = route.params.rememberMe

    return(
        <SafeAreaView style = {{ flex: 1 }}>
            <View style = { Styles.screenContainer }>
                <View style = {{ flexDirection: 'row' }}>
                    <Text style = { Styles.title }>Email: </Text>
                    <Text>{ email }</Text>
                </View>
                <View style = {{ flexDirection: 'row' }}>
                    <Text style = { Styles.title }>Email: </Text>
                    <Text>{ password }</Text>
                </View>
                <View style = {{ flexDirection: 'row' }}>
                    <Text style = { Styles.title }>Remember me? </Text>
                    <Text>{ rememberMe? 'true' : 'false' }</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}