import React, { useEffect } from 'react';
import { View } from 'react-native';
import { travelDetail } from '../types/types';

interface TravelRouteScreenProps {
    travelDetail: travelDetail;
}
const TravelRouteScreen: React.FC<TravelRouteScreenProps> = ({travelDetail}) => {
    const {
        createdAt, // e.g., "2024-12-15T16:16:26.000+00:00"
        deletedAt, // e.g., null or "2024-12-15T16:16:26.000+00:00"
        endDate, // e.g., "2024-12-15"
        imageUrl, // Array of image URLs
        information, // e.g., "제주도"
        isDeleted, // e.g., false
        preparation, // Replace `any` with the specific type if known
        schedule, // Array of schedules
        startDate, // e.g., "2024-12-15"
        title, // e.g., "여행가자"
        travelCode,// e.g., 34
        usernames,
    } = travelDetail;
    useEffect(() => {
        console.log(schedule[0]?.timeLines[0]);
    },[travelDetail]);
    return (
        <View>
            
        </View>
    );
};

export default TravelRouteScreen;