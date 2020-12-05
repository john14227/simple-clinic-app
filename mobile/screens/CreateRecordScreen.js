import React, { useContext } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';
import { Button, DatePicker, InputItem, List, Provider, Switch } from '@ant-design/react-native';
import moment from 'moment-timezone';
import { REACT_APP_API, timeZone } from '../constants';
import TextAreaItem from '@ant-design/react-native/lib/textarea-item';
import { AuthContext } from '../context/AuthContext';

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
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
});

export function CreateRecordScreen({ navigation, route }) {
    const [clinic, setClinic] = useState('');
    const [patient, setPatient] = useState('');
    const [doctor, setDoctor] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [medication, setMedication] = useState('');
    const [fee, setFee] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState('');
    const [followUp, setFollowUp] = useState(true);

    const onClinicChange = (value) => setClinic(value);
    const onPatientChange = (value) => setPatient(value);
    const onDoctorChange = (value) => setDoctor(value);
    const onDiagnosisChange = (value) => setDiagnosis(value);
    const onMedicationChange = (value) => setMedication(value);
    const onFeeChange = (value) => setFee(value);
    const onDateChange = (value) => setDate(value);
    const onTimeChange = (value) => setTime(value);
    const onFollowUpChange = (checked) => setFollowUp(checked);

    const refreshData = route.params.refreshData;
    const { token } = useContext(AuthContext);

    const createRecord = async () => {
        const payload = {
            clinic, patient, doctor, diagnosis,
            medication, fee, date: moment(date).tz(timeZone).format('YYYY-MM-DD'),
            time: moment(time).format('HH:mm:ss'), followUp
        };
        const res = await fetch(`${REACT_APP_API}/clinic/record`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });
        const result = await res.json();
        if (result.success) {
            const goBack = navigation.goBack();
            await refreshData();
            Alert.alert('Success', 'A consultation has been created', [{ text: 'OK', onPress: goBack }]);
        } else {
            if (res.status === 401) {
                Alert.alert('Failed', 'Unauthorized action!', [{ text: 'OK' }])
            } else {
                Alert.alert('Failed', 'Cannot create your consultation', [{ text: 'OK' }])
            }
        }
    };

    return <Provider>
        <ScrollView style={styles.form}>
            <List renderHeader={'Create a consultation record here'}>
                <InputItem
                    labelPosition='left'
                    labelNumber={7}
                    onChange={onClinicChange}
                    value={clinic}
                >
                    Clinic Name
        </InputItem>
                <InputItem
                    labelPosition='left'
                    labelNumber={7}
                    onChange={onPatientChange}
                    value={patient}
                >
                    Patient
        </InputItem>
                <InputItem
                    labelPosition='left'
                    labelNumber={7}
                    onChange={onDoctorChange}
                    value={doctor}
                >
                    Doctor
        </InputItem>
                <View style={{ marginLeft: 15 }}>
                    <TextAreaItem
                        labelNumber={7}
                        onChange={onDiagnosisChange}
                        value={diagnosis}
                        autoHeight={true}
                        placeholder='Diagnosis'
                    />
                </View>
                <View style={{ paddingLeft: 15 }}>
                    <TextAreaItem
                        onChange={onMedicationChange}
                        value={medication}
                        autoHeight={true}
                        placeholder='Medication'
                    />
                </View>
                <InputItem
                    type='number'
                    labelPosition='left'
                    labelNumber={7}
                    onChange={onFeeChange}
                    value={fee}
                    placeholder={'HKD'}
                >
                    Fee
        </InputItem>
                <DatePicker
                    value={date}
                    minDate={new Date()}
                    mode='date'
                    onChange={onDateChange}
                    extra='Please select date'
                    format='YYYY-MM-DD'
                >
                    <List.Item arrow='horizontal'>Select Date</List.Item>
                </DatePicker>
                <DatePicker
                    value={time}
                    mode='time'
                    onChange={onTimeChange}
                    extra='Please select time'
                    format='HH:mm'
                >
                    <List.Item arrow='horizontal'>Select Time</List.Item>
                </DatePicker>
                <List.Item extra={<Switch color='#2386ee' checked={followUp} onChange={onFollowUpChange} />}>
                    Has follow-up consultation
                </List.Item>
                <View style={styles.button}>
                    <Button type='primary' onPress={createRecord}>Create record</Button>
                </View>
            </List>
        </ScrollView>
    </Provider>;
}