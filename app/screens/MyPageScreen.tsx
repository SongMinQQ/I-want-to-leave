import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import UserInfoBox from '../components/myPage/UserInfoBox';

const MyPageScreen: React.FC = () => {
    return (
        <ScrollView style={style.screen}>
            <UserInfoBox/>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen: {
        backgroundColor: "#FFFFFF"
    }
})
export default MyPageScreen;