import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({ name: '', token: '', auth: false });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('');
    const [token, setToken] = useState('');

    const getUserDetails = async () => {
        const token = await AsyncStorage.getItem('@token');
        const username = await AsyncStorage.getItem('@username');
        setToken(token);
        setUser(username);
    };
    useEffect(() => {
        getUserDetails();
    }, []);

    const saveUserDetails = async (user, token) => {
        await AsyncStorage.setItem('@token', token);
        await AsyncStorage.setItem('@username', user);
        setUser(user);
        setToken(token);
    };

    const clearUserDetails = async () => {
        await AsyncStorage.clear();
        setUser('');
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ user, token, saveUserDetails, clearUserDetails }}>
            {children}
        </AuthContext.Provider>
    );
}