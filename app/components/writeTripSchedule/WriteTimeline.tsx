import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDate from './SelectDate';
import { TripSchedule } from '../../types/types';

interface WriteTimelineProps {
    startDate: Date;
    endDate: Date;
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

type Timeline = {
    id: number;
    time: Date;
    title: string;
    content: string;
    isDatePickerVisible: boolean;
};

const WriteTimeline: React.FC<WriteTimelineProps> = ({ startDate, endDate, setNewSchedule }) => {
    const initializeTime = () => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        return date;
    };

    const [selectedDate, setSelectedDate] = useState<Date>(startDate); // 초기값을 startDate로 설정
    const [timelines, setTimelines] = useState<Timeline[]>([]); 
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const handleDateSelection = (date: Date) => {
        setSelectedDate(date);
    
        setNewSchedule((prev) => {
            const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD 형식
            const existingDate = prev.schedule.find((item) => item.date === dateKey);
    
            if (existingDate) {
                // 기존 타임라인에 `isDatePickerVisible` 추가
                const updatedTimelines = existingDate.timelines.map((timeline) => ({
                    ...timeline,
                    isDatePickerVisible: false, // 기본값 추가
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
        const newTimeline = {
            id: timelines.length + 1,
            time: initializeTime(),
            title: '',
            content: '',
            isDatePickerVisible: false, // 추가
        };
        setTimelines((prev) => [...prev, newTimeline]);
    };

    const updateTimeline = (id: number, field: string, value: any) => {
        setTimelines((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const saveToParent = () => {
        const dateKey = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식

        setNewSchedule((prev) => {
            const updatedSchedule = [...prev.schedule];
            const dateIndex = updatedSchedule.findIndex((item) => item.date === dateKey);

            if (dateIndex !== -1) {
                updatedSchedule[dateIndex].timelines = timelines;
            } else {
                updatedSchedule.push({ date: dateKey, timelines: [...timelines] });
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
                <TextInput
                    style={styles.inputStyle}
                    value={item.title}
                    onChangeText={(text) => updateTimeline(item.id, 'title', text)}
                />
                <Text style={styles.textStyle}>일정 내용</Text>
                <TextInput
                    style={styles.inputStyle}
                    value={item.content}
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
                onDateSelected={(date) => handleDateSelection(new Date(date))}
            />

            {selectedDate ? (
                <>
                    {renderTimelines()}
                    <TouchableOpacity style={styles.addButton} onPress={addNewTimeline}>
                        <Text style={styles.addButtonText}>+ 추가</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.saveButton} onPress={saveToParent}>
                        <Text style={styles.saveButtonText}>저장</Text>
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
        flex: 1,
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
    saveButton: {
        backgroundColor: '#28a745',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default WriteTimeline;
