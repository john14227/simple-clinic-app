import React from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#fff',
        flex: 1,
        height: '100%',
    },
    header: {
        fontSize: 40,
        fontWeight: '700',
        textAlign: 'center',
        padding: 30
    },
    buttonContainer: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 200,
    },
});

export function HomeScreen({ navigation }) {
    const toLoginScreen = () => navigation.navigate('Login');
    const toSignupScreen = () => navigation.navigate('Sign up');

    return <View style={styles.screen}>
        <Text style={styles.header}>Clinic App</Text>
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <Button title='Login' onPress={toLoginScreen} />
            </View>
        </View>
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <Button title='Sign up' onPress={toSignupScreen} />
            </View>
        </View>
    </View>;
}