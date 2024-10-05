import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import JoinTextInput from '../components/joinMemberShip/joinTextInput';

const JoinMembershipScreen: React.FC = () => {
    return (
        <ScrollView style={style.screen}>
            <View style={style.inputContainer}>
                <JoinTextInput placeholderText = "아이디"/>
                <JoinTextInput placeholderText = "비밀번호"/>
                <JoinTextInput placeholderText = "비밀번호 확인"/>
                <JoinTextInput placeholderText = "닉네임"/>
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