import React, { useContext } from 'react';
import { ListRecordScreen } from '../screens/ListRecordScreen';
import { CreateRecordScreen } from '../screens/CreateRecordScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DetailsScreen } from '../screens/DetailsScreen';
import { AuthContext } from '../context/AuthContext';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#2386ee',
    },
    button: {
        padding: 10
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600'
    }
});

const Logout = () => {
    const { clearUserDetails } = useContext(AuthContext);
    return <TouchableOpacity style={styles.button} onPress={clearUserDetails}>
        <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>;
}

const headerOptions = {
    headerTitleAlign: 'center', headerStyle: styles.header, headerRight: Logout, headerTintColor: '#fff'
};

export function PrivateRoute() {

    return <Stack.Navigator>
        <Stack.Screen name='List Record' component={ListRecordScreen} options={headerOptions} />
        <Stack.Screen name='Create Record' component={CreateRecordScreen} options={headerOptions} />
        <Stack.Screen name='Details' component={DetailsScreen} options={headerOptions} />
    </Stack.Navigator>;
}