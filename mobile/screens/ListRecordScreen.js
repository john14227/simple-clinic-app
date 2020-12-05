import { TabBar } from '@ant-design/react-native';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { REACT_APP_API } from '../constants';
import { ConsultationList } from '../components/ConsultationList';
import { Loading } from '../components/Loading';
import { NoResult } from '../components/NoResult';
import { AuthContext } from '../context/AuthContext';

export function ListRecordScreen({ navigation }) {
    const [timeRange, setTimeRange] = useState('monthly');
    const [consultations, setConsultations] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, token } = useContext(AuthContext);

    const getRecords = async () => {
        const res = await fetch(`${REACT_APP_API}/clinic/record/${timeRange}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await res.json();
        const consultations = result.consultations;
        if (consultations) setConsultations(consultations);
        setLoading(false);
    }

    useEffect(() => {
        getRecords();
    }, [timeRange, loading]);

    const selectMonthly = () => {
        setTimeRange('monthly')
        setLoading(true);
    };
    const selectWeekly = () => {
        setTimeRange('weekly');
        setLoading(true);
    };
    const selectDaily = () => {
        setTimeRange('daily');
        setLoading(true);
    };

    const RenderResult = () => {
        if (consultations && consultations.length) {
            return <ConsultationList
                consultations={consultations}
                navigation={navigation}
            />;
        } else {
            return <NoResult />
        }
    };

    const goToCreateRecordScreen = () => navigation.navigate('Create Record', { refreshData: getRecords });

    if (loading) {
        return <Loading />;
    }

    return <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.welcomeMessage}>Hello, {user}</Text>
            <TouchableHighlight style={styles.button} onPress={goToCreateRecordScreen}>
                <Text>Create Record</Text>
            </TouchableHighlight>
        </View>
        <TabBar
            tintColor='#33A3F4'
            barTintColor='#f5f5f5'
        >
            <TabBar.Item
                title='Monthly'
                selected={timeRange === 'monthly'}
                onPress={selectMonthly}
            >
                <RenderResult />
            </TabBar.Item>
            <TabBar.Item
                title='Weekly'
                selected={timeRange === 'weekly'}
                onPress={selectWeekly}
            >
                <RenderResult />
            </TabBar.Item>
            <TabBar.Item
                title='Daily'
                selected={timeRange === 'daily'}
                onPress={selectDaily}
            >
                <RenderResult />
            </TabBar.Item>
        </TabBar>
    </View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#fff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    welcomeMessage: {
        fontSize: 40
    },
    button: {
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#888',
        borderRadius: 5,
        padding: 12
    },
    buttonText: {
        fontSize: 40
    }
});