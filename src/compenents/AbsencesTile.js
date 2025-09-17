import React, { useState } from "react"

import { View, Text } from "react-native";

// Chart
import PieChart from "react-native-pie-chart";

export const AbsencesTile = ({ item, index }) => {

    // Chart config 
    const widthAndHeight = 48
    const series = [
        { value: 430, color: '#B70E0E' },
        { value: 321, color: '#A09898' }
    ]

    const [attendancePercent] = useState(calcAttendance(item.presences, item.absences));

    // Calcular porcentagem de presença
    function calcAttendance(presences, absences) {
        const totalClasses = presences + absences;
        
        if (totalClasses === 0) return "0.0";
        
        const percent = (presences / totalClasses) * 100;
        
        if (percent >= 10){
            return Math.floor(percent).toFixed()
        } else {
            return Math.floor(percent).toFixed(1)
        }
    }    

    return(
        <View
            style = {{
                borderBottomWidth: 1,
                borderColor: '#D8D8D8',
                width: '100%',
                alignItems: 'center'
            }}
        >
            <View
                style = {{
                    flexDirection: 'row',
                    padding: 20,

                }}
            >
                <View style = {{ height: 10, width: 10, borderRadius: 10, backgroundColor: '#ADADAD', marginTop: 10, marginRight: 15 }}/>
                <View style = {{ flex: 1 }}>
                    <Text style = {{ color: '#000000', fontSize: 20, fontWeight: 500 }}>{ item.subject }</Text>
                    <View style = {{ flexDirection: 'row' }}>
                        <Text style = {{ color: '#A83535', fontWeight: 600, fontSize: 16, marginRight: 20 }}>Faltas: <Text style = {{ color: '#545454', fontWeight: 400 }}>{ item.absences }</Text></Text>
                        <Text style = {{ color: '#545454', fontWeight: 600, fontSize: 16 }}>Presenças: <Text style = {{ fontWeight: 400 }}>{ item.presences }</Text></Text>
                    </View>
                </View>
                <View
                    style = {{
                        position: 'relative',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Text style = {{ position: 'absolute', fontSize: 13, color: '#000000' }}>{ attendancePercent }%</Text>
                    <PieChart widthAndHeight={widthAndHeight} series={series} cover={0.80} />
                </View>
            </View>
        </View>
    )
}