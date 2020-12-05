import { ActivityIndicator } from '@ant-design/react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});

export function Loading() {
    return <View style={styles.center}>
        <ActivityIndicator size='large' />
    </View>;
}