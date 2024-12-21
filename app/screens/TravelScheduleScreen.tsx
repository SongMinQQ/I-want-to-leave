import React, { useEffect } from 'react';
import { Text, View, FlatList } from 'react-native';
import { travelDetail } from '../types/types';
import TravelTimeline from '../components/travel/TravelTimeline';

interface TravelScheduleScreenProps {
    travelDetail: travelDetail;
}

const TravelScheduleScreen: React.FC<TravelScheduleScreenProps> = ({ travelDetail }) => {
    const {
        schedule, // Array of schedules
    } = travelDetail;

    useEffect(() => {
        console.log("스케쥴정보 : ", schedule);
    }, [schedule]);

    const renderItem = ({ item }:any) => (
        <TravelTimeline 
            scheduleDate={item.date} 
            scheduleTimeline={item.timeLines} 
        />
    );

    return (
        <View style={{ flex: 1 }}>
            {schedule && schedule.length > 0 ? (
                <FlatList
                    data={schedule}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.date} // Ensure date is unique
                />
            ) : (
                <View>
                    <Text>타임라인을 불러오는 중입니다..</Text>
                </View>
            )}
        </View>
    );
};

export default TravelScheduleScreen;
