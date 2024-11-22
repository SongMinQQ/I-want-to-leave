import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import JoinTextInput from '../components/joinMemberShip/joinTextInput';

const JoinMembershipScreen: React.FC = () => {
    /*
    아이디 길이는 8~25 
    아이디 형식 영어 대소문자 숫자만 
    비밀번호 길이 8~15 
    비밀번호 형식 영어 숫자 특수문자는 @$!%*?&# 중 하나
    닉네임은 반드시 한글 이름 2~4글자
    이메일은 70자 이하 이메일 형식 지킬것
    */
    return (
        <ScrollView style={style.screen}>
            <View style={style.inputContainer}>
                <JoinTextInput placeholderText = "아이디"/>
                <JoinTextInput placeholderText = "비밀번호"/>
                <JoinTextInput placeholderText = "비밀번호 확인"/>
                <JoinTextInput placeholderText = "닉네임"/>
                <JoinTextInput placeholderText = "이메일"/>
                <JoinTextInput placeholderText = "핸드폰 번호"/>
                <JoinTextInput placeholderText = "인증번호"/>
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen : {
        backgroundColor: '#FFFFFF'
    },
    inputContainer : {
        padding: 15,
        gap: 15
    }
})
export default JoinMembershipScreen;