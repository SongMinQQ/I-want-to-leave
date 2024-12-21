import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UserInfoBox from '../components/myPage/UserInfoBox';
import axios from 'axios';
import { urls } from '../utils/requests';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useFocusEffect } from '@react-navigation/native';
import Mytravel from '../components/myPage/Mytravel';
import { TravelInfo } from '../types/types';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const MyPageScreen: React.FC = () => {
    const token = useSelector((state: RootState) => state.getToken.token);
    const [myTravels, setMyTravels] = useState([])

    const getUserTravel = async() => {
        try{
            const response = await axios.get(urls.getTravelInfo,{
                headers:{
                Authorization : token
                },
                params: {
                    page: 0,
                    size: 5
                },
            })
            // console.log(response.data);
            const travels = response.data.myPageTravelResponseDTOs;
            setMyTravels(travels);
        }
        catch(err){
            console.error(err);
        }
    }
    useFocusEffect(
            React.useCallback(() => {
                getUserTravel(); // 화면이 포커스될 때마다 유저의 여행정보를 가져옴
            }, [token])
        );
    return (
        <ScrollView style={style.screen}>
            <UserInfoBox myTravels={myTravels}/>
            <Text style={style.fontStyle}>나의 여정</Text>
            <View style={style.underline}/>
            {
                myTravels.length > 0 ? (
                    myTravels.map((data: TravelInfo) => (
                        <Mytravel myTravels={data} key={data.travelCode} />
                    ))
                ) : (
                    <Text>아직 나의 여정이 없어요</Text>
                )
            }
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen: {
        backgroundColor: "#FFFFFF",
        display: 'flex',
        flexDirection: 'column'
    },
    fontStyle : {
        fontWeight : 'bold',
        color: "#000000",
        fontSize : 18,
        marginLeft : screenWidth * 0.035,
        marginTop : 35,
        marginBottom : 15
    },
    underline : {
        borderWidth : 2,
        borderColor : "#000000",
        width : screenWidth * 0.95,
        alignSelf : 'center',
        marginBottom: 20
    }
})
export default MyPageScreen;