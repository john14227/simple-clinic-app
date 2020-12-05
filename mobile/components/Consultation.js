import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@ant-design/react-native'

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    body: {
        height: 50,
    },
    text: {
        marginLeft: 20,
        marginRight: 20
    }
});

export function Consultation({ record, navigation }) {
    const { date, time, doctor, patient, fee } = record;
    const footerText = `Consultation fee: ${fee}`;
    const patientRow = `Patient: ${patient}`;
    const doctorRow = `Doctor: ${doctor}`;

    const viewDetails = () => navigation.navigate('Details', { record });

    return <View style={styles.container} >
        <TouchableOpacity onPress={viewDetails}>
            <Card>
                <Card.Header
                    title={date}
                    extra={time}
                />
                <Card.Body>
                    <View style={styles.body}>
                        <Text style={styles.text}>{doctorRow}</Text>
                        <Text style={styles.text}>{patientRow}</Text>
                    </View>
                </Card.Body>
                <Card.Footer
                    content={footerText}
                />
            </Card>
        </TouchableOpacity>
    </View>;
}