import React from "react";

import { View, Text } from "react-native";

// Plugins
import moment from "moment";

export const AssessmentInstrumentTile = ({ item, index }) => {

    return(
        <View style = {{ backgroundColor: index % 2 == 0 ? '#F5F5F5' : '#E4E4E4', borderRadius: 20, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 15, marginBottom: 5 }}>
            <View>
                <View style = {{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                    <Text style = {{ color: '#000000', fontWeight: 700 }}>Avaliação</Text>
                    <View style = {{ backgroundColor: '#000000', height: 3, width: 3, borderRadius: 3, marginHorizontal: 5 }}/>
                    <Text style = {{ color: '#000000' }}>{ item.description}</Text>
                </View>
                <Text style = {{ color: '#000000' }}>{ moment(item.application_date).format('DD/MM/YYYY') }</Text>
            </View>
            <View>
                <Text style = {{ color: '#000000', marginBottom: 5 }}><Text style = {{ fontWeight: 700 }}>Nota:</Text> { item.score >= 10 ? item.score : item.score.toFixed(1) }</Text>
                <Text style = {{ color: '#000000' }}><Text style = {{ fontWeight: 700 }}>Peso:</Text> { item.weight }</Text>
            </View>
        </View>
    )
}