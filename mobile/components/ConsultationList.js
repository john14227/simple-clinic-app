import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Consultation } from './Consultation';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});

export function ConsultationList({ consultations, navigation }) {
    const renderItem = ({ item }) => {
        return <Consultation
            record={item}
            navigation={navigation}
        />
    };

    return <View style={styles.container}>
        <FlatList
            data={consultations}
            renderItem={renderItem}
            keyExtractor={item => (item.id).toString()}
        />
    </View>;
}