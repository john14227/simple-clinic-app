import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export default function Routes() {
    const { token } = useContext(AuthContext);
    return token ? <PrivateRoute /> : <PublicRoute />;
}