import React, { useState } from 'react';
import { View } from 'react-native';
import { travelDetail } from '../types/types';
import axios from 'axios';
import { urls } from '../utils/requests';

interface TravelAiScreenProps {
    travelDetail: travelDetail;
}
const TravelAiScreen: React.FC<TravelAiScreenProps> = ({travelDetail}) => {
    const [loading, setLoading] = useState<boolean>(false);
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

    const getAIRate = async() => {
        try{
            setLoading(true);
            const response =await axios.get(urls.aiCheck(travelCode));
            console.log(response.data);
        }
        catch(err){
            console.error(err);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <View>
            
        </View>
    );
};

export default TravelAiScreen;