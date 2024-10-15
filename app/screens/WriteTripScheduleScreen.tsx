import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PickDate from '../components/writeTripSchedule/PickDate';
import { TripSchedule } from '../types/types';
import WriteScheduleTitle from '../components/writeTripSchedule/WriteScheduleTitle';

const WriteTripScheduleScreen: React.FC = () => {
    const [newSchedule, setNewSchedule] = useState<TripSchedule>({
        startDate: new Date(), // Initialize with current date
        endDate: new Date(),   // Initialize with current date
        title: '',
        image: [],
        member: [],
        schedule: []
    });
    return (
        <ScrollView style={styles.screen}>
            <PickDate setNewSchedule = {setNewSchedule}/>
            <WriteScheduleTitle setNewSchedule = {setNewSchedule}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: "#FFFFFF"
    }
})
export default WriteTripScheduleScreen;