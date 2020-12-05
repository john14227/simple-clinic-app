import React from 'react';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, InputItem, List } from '@ant-design/react-native';
import { REACT_APP_API } from '../constants';

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#fff',
        height: '100%'
    },
    item: {
        paddingTop: 10,
        paddingBottom: 10
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#888',
        borderStyle: 'solid',
    },
    button: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
});

export function RegistrationScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const onEmailChange = (value) => setEmail(value);
    const onNameChange = (value) => setName(value);
    const onPasswordChange = (value) => setPassword(value);
    const onAddressChange = (value) => setAddress(value);
    const onPhoneChange = (value) => setPhone(value);

    const signUp = async () => {
        const payload = { email, name, password, address, phone };
        const res = await fetch(`${REACT_APP_API}/registration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.success) {
            const goBack = navigation.goBack();
            Alert.alert('Registration Success', 'Your account has been created', [{ text: 'OK', onPress: goBack }])
        } else {
            Alert.alert('Registration Failed', 'Create account failed', [{ text: 'OK' }])
        }
    };

    return <ScrollView style={styles.form}>
        <List renderHeader={'Please fill in the form to register as a member'}>
            <InputItem
                labelPosition='left'
                labelNumber={7}
                onChange={onEmailChange}
                value={email}
            >
                Email
        </InputItem>
            <InputItem
                type='email-address'
                labelPosition='left'
                labelNumber={7}
                onChange={onNameChange}
                value={name}
            >
                Name
        </InputItem>
            <InputItem
                type='password'
                labelPosition='left'
                labelNumber={7}
                onChange={onPasswordChange}
                value={password}
            >
                Password
        </InputItem>
            <InputItem
                labelPosition='left'
                labelNumber={7}
                onChange={onAddressChange}
                value={address}
            >
                Address
        </InputItem>
            <InputItem
                type='phone'
                labelPosition='left'
                labelNumber={7}
                onChange={onPhoneChange}
                value={phone}
            >
                Phone
        </InputItem>
            <View style={styles.button}>
                <List.Item>
                    <Button type='primary' onPress={signUp}>Sign Up</Button>
                </List.Item>
            </View>
        </List>
    </ScrollView>;
}