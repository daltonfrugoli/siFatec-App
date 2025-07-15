import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
  ScrollView,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import { CustomModal } from './CustomModal';
import moment from 'moment';

export const WarningsTile = ({ item, index }) => {

    const [modalIsVisible, setModalIsVisible] = useState(false);
    //const read = item.read
    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    //const title = item.subject.subjectName;

    const toggleExpand = () => {
        console.log('Show warning');
        setModalIsVisible(true);
    };

    const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [65, 155], // altura contraída e expandida
    });

    const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    });

    const WarningModal = (props) => {

        return(
            <CustomModal isVisible = { modalIsVisible } closeModal = { () => setModalIsVisible(false) }>
                <View style = {{ height: 70, width: 100, backgroundColor: '#FFFFFF' }}></View>
            </CustomModal>
        )
    }

    return (
        <TouchableOpacity onPress={toggleExpand} activeOpacity={0.9}>
            <View style = { styles.container }>
                <View style={styles.topRow}>
                    <View 
                        style = {{
                            height: 8,
                            width: 8,
                            borderRadius: 8,
                            backgroundColor: '#680000',//read ? '#787878' : '#680000',
                            marginRight: 15 
                        }}
                    />
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{ item.titulo }</Text>
                    <Text style = {{ color: '#545454', marginLeft: 15 }}>{ moment(item.created_at).format("HH:mm") }</Text>
                </View>
            </View>
            {/* <WarningModal/> */}
            <CustomModal isVisible = { modalIsVisible } closeModal = { () => setModalIsVisible(false) }>
                <View style = {{ position: 'relative', width: '85%', borderRadius: 20, alignItems: 'center', backgroundColor: '#FFFFFF', padding: 15, minHeight: 400, maxHeight: 600 }}>
                    <TouchableOpacity
                        onPress={() => setModalIsVisible(false)}
                        style = {{
                            padding: 3,
                            position: 'absolute', 
                            right: 8, 
                            top: 6 
                        }}
                    >
                        <Ionicons name="close-circle-outline" style = {{ color: '#ADADAD', fontSize: 25 }}/>
                    </TouchableOpacity>
                    <View
                        style = {{
                            width: '85%',
                            paddingLeft: 10,
                            borderLeftWidth: 1,
                            borderColor: '#000000',
                            marginTop: 15,
                            paddingRight: 15
                        }}
                    >
                        <Text style = {{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>{ item.titulo }</Text>
                        <Text style = {{ color: '#ADADAD', marginTop: 0 }}>{ moment(item.created_at).format("DD/MM/YYYY") } - { moment(item.created_at).format("HH:mm") }</Text>
                    </View>
                    <ScrollView 
                        showsVerticalScrollIndicator
                        style = {{
                            width: '85%',
                            paddingVertical: 0,
                            paddingHorizontal: 10,
                            borderRadius: 10,
                            borderColor: "#ADADAD",
                            borderWidth: 1,
                            marginVertical: 25
                        }}
                    >
                        <Text style = {{ color: '#000000', marginVertical: 15 }}>{ item.mensagem }</Text>
                    </ScrollView>
                </View>
            </CustomModal>
        </TouchableOpacity>
    );
};
  
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#eee',
        borderRadius: 12,
        marginVertical: 10,
        padding: 15,
        overflow: 'hidden',
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        flexShrink: 1,
        color: '#000000',
        fontSize: 20,
        fontWeight: '500',
        flex: 1
    },
    code: {
        flexShrink: 0,
        paddingTop: 2,
        fontSize: 16,
        color: '#ADADAD',
        marginRight: 8
    },
    extraInfo: {
        marginTop: 12,
        borderTopWidth: 1,
        borderColor: '#ccc',
        paddingTop: 15,
    },
    professor: {
        color: '#000000',
        fontSize: 15
    },
    detailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    timetableRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeBox: {
        backgroundColor: '#680000',
        color: '#FFFFFF',
        borderRadius: 20,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginHorizontal: 4,
        fontSize: 14,
    },
    room: {
        color: '#000000',
        marginLeft: 4,
        marginRight: 6,
        fontSize: 15
    },
});
  