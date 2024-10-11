import React, { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const UserInfoBox: React.FC = () => {
    const [isTripSoon, setIsTripSoon] = useState(true);

    const showTripInfo = () => {
        return(
            <View style={styles.tripInfoTextWrap}>
                <Text style={styles.tripInfoText}>여행지 : 여행지</Text>
                <Text style={styles.tripInfoText}>예상 여행 경비 : n원</Text>
                <Text style={[styles.tripInfoText, {alignSelf: 'center', marginTop: 5}]}>이곳을 터치해서 준비물을 확인하세요!</Text>
            </View>
        )
    }
    return (
        <View style= {styles.infoCard}>
            <Text style={styles.helloText}>안녕하세요 <Text style={styles.userNameText}>username</Text>님.</Text>
            <View style={styles.tripCard}>
                <Text style={styles.tripText}>곧 떠날 여행</Text>
                <View style={styles.widthLine}/>
                {isTripSoon ? showTripInfo() : <Text style={styles.tripInfoText}>떠날 여행이 없어요... 지금 바로 여행 계획을 세워보세요!</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    infoCard: {
        padding: 5,
        marginTop: 20,
        backgroundColor: "#ffffff",
        width: screenWidth - 40,
        height: 250,
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
    tripCard: {
        backgroundColor: "#efefef",
        padding: 20,
        width: screenWidth - 90,
        alignSelf: 'center',
        height: 145
    },
    helloText: {
        // paddingTop: 20,
        // paddingLeft: 15,
        fontSize: 14,
        color: "#000000",
        marginTop: 23,
        marginLeft: 15,
        marginBottom: 23
    },
    userNameText: {
        fontWeight: 'bold'
    },
    widthLine: {
        borderColor: "#bdbdbd",
        borderWidth: 1,
        width: screenWidth - 120,
        alignSelf: 'center',
        marginBottom: 10
    },
    tripText : {
        color: "#000000",
        fontSize: 13,
        paddingBottom: 10
    },
    tripInfoText : {
        fontSize: 12
    },
    tripInfoTextWrap: {
        gap: 6
    }
})
export default UserInfoBox;