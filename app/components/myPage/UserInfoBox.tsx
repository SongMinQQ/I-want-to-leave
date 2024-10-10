import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const UserInfoBox: React.FC = () => {
    const [isTripSoon, setIsTripSoon] = useState(false);

    const showTripInfo = () => {
        return(
            <View>
                <Text>여행지 : 여행지</Text>
                <Text>여행 경비 : n원</Text>
                <Text>준비물</Text>
                <Text>준비물들</Text>
            </View>
        )
    }
    return (
        <View style= {styles.infoCard}>
            <Text style={styles.helloText}>안녕하세요 <Text style={styles.userNameText}>username</Text>님.</Text>
            <View>
                <Text>곧 떠날 여행</Text>
                {isTripSoon ? showTripInfo() : <Text>곧 떠날 여행이 없어요</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoCard: {
        padding: 10,
        
        backgroundColor: "#c2c0c0",
        width: screenWidth - 10,
        height: 150,
        alignSelf: 'center',     // 화면 중앙으로 배치
        ...Platform.select({
            ios: {
                shadowColor: "#000",     // 그림자 색상
                shadowOffset: { width: 0, height: 2 }, // 그림자 위치
                shadowOpacity: 0.25,     // 그림자 투명도
                shadowRadius: 3.84,      // 그림자 퍼짐 정도
                },
            android: {
                elevation: 20,
            }
        })
        
    },
    helloText: {
        paddingTop: 20,
        paddingLeft: 15,
        fontSize: 16,
        color: "#000000"
    },
    userNameText: {
        fontWeight: 'bold'
    }
})
export default UserInfoBox;