import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TripSchedule } from '../../types/types';

interface WriteScheduleProps {
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
  }

const WriteScheduleTitle: React.FC<WriteScheduleProps> = ({setNewSchedule}) => {
    return (
        <View>
            <Text>
                여행 제목
            </Text>
            <TextInput placeholder='여행 제목을 입력하세요(최대 20자)'/>
        </View>
    );
};

const styles = StyleSheet.create({
    
})
export default WriteScheduleTitle;