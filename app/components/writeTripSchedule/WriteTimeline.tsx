import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


// Get device width
const { width: deviceWidth } = Dimensions.get('window');

//디자인을 어떻게 할지, 확정 버튼 눌렀을때는 어떤 UI?
const WriteTimeline: React.FC = () => {
    const initializeTime = () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0); // 시간, 분, 초, 밀리초를 0으로 설정
        return date;
    };
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedTime, setSelectedTime] = useState(initializeTime());

    return (
        <View style={styles.container}>
        <View style={styles.screen}>
            <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
                <View style={styles.timeArea}>
                    <Text style={styles.textStyle}>시간 선택</Text>
                    <Ionicons name='time-outline' size={20} color={'#000000'} />
                    <DatePicker
                        modal
                        open={isDatePickerVisible}
                        mode='time'
                        date={selectedTime}
                        onConfirm={(date) => {
                            setDatePickerVisibility(false)
                            setSelectedTime(date);
                        }}
                        onCancel={() => {
                            setDatePickerVisibility(false)
                        }}
                    />
                    <Text style={{ fontSize: 17 }}>
                        {`${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}`}
                    </Text>
                </View>
            </TouchableOpacity>

            <Text style={styles.textStyle}>일정 제목</Text>
            <TextInput style={styles.inputStyle} />
            <Text style={styles.textStyle}>일정 내용</Text>
            <TextInput style={styles.inputStyle} />
            <View style={styles.completeBtnArea}>
                <TouchableOpacity 
                style={{width: 120, borderWidth: 1, borderRadius: 5, borderColor: '#ff1515', alignItems: 'center'}}>
                    <Feather name='x' size={30} color={'#ff1515'} />
                </TouchableOpacity>
                <TouchableOpacity style={{width: 120, borderWidth: 1, borderRadius: 5, borderColor: '#0bff48', alignItems: 'center'}}>
                    <Feather name='check' size={30} color={'#0bff48'} />
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        // gap: 5,
        paddingHorizontal: deviceWidth * 0.05, // 5% of the device width for padding
        width: deviceWidth - 40,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: "#000",     // 그림자 색상
                shadowOffset: { width: 0, height: 2 }, // 그림자 위치
                shadowOpacity: 0.25,     // 그림자 투명도
                shadowRadius: 3.84,      // 그림자 퍼짐 정도
            },
            android: {
                elevation: 8,
            }
        }),
        paddingTop: 10,
        paddingBottom: 10,
    },
    container: {
        // flex: 1, // 화면 전체를 채움
        justifyContent: 'center', // 세로 중앙 정렬
        alignItems: 'center', // 가로 중앙 정렬
        backgroundColor: '#ffffff' // 전체 배경색 (선택 사항)
    },
    inputStyle: {
        borderBottomWidth: 1
    },
    completeBtnArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 10
    },
    timeArea: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center'
    },
    textStyle: {
        fontSize: deviceWidth * 0.04, // Adjust title size based on the device width
        color: "#000000",
        // fontWeight: 'bold'
    }
});

export default WriteTimeline;