import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SelectDate from './SelectDate';
import { TripSchedule } from '../../types/types';
import CustomInput from '../../utils/CustomInput';

interface WriteTimelineProps {
    startDate: string | null; // null을 허용
    endDate: string | null;   // null을 허용
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

type Timeline = {
    id: number;
    time: string; // 'HH:MM' 형식의 문자열
    title: string;
    description: string;
    isDatePickerVisible: boolean;
};

const WriteTimeline: React.FC<WriteTimelineProps> = ({ startDate, endDate, setNewSchedule }) => {
    // startDate를 기반으로 selectedDate 초기화 (null 가능)
    const initializeSelectedDate = (dateStr: string | null): Date | null => {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        return isNaN(date.getTime()) ? null : date;
    };

    const [selectedDate, setSelectedDate] = useState<Date | null>(initializeSelectedDate(startDate));
    const [timelines, setTimelines] = useState<Timeline[]>([]); 

    // 초기 시간 설정 ('00:00')
    const initializeTime = (): string => {
        return '00:00';
    };

    // 날짜 선택 핸들러
    const handleDateSelection = (date: Date) => {
        console.log('Date selected:', date);
        setSelectedDate(date);
        // 상태 업데이트는 useEffect에서 처리
    };

    // 새로운 타임라인 추가
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

    // 타임라인 업데이트 핸들러
    const updateTimeline = (id: number, field: keyof Timeline, value: any) => {
        setTimelines((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    // 타임라인 렌더링 함수
    const renderTimelines = () => {
        return timelines.map((item) => {
            const timeString = convertTimeToHHMM(item.time);
            return (
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
                                date={
                                    // 'HH:MM' 문자열을 Date 객체로 변환
                                    (() => {
                                        const [hours, minutes] = timeString.split(':').map(Number);
                                        const date = new Date();
                                        date.setHours(hours, minutes, 0, 0);
                                        return date;
                                    })()
                                }
                                onConfirm={(date) => {
                                    const hours = date.getHours().toString().padStart(2, '0');
                                    const minutes = date.getMinutes().toString().padStart(2, '0');
                                    const newTimeString = `${hours}:${minutes}`;
                                    updateTimeline(item.id, 'isDatePickerVisible', false);
                                    updateTimeline(item.id, 'time', newTimeString);
                                }}
                                onCancel={() => updateTimeline(item.id, 'isDatePickerVisible', false)}
                            />
                            <Text style={{ fontSize: 17 }}>
                                {timeString}
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
                        onChangeText={(text) => updateTimeline(item.id, 'description', text)}
                    />
                </View>
            );
        });
    };

    // 'HH:MM' 형식으로 변환하는 헬퍼 함수
    const convertTimeToHHMM = (time: string): string => {
        if (!time) return '00:00';
        const [hours, minutes] = time.split(':').map(Number);
        if (isNaN(hours) || isNaN(minutes)) {
            console.warn(`Invalid time format: ${time}. Setting to '00:00'.`);
            return '00:00';
        }
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const saveToParent = () => {
        if (!selectedDate || isNaN(selectedDate.getTime())) {
            console.warn('Selected date is invalid:', selectedDate);
            return;
        }
        const dateKey = selectedDate.toISOString().split('T')[0]; // 'YYYY-MM-DD'
        console.log('Saving to parent:', dateKey, timelines);
    
        setNewSchedule((prev) => {
            const updatedSchedule = [...prev.schedule];
            const dateIndex = updatedSchedule.findIndex((item) => item.date === dateKey);
    
            if (timelines.length === 0) {
                // 타임라인이 비어있을 경우 해당 날짜를 스케줄에서 제거
                if (dateIndex !== -1) {
                    updatedSchedule.splice(dateIndex, 1);
                    console.log(`Removing date ${dateKey} as timelines are empty.`);
                }
            } else {
                // 타임라인이 존재할 경우 스케줄에 추가하거나 업데이트
                const convertedTimelines = timelines.map((tl) => ({
                    time: tl.time, // 'HH:MM' 문자열로 저장
                    title: tl.title,
                    description: tl.description,
                }));
    
                if (dateIndex !== -1) {
                    // 기존 날짜가 있을 경우 타임라인 업데이트
                    updatedSchedule[dateIndex].timelines = convertedTimelines;
                    console.log('Updating existing date:', dateKey);
                } else {
                    // 새로운 날짜 추가
                    updatedSchedule.push({ date: dateKey, timelines: convertedTimelines });
                    console.log('Adding new date:', dateKey);
                }
            }
    
            return { ...prev, schedule: updatedSchedule };
        });
    };
    

    // 타임라인이 변경될 때마다 부모에 저장
    useEffect(() => {
        saveToParent();
    }, [timelines]);

    // selectedDate가 변경될 때마다 기존 타임라인 로드
    useEffect(() => {
        console.log('Selected Date Changed:', selectedDate);
        if (!selectedDate) {
            setTimelines([]);
            return;
        }
        setNewSchedule((prev) => {
            const dateKey = selectedDate.toISOString().split('T')[0];
            const existingDate = prev.schedule.find((item) => item.date === dateKey);
            if (existingDate) {
                // 기존 타임라인을 컴포넌트 상태에 설정
                const updatedTimelines = existingDate.timelines.map((timeline, index) => ({
                    id: index + 1,
                    time: convertTimeToHHMM(timeline.time),
                    title: timeline.title,
                    description: timeline.description,
                    isDatePickerVisible: false,
                }));
                setTimelines(updatedTimelines);
            } else {
                // 새로운 날짜의 타임라인 초기화
                setTimelines([]);
            }
            return prev; // 부모 상태는 변경하지 않음
        });
    }, [selectedDate]);

    return (
        <View style={styles.container}>
            <SelectDate
                startDate={startDate}
                endDate={endDate}
                setNewSchedule={setNewSchedule}
                onDateSelected={handleDateSelection}
            />

            {selectedDate && !isNaN(selectedDate.getTime()) ? (
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
