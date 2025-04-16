import React, { useState } from "react";

import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    StatusBar,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Dimensions
} from 'react-native';

import { Styles } from "./Home.style";
import { Footer } from "../../compenents/Footer";

// Plugins
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "react-native/Libraries/NewAppScreen";

export function Home({navigation, route}){

    const screenWidth = Dimensions.get('window').width;
    const [hasNotification, setHasNotification] = useState(true);

    const email = route.params.email;
    const password = route.params.password;
    const rememberMe = route.params.rememberMe

    const backgroundImage = require('../../assets/homeImage.png');

    const MENU_OPTIONS = [
        { label: 'Faltas', icon: "calendar-outline" },
        { label: 'Notas', icon: "reader-outline"},
        { label: 'Historico', icon: "file-tray-full-outline"},
        { label: 'Agenda', icon: "time-outline" },
    ];

    const ModuleButton = (props) => {

        return(
            <TouchableOpacity 
                style = {{ 
                    width: (screenWidth * 0.85 - 20) / 2, 
                    height: 100,
                    backgroundColor: '#E0E0E0',
                    marginBottom: 10,
                    borderRadius: 12,
                    padding: 10
                }}
                onPress = {() => {
                    console.log(props.label)
                }}
            >
                <View style = {{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
                    <Ionicons style = {{ fontSize: 40, color: '#8B8B8B' }} name = { props.icon }/>
                    <Ionicons style = {{ fontSize: 30, color: '#8B8B8B' }} name = "chevron-forward-circle-outline"/>
                </View>
                <Text style = {{ color: '#000000', marginLeft: 3 }}>{ props.label }</Text>
            </TouchableOpacity>
        )
    }

    return(
        <View style = {{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar translucent backgroundColor="transparent" />
            <View
                style = {{
                    width: '100%',
                    height: '35%',
                    backgroundColor: 'green',
                    borderBottomLeftRadius: 40,
                    borderBottomRightRadius: 40,
                    overflow: 'hidden'
                }}
            >
                <ImageBackground 
                    source = { backgroundImage }
                    resizeMode = "cover"
                    style = {{
                        flex: 1,
                        
                    }}
                >  
                    <View style = {{
                        ...StyleSheet.absoluteFillObject, // cobre todo o ImageBackground
                        backgroundColor: 'rgba(0,0,0,0.25)', // cor preta com transparência
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30,
                    }}/>
                    <SafeAreaView
                        style = {{
                            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
                        }}
                    >
                        <View
                            style = {{
                                width: '85%',
                                height: '100%',
                                alignSelf:'center',
                                paddingVertical: 30,
                                justifyContent: 'space-between'
                            }}
                        >
                            <View
                                style = {{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <View
                                    style = {{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 80,
                                        backgroundColor: '#D9D9D9',
                                        borderWidth: 3,
                                        borderColor: "#FFFFFF",
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Ionicons 
                                        name="person"
                                        style = {{
                                            color: '#B70E0E',
                                            fontSize: 30,
                                        }}
                                    />
                                </View>
                                <TouchableOpacity
                                    style = {{ 
                                        position: 'relative', 
                                        width: 50,
                                        height: 50,
                                        alignItems: 'center',
                                    }}
                                    onPress = {() => {
                                        console.log('notify');
                                        setHasNotification(!hasNotification);
                                    }}
                                >
                                    <Ionicons 
                                        name="notifications-outline"
                                        style = {{
                                            fontSize: 35,
                                            color: '#FFFFFF'
                                        }}    
                                    />
                                    <View
                                        style = {{
                                            opacity: hasNotification ? 1 : 0,
                                            position: 'absolute',
                                            width: 15,
                                            height: 15,
                                            borderRadius: 20,
                                            backgroundColor: '#B70E0E',
                                            borderWidth: 2,
                                            borderColor: '#FFFFFF',
                                            transform: [
                                            { translateX:  10 }
                                            ]
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style = {{ color: '#FFFFFF' }}>Bem-vindo(a) de volta!</Text>
                                <Text
                                    style = {{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#FFFFFF'
                                    }}
                                >Dalton Frugoli</Text>
                            </View>
                            <View style = {{ flexDirection: 'row' }}>
                                <Text
                                    style = {{
                                        fontSize: 15,
                                        color: '#FFFFFF'
                                    }}
                                ><Text style = {{ fontWeight: 'bold' }}>RA:</Text> 4886297356248</Text>
                                <Text
                                    style = {{
                                        fontSize: 15,
                                        marginLeft: 30,
                                        color: '#FFFFFF'
                                    }}
                                ><Text style = {{ fontWeight: 'bold' }}>Ciclo:</Text> 4</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
                <ScrollView contentContainerStyle = {{ alignItems: 'center' }}>
                    <View style = {{ paddingHorizontal: 5, backgroundColor: '#E4E4E4', height: 65, width: '85%', borderRadius: 20, marginVertical: 40, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style = {{ flexDirection: 'row', alignItems: 'center', height: '100%', width: '45%' }}>
                            <View style = {{ height: 48, width: 48, borderRadius: 48, borderColor: '#B70E0E', borderWidth: 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style = {{ color: '#000000', fontSize: 14 }}>99%</Text>
                            </View>
                            <Text style = {{ marginLeft: 10, flex: 1, flexWrap: 'wrap', color: '#545454' }}>
                                Percentual de progressão
                            </Text>
                        </View>
                        <View style = {{ flexDirection: 'row', alignItems: 'center', height: '100%', width: '45%' }}>
                            <View style = {{ height: 48, width: 48, borderRadius: 48, borderColor: '#B70E0E', borderWidth: 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style = {{ color: '#000000', fontSize: 14 }}>99%</Text>
                            </View>
                            <Text style = {{ marginLeft: 10, flex: 1, flexWrap: 'wrap', color: '#545454' }}>
                                Percentual de progressão
                            </Text>
                        </View>
                    </View>
                    <View style = {{ width: '85%' }}>               
                        <Text style = {{ marginLeft: 2, marginBottom: 10, fontWeight: 'bold', fontSize: 20, color: '#000000' }}>MENU</Text>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                            columnGap: 10,
                            rowGap: 10
                        }}>
                            {MENU_OPTIONS.map((item, index) => (
                                <ModuleButton key = { index } icon = { item.icon } label = { item.label } />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            <Footer/>
        </View>
    )
}