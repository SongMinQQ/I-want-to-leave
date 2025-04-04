import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { travelDetail } from '../types/types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

interface TravelRouteScreenProps {
    travelDetail: travelDetail;
}
const TravelRouteScreen: React.FC<TravelRouteScreenProps> = ({ travelDetail }) => {
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

    return (
        <View>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                    latitude: 36.841674,
                    longitude: 127.073682,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        height: "100%",
        width: "100%"
    }
});

export default TravelRouteScreen;