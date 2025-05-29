import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Easing,
} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import moment from 'moment';

export const ScheduleTile = ({ item, index }) => {

    const [expanded, setExpanded] = useState(false);
    const animation = useRef(new Animated.Value(0)).current;
    //const title = item.subject.subjectName;

    const toggleExpand = () => {
    Animated.timing(animation, {
        toValue: expanded ? 0 : 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: false,
    }).start();

    setExpanded(!expanded);
    };

    const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [65, 155], // altura contraída e expandida
    });

    const rotateIcon = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
    });

    return (
        <TouchableOpacity onPress={toggleExpand} activeOpacity={0.9}>
            <Animated.View style={[styles.container, { height: heightInterpolate }]}>
            <View style={styles.topRow}>
                <View style = {{ flexDirection: 'row', flex: 1 }}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{ item.subject_name }</Text>
                    <Text numberOfLines={1} style={styles.code}>    •    { item.acronym }</Text>
                </View>
                
                <Animated.View style={{ transform: [{ rotate: rotateIcon }] }}>
                <Ionicons style = {{ color: '#ADADAD', fontSize: 35 }} name="chevron-down-circle-outline"/>
                </Animated.View>
            </View>

            {expanded && (
                <View style={styles.extraInfo}>
                    <View style={styles.detailsRow}>
                        <Text style={styles.professor}>
                            <Text style={{ fontWeight: 'bold', color: '#000000' }}>Professor(a): </Text>
                            { item.teacher }
                        </Text>
                        <View style = {{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons style = {{ color: '#ADADAD', fontSize: 20 }} name="location-outline"/>
                            <Text style={styles.room}>{ item.local }</Text>
                        </View>
                    </View>
                    

                    <View style={styles.timetableRow}>
                        <Ionicons style = {{ color: '#ADADAD', fontSize: 25 }} name="time-outline"/>
                        <Text style={styles.timeBox}>{ moment(item.start_time, "HH:mm:ss").format('HH:mm') }</Text>
                        <Text style={styles.timeBox}>{ moment(item.end_time, "HH:mm:ss").format('HH:mm') }</Text>
                    </View>
                </View>
            )}
            </Animated.View>
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
  