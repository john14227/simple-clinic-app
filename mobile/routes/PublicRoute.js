import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { RegistrationScreen } from '../screens/RegistrationScreen';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2386ee',
    }
});

const headerOptions = {
    headerTitleAlign: 'center', headerStyle: styles.header, headerTintColor: '#fff'
};

export function PublicRoute() {

    return <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={HomeScreen} options={{ ...headerOptions, headerShown: false, }} initialParams />
        <Stack.Screen name='Login' component={LoginScreen} options={headerOptions} />
        <Stack.Screen name='Sign up' component={RegistrationScreen} options={headerOptions} />
    </Stack.Navigator>;
}