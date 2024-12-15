import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UserInfoBox from '../components/myPage/UserInfoBox';
import axios from 'axios';
import { urls } from '../utils/requests';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useFocusEffect } from '@react-navigation/native';

const MyPageScreen: React.FC = () => {
    const token = useSelector((state: RootState) => state.getToken.token);

    // const getUserTravel = async() => {
    //     try{
    //         const response = await axios.get(urls.getTravelInfo,{headers:{
    //             Authorization : token,
    //             'Content-Type': 'application/json',
    //         }})
    //         console.log(response.data);
    //     }
    //     catch(err){
    //         console.error(err);
    //     }
    // }
    // useFocusEffect(
    //         React.useCallback(() => {
    //             getUserTravel(); // 화면이 포커스될 때마다 유저의 여행정보를 가져옴
    //         }, [])
    //     );
    return (
        <ScrollView style={style.screen}>
            <UserInfoBox/>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen: {
        backgroundColor: "#FFFFFF",
        display: 'flex',
        flexDirection: 'column'
    }
})
export default MyPageScreen;