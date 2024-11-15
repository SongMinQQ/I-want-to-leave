import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
const WriteTimeline: React.FC = () => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(new Date());

    // const showDatePicker = () => {
    //     setDatePickerVisibility(true);
    // };

    // const hideDatePicker = () => {
    //     setDatePickerVisibility(false);
    // };

    // const handleConfirm = (date: any) => {
    //     console.warn("A date has been picked: ", date);
    //     hideDatePicker();
    // };
    return (
        <View style={styles.screen}>
            <TouchableOpacity onPress={()=>setDatePickerVisibility(true)}>
                <Ionicons name='time-outline' size={15} color={'#000000'}/>
                <DatePicker 
                modal
                open={isDatePickerVisible}
                mode='time'
                date={selectedTime}
                onConfirm={(date) => {
                    setDatePickerVisibility(true)
                    setSelectedTime(date);
                  }}
                  onCancel={() => {
                    setDatePickerVisibility(false)
                  }}
                />
            </TouchableOpacity>
            <Text>일정 제목</Text>
            <TextInput style={styles.inputStyle}/>
            <Text>일정 내용</Text>
            <TextInput style={styles.inputStyle}/>
            <View style={styles.completeBtnArea}>
                <TouchableOpacity><Text>v</Text></TouchableOpacity>
                <TouchableOpacity><Text>x</Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        gap: 5
    },
    inputStyle: {
        borderWidth: 1
    },
    completeBtnArea:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})
export default WriteTimeline;