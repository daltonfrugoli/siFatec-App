import React, { useState, useEffect } from "react";

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
import PieChart from "react-native-pie-chart";

// Https
import { getProfile } from "../../services/Https";

export function Home({navigation, route}){

    const [studentName, setStudentName] = useState('');
    const [studentRa, setStudentRa] = useState('');
    const [studentPeriod, setStudentPeriod] = useState();
    const screenWidth = Dimensions.get('window').width;
    const backgroundImage = require('../../assets/homeImage.png');
    const MENU_OPTIONS = [
        { label: 'Faltas', icon: 'calendar-outline', screen: 'Absences' },
        { label: 'Notas', icon: 'reader-outline', screen: 'Scores' },
        { label: 'Historico', icon: 'file-tray-full-outline', screen: 'History' },
        { label: 'Agenda', icon: 'time-outline', screen: 'Schedule' },
    ];

    // Notification alert
    const [hasNotification, setHasNotification] = useState(true);

    // Chart config 
    const widthAndHeight = 48
    const series = [
        { value: 430, color: '#B70E0E' },
        { value: 321, color: '#A09898' }
    ]
    const [progress, setProgress] = useState('65');
    const [income, setIncome] = useState('8.2');

    useEffect(() => {
        getProfile()
        .then((res) => {        
            console.log(res.data);
            setStudentName(res.data.name);
            setStudentRa(res.data.registration_number);
            setStudentPeriod(res.data.student_period);
        })
        .catch((error) => {
            console.log(error.error)
        })
    }, [])

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
                    navigation.navigate(props.screen);
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
                                paddingTop: 20,
                                justifyContent: 'space-between',
                                paddingBottom: 25
                            }}
                        >
                            <View
                                style = {{
                                    width: '100%',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    flex: 1
                                }}
                            >
                                <View
                                    style = {{
                                        height: 100,
                                        width: 100,
                                        borderRadius: 100,
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
                                        marginTop: 5
                                    }}
                                    onPress = {() => {
                                        console.log('notify');
                                        setHasNotification(!hasNotification);
                                        navigation.navigate('Warnings');
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
                            <View
                                style = {{ marginBottom: 20 }}
                            >
                                <Text style = {{ color: '#FFFFFF' }}>Bem-vindo(a) de volta!</Text>
                                <Text
                                    style = {{
                                        fontSize: 25,
                                        fontWeight: 'bold',
                                        color: '#FFFFFF'
                                    }}
                                >{ studentName }</Text>
                            </View>
                            <View style = {{ flexDirection: 'row' }}>
                                <Text
                                    style = {{
                                        fontSize: 15,
                                        color: '#FFFFFF'
                                    }}
                                ><Text style = {{ fontWeight: 'bold' }}>RA:</Text> { studentRa }</Text>
                                <Text
                                    style = {{
                                        fontSize: 15,
                                        marginLeft: 30,
                                        color: '#FFFFFF'
                                    }}
                                ><Text style = {{ fontWeight: 'bold' }}>Ciclo:</Text> { studentPeriod }</Text>
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
                <ScrollView contentContainerStyle = {{ alignItems: 'center' }}>
                    <View style = {{ paddingHorizontal: 5, backgroundColor: '#E4E4E4', height: 65, width: '85%', borderRadius: 20, marginVertical: 40, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <View style = {{ flexDirection: 'row', alignItems: 'center', height: '100%', width: '45%' }}>
                            <View
                                style = {{
                                    position: 'relative',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style = {{ position: 'absolute', fontSize: 13, color: '#000000' }}>{ progress }%</Text>
                                <PieChart widthAndHeight={widthAndHeight} series={series} cover={0.80} />
                            </View>
                            <Text style = {{ marginLeft: 10, flex: 1, flexWrap: 'wrap', color: '#545454' }}>
                                Percentual de progressão
                            </Text>
                        </View>
                        <View style = {{ flexDirection: 'row', alignItems: 'center', height: '100%', width: '45%' }}>
                            <View
                                style = {{
                                    position: 'relative',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <Text style = {{ position: 'absolute', fontSize: 13, color: '#000000' }}>{ income }</Text>
                                <PieChart widthAndHeight={widthAndHeight} series={series} cover={0.80} />
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
                                <ModuleButton key = { index } icon = { item.icon } label = { item.label } screen = { item.screen } />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            <Footer screen = { "Home" }/>
        </View>
    )
}