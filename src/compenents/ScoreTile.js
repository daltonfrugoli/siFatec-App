import React from "react";

import { View, Text, FlatList, TouchableOpacity } from "react-native";

import { AssessmentInstrumentTile } from "./AssessmentInstrument";

export const ScoreTile = ({ item, index }) => {
    
    const AssessmentInstrumentComponent = ({ item, index }) => <AssessmentInstrumentTile item = { item } index = { index }/>
    
    const media = item.assessment_instruments.map((item, index) => item.score * (item.weight / 100))
    .reduce((acumulador, atual) => acumulador + atual, 0);

    return(
        <View
            style = {{
                borderBottomWidth: 1,
                borderColor: '#D8D8D8',
                width: '100%',
                paddingHorizontal: 20,
                paddingBottom: 20
            }}
        >
            <View
                style = {{
                    flexDirection: 'row',
                    paddingVertical: 15,
                }}
            >
                <View style = {{ height: 10, width: 10, borderRadius: 10, backgroundColor: '#ADADAD', marginTop: 10, marginRight: 15 }}/>
                <Text style = {{ color: '#000000', fontSize: 20, fontWeight: 500, flex: 1 }}>{ item.subject }</Text>
                <View style = {{ backgroundColor: '#A0F5B9', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 5 }}>
                    <TouchableOpacity onPress={() => console.log(media)}>

                    
                    <Text style = {{ color: '#000000' }}><Text style = {{ fontWeight: 600 }}>Média:</Text> {media >= 10 ? media.toFixed() : media.toFixed(1)}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FlatList
                data = { item.assessment_instruments }
                renderItem = { AssessmentInstrumentComponent }
                keyExtractor = { (_, index) => index.toString() }
                numColumns = { 1 }
            />
        </View>
    )
}