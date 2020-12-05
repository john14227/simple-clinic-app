import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, InputItem, List } from '@ant-design/react-native';
import { AuthContext } from '../context/AuthContext';
import { REACT_APP_API } from '../constants';

const styles = StyleSheet.create({
    form: {
        backgroundColor: '#fff',
        height: '100%'
    },
    list: {
        padding: 10
    },
    item: {
        margin: 5
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


export function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const onEmailChange = (value) => setEmail(value);
    const onPasswordChange = (value) => setPassword(value);
    const { saveUserDetails } = useContext(AuthContext);

    const login = async () => {
        const payload = { email, password };
        const res = await fetch(`${REACT_APP_API}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.success) {
            const { username, token } = result;
            saveUserDetails(username, token);
        } else {
            if (res.status === 401) {
                Alert.alert('Login failed', 'Wrong email or password', [{ text: 'Ok' }]);
            } else {
                Alert.alert('Login failed', 'Unexpected error. Please contact our administration', [{ text: 'Ok' }])
            }
        }
    };

    return <View style={styles.form}>
        <List renderHeader={'Please input your email and password to login'}>
            <View style={styles.list}>
                <InputItem
                    labelPosition='left'
                    labelNumber={7}
                    onChange={onEmailChange}
                    value={email}
                >
                    Email
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
                <View style={styles.button}>
                    <Button type='primary' onPress={login}>Login</Button>
                </View>
            </View>

        </List>
    </View>;
}