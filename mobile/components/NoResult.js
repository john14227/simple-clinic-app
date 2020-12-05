import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: '100%'
    },
    text: {
        textAlign: 'center',
    }
});

export function NoResult() {
    return <View style={styles.container}>
        <Text style={styles.text}>No Result Found</Text>
    </View>;
}