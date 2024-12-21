import React, { useState } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import DatePicker from 'react-native-date-picker'; // Importing the DatePicker component
import { recommandAI } from '../../types/types';
import CustomText from '../../utils/CustomText';

interface DateSettingProps {
    startDay: string;
    endDay: string;
    setRecommandParam: React.Dispatch<React.SetStateAction<recommandAI>>;
}

const { width: deviceWidth } = Dimensions.get('window');

const DateSetting: React.FC<DateSettingProps> = ({ startDay, endDay, setRecommandParam }) => {
    const [openStart, setOpenStart] = useState(false);
    const [openEnd, setOpenEnd] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const handleStartDateChange = (date: Date) => {
        setStartDate(date);
        setRecommandParam((prev) => ({
            ...prev,
            startDate: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        }));
    };

    const handleEndDateChange = (date: Date) => {
        if (date < startDate) {
            Alert.alert("유효성 오류", "종료 날짜는 시작 날짜보다 뒤에 있어야 합니다.");
            return;
        }
        setEndDate(date);
        setRecommandParam((prev) => ({
            ...prev,
            endDate: date.toISOString().split('T')[0], // Format as YYYY-MM-DD
        }));
    };

    return (
        <View style={styles.dateSelectArea}>
            {/* Start Date Section */}
            <View style={styles.days}>
                <CustomText style={styles.dayFont}>Start Day</CustomText>
                <TouchableOpacity onPress={() => setOpenStart(true)}>
                    <CustomText>{startDay || "날짜를 선택하세요"}</CustomText>
                </TouchableOpacity>
                <DatePicker
                    modal
                    mode="date"
                    open={openStart}
                    date={startDate}
                    onConfirm={(date) => {
                        setOpenStart(false);
                        handleStartDateChange(date);
                    }}
                    onCancel={() => setOpenStart(false)}
                />
            </View>

            {/* End Date Section */}
            <View style={styles.days}>
                <CustomText style={styles.dayFont}>End Day</CustomText>
                <TouchableOpacity onPress={() => setOpenEnd(true)}>
                    <CustomText>{endDay || "날짜를 선택하세요"}</CustomText>
                </TouchableOpacity>
                <DatePicker
                    modal
                    mode="date"
                    open={openEnd}
                    date={endDate}
                    onConfirm={(date) => {
                        setOpenEnd(false);
                        handleEndDateChange(date);
                    }}
                    onCancel={() => setOpenEnd(false)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    dateSelectArea: {
        display: 'flex',
        flexDirection: 'row',
        gap: 50,
        padding: deviceWidth * 0.03,
        justifyContent: 'center'
    },
    days: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    dayFont: {
        fontWeight: 'bold',
        fontSize: 16
    }
})
export default DateSetting;
