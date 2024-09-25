import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import { Picker } from 'react-native-wheel-pick';

const { width } = Dimensions.get('window');

export type DateProps = {
    hours: number,
    minutes: number,
    year: number,
    month: number,
    day: number,
}

type DateTimeSpinnerPickerProps = {
    onChange: (date: DateProps) => void,
    date: DateProps,
}

const DateTimeSpinnerPicker = (props: DateTimeSpinnerPickerProps) => {

    const {
        date,
        onChange,
    } = props;

    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const handleYearChange = (index: number) => {
        onChange({...date, year: index });
        setSelectedDateTime(new Date(index, selectedDateTime.getMonth(), selectedDateTime.getDate(), selectedDateTime.getHours(), selectedDateTime.getMinutes()));
    };

    const handleMonthChange = (index: number) => {
        const newMonth = months[index] - 1; // Months are 0-based in JavaScript Date
        onChange({...date, month: newMonth });
        setSelectedDateTime(new Date(selectedDateTime.getFullYear(), newMonth, selectedDateTime.getDate(), selectedDateTime.getHours(), selectedDateTime.getMinutes()));
    };

    const handleDayChange = (index: number) => {
        const newDay = days[index];
        onChange({...date, day: newDay });
        setSelectedDateTime(new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), newDay, selectedDateTime.getHours(), selectedDateTime.getMinutes()));
    };

    const handleHourChange = (index: number) => {
        const newHour = hours[index];
        onChange({...date, hours: newHour });
        setSelectedDateTime(new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), selectedDateTime.getDate(), newHour, selectedDateTime.getMinutes()));
    };

    const handleMinuteChange = (index: number) => {
        const newMinute = minutes[index];
        onChange({...date, minutes: newMinute });
        setSelectedDateTime(new Date(selectedDateTime.getFullYear(), selectedDateTime.getMonth(), selectedDateTime.getDate(), selectedDateTime.getHours(), newMinute));
    };

    const windowWidth = Dimensions.get('window').width;


    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <Text style={{ width: windowWidth / 2, fontSize: 20, marginLeft: 100, color: '#fff' }}>Laikas</Text>
                <Text style={{ width:  windowWidth / 2, fontSize: 20, color: '#fff' }} >Data</Text>
            </View>
            <View style={styles.pickersContainer}>
                <Picker
                    pickerData={hours}
                    selectedItem={selectedDateTime.getHours()}
                    onValueChange={handleHourChange}
                    style={styles.picker}
                    textColor='#fff'
                />
                <Text style={{ fontSize: 20, color: '#fff' }}> : </Text> 
                <Picker
                    pickerData={minutes}
                    selectedItem={selectedDateTime.getMinutes()}
                    onValueChange={handleMinuteChange}
                    style={styles.picker}
                    textColor='#fff'
                />
                <Picker
                    pickerData={years}
                    selectedItem={years.indexOf(selectedDateTime.getFullYear())}
                    onValueChange={handleYearChange}
                    style={styles.picker}
                    textColor='#fff'
                />
                <Picker
                    pickerData={months}
                    selectedItem={selectedDateTime.getMonth()}
                    onValueChange={handleMonthChange}
                    style={styles.picker}
                    textColor='#fff'
                />
                <Picker
                    pickerData={days}
                    selectedItem={selectedDateTime.getDate() - 1}
                    onValueChange={handleDayChange}
                    style={styles.picker}
                    textColor='#fff'
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    pickersContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    picker: {
        width: width / 5,
        height: 200,
        backgroundColor: '#7E909A',
    },
});

export default DateTimeSpinnerPicker;
