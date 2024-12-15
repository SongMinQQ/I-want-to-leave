import React from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TravelInfo } from '../../types/types';

interface MytravelProps {
    myTravels: TravelInfo;
}

const Mytravel: React.FC<MytravelProps> = ({ myTravels }) => {
    const {
        endDate,
        imageUrl,
        startDate,
        travelCode,
        travelContent,
        travelName,
        userNicknames,
    } = myTravels;

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <ImageBackground source={{ uri: imageUrl }} style={styles.image} imageStyle={styles.imageStyle}>
                    {/* 반투명 오버레이 */}
                    <View style={styles.overlay} />
                    {/* 오버레이 위에 표시할 내용 */}
                    <View style={styles.textContainer}>
                        <Text style={styles.title}>{travelName}</Text>
                        <Text style={styles.content}>{travelContent}</Text>
                        <Text style={styles.date}>{startDate} ~ {endDate}</Text>
                        <Text style={styles.user}>{userNicknames.join(', ')}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        // 이미지 자체에 투명도를 주고 싶다면 아래처럼 설정 가능
        // opacity: 0.8
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)', // 어두운 반투명 오버레이
    },
    textContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
    },
    title: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    content: {
        color: '#ffffff',
        fontSize: 14,
        marginBottom: 5,
    },
    date: {
        color: '#ffffff',
        fontSize: 12,
        marginBottom: 5,
    },
    user: {
        color: '#ffffff',
        fontSize: 12,
    },
});

export default Mytravel;
