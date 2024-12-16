import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDate from './SelectDate';
import { TripSchedule } from '../../types/types';
import CustomInput from '../../utils/CustomInput';

interface WriteTimelineProps {
    startDate: string; // 문자열 타입
    endDate: string;   // 문자열 타입
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

type Timeline = {
    id: number;
    time: Date;
    title: string;
    description: string;
    isDatePickerVisible: boolean;
};

const WriteTimeline: React.FC<WriteTimelineProps> = ({ startDate, endDate, setNewSchedule }) => {
    // startDate(문자열)을 Date 객체로 변환하여 초기화
    const [selectedDate, setSelectedDate] = useState<Date>(new Date(startDate));
    const [timelines, setTimelines] = useState<Timeline[]>([]); 

    const initializeTime = () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const handleDateSelection = (date: Date) => {
        setSelectedDate(date);

        setNewSchedule((prev) => {
            const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
            const existingDate = prev.schedule.find((item) => item.date === dateKey);

            if (existingDate) {
                // 기존 타임라인을 컴포넌트 스테이트에 설정
                const updatedTimelines = existingDate.timelines.map((timeline, index) => ({
                    id: index + 1,
                    time: new Date(timeline.time),
                    title: timeline.title,
                    description: timeline.description,
                    isDatePickerVisible: false,
                }));
                setTimelines(updatedTimelines);
            } else {
                // 새로운 날짜의 타임라인 초기화
                setTimelines([]);
            }
            return prev; // 상태 유지
        });
    };

    const addNewTimeline = () => {
        const newTimeline: Timeline = {
            id: timelines.length + 1,
            time: initializeTime(),
            title: '',
            description: '',
            isDatePickerVisible: false,
        };
        setTimelines((prev) => [...prev, newTimeline]);
    };

    const updateTimeline = (id: number, field: string, value: any) => {
        setTimelines((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    useEffect(() => {
        saveToParent();
    }, [selectedDate, timelines]);

    const saveToParent = () => {
        if (!selectedDate) return;
        const dateKey = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
    
        setNewSchedule((prev) => {
            const updatedSchedule = [...prev.schedule];
            const dateIndex = updatedSchedule.findIndex((item) => item.date === dateKey);
    
            const convertedTimelines = timelines.map((tl) => ({
                time: tl.time,
                title: tl.title,
                description: tl.description,
            }));
    
            if (dateIndex !== -1) {
                updatedSchedule[dateIndex].timelines = convertedTimelines;
            } else {
                updatedSchedule.push({ date: dateKey, timelines: convertedTimelines });
            }
    
            return { ...prev, schedule: updatedSchedule };
        });
    };

    const renderTimelines = () => {
        return timelines.map((item) => (
            <View key={item.id} style={styles.timelineBlock}>
                <TouchableOpacity
                    onPress={() => updateTimeline(item.id, 'isDatePickerVisible', true)}
                >
                    <View style={styles.timeArea}>
                        <Text style={styles.textStyle}>시간 선택</Text>
                        <Ionicons name="time-outline" size={20} color="#000000" />
                        <DatePicker
                            modal
                            locale='ko'
                            open={item.isDatePickerVisible}
                            mode="time"
                            date={item.time}
                            onConfirm={(date) => {
                                updateTimeline(item.id, 'isDatePickerVisible', false);
                                updateTimeline(item.id, 'time', date);
                            }}
                            onCancel={() => updateTimeline(item.id, 'isDatePickerVisible', false)}
                        />
                        <Text style={{ fontSize: 17 }}>
                            {`${item.time.getHours().toString().padStart(2, '0')}:${item.time
                                .getMinutes()
                                .toString()
                                .padStart(2, '0')}`}
                        </Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.textStyle}>일정 제목</Text>
                <CustomInput
                    style={styles.inputStyle}
                    value={item.title}
                    onChangeText={(text) => updateTimeline(item.id, 'title', text)}
                />
                <Text style={styles.textStyle}>일정 내용</Text>
                <CustomInput
                    style={styles.inputStyle}
                    value={item.description}
                    onChangeText={(text) => updateTimeline(item.id, 'content', text)}
                />
            </View>
        ));
    };

    return (
        <View style={styles.container}>
            <SelectDate
                startDate={startDate}
                endDate={endDate}
                setNewSchedule={setNewSchedule}
                onDateSelected={(dateString) => handleDateSelection(new Date(dateString))}
            />

            {selectedDate ? (
                <>
                    {renderTimelines()}
                    <TouchableOpacity style={styles.addButton} onPress={addNewTimeline}>
                        <Text style={styles.addButtonText}>+ 추가</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={styles.textStyle}>날짜를 먼저 선택해주세요.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 10,
    },
    timelineBlock: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    timeArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    textStyle: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputStyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        marginBottom: 10,
        padding: 5,
    },
    addButton: {
        backgroundColor: '#007bff',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default WriteTimeline;
