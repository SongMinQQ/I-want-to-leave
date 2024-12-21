import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';

interface TravelTimelineProps {
    scheduleDate: string;
    scheduleTimeline: { time: string; title: string; description: string, id: number }[];
}

const TravelTimeline: React.FC<TravelTimelineProps> = ({ scheduleDate, scheduleTimeline }) => {
    useEffect(() => {
        console.log("넘어온 여행스케쥴 : ", scheduleTimeline);
    }, [scheduleTimeline]);

    // 'id' 필드를 제거한 새로운 배열 생성
    const processedTimeline = scheduleTimeline.map(({ id, ...rest }) => rest);

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>
                - {scheduleDate} -
            </Text>
            {processedTimeline.length > 0 ? (
                <Timeline
                    data={processedTimeline}
                    circleSize={20}
                    circleColor='rgb(45,156,219)'
                    lineColor='rgb(45,156,219)'
                    timeContainerStyle={{ minWidth: 52, marginTop: -5 }}
                    timeStyle={styles.timeStyle}
                    descriptionStyle={styles.descriptionStyle}
                    isUsingFlatlist={true}
                />
            ) : (
                <Text style={styles.noScheduleText}>여행 일정이 없습니다.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    timeStyle: {
        textAlign: 'center',
        backgroundColor: '#ff9797',
        color: 'white',
        padding: 5,
        borderRadius: 13,
    },
    descriptionStyle: {
        color: 'gray',
    },
    noScheduleText: {
        color: 'gray',
        fontStyle: 'italic',
    },
});

export default TravelTimeline;
