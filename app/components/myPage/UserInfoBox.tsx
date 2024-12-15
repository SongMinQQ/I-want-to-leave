import React, { useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { googleLoginCheck } from '../../utils/utils';
import { TravelInfo } from '../../types/types';

const { width: screenWidth } = Dimensions.get('window');

interface UserInfoBoxProps {
    myTravels: TravelInfo[];
  }

const UserInfoBox: React.FC<UserInfoBoxProps> = ({ myTravels }) => {

    //구글 로그인 정보 가져오기
    const [profileInfo, setProfileInfo] = useState<any>(null);
    useEffect(()=> {
        const data: any = googleLoginCheck();
        setProfileInfo(data.user);
        // console.log(profileInfo);
    },[])

    const showTripInfo= () => {
        return(
            <View style={styles.tripInfoTextWrap} >
                <Text style={styles.tripInfoText}>여행 제목 : {myTravels[0].travelName}</Text>
                <Text style={styles.tripInfoText}>날짜 : {myTravels[0].startDate} ~ {myTravels[0].endDate}</Text>
                <Text style={[styles.tripInfoText, {alignSelf: 'center', marginTop: 5}]}>이곳을 터치해서 여정을 확인하세요!</Text>
            </View>
        )
    }
    return (
        <View style= {styles.infoCard}>
            {profileInfo ? <Text style={styles.helloText}>안녕하세요 <Text style={styles.userNameText}>{profileInfo.name}</Text>님.</Text>
            : 
            <Text style={styles.helloText}>로그인이 되어있지 않습니다. 로그인 정보를 확인해주세요.</Text>}
            <View style={styles.tripCard}>
                <Text style={styles.tripText}>곧 떠날 여행</Text>
                <View style={styles.widthLine}/>
                {myTravels.length > 0 ? showTripInfo() : <Text style={styles.tripInfoText}>떠날 여행이 없어요... 지금 바로 여행 계획을 세워보세요!</Text>}
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
        height: 145,
        // justifyContent: 'center'
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
        fontSize: 12,
        color: "#000000",
    },
    tripInfoTextWrap: {
        gap: 6
    }
})
export default UserInfoBox;