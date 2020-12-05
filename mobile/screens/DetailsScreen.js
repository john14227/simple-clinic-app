import { List } from '@ant-design/react-native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
});

const Item = List.Item;

export function DetailsScreen({ route }) {
    const { record } = route.params;
    const { date, time, doctor, patient, fee, clinic, followUp, diagnosis, medication } = record;
    const dateTime = `${date} ${time}`;
    console.log(record);

    return <ScrollView style={styles.container}>
        <List renderHeader={`Clinic: ${clinic}`}>
            <Item extra={doctor}>
                Doctor
            </Item>
            <Item extra={patient}>
                Patient
            </Item>
            <Item extra={date}>
                Date
            </Item>
            <Item extra={time}>
                Time
            </Item>
            <Item
                wrap={true}
                multipleLine={true}
                extra={diagnosis}
            >
                Diagnosis
            </Item>
            <Item
                wrap={true}
                multipleLine={true}
                extra={medication}
            >
                Medication
            </Item>
            <Item wrap={true} extra={followUp ? ' Yes' : 'No'}>
                Has follow-up consultation
            </Item>
            <Item wrap={true} extra={fee}>
                Consultation fee
            </Item>
        </List>
    </ScrollView>;
}