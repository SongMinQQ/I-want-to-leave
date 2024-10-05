import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import logo from '../assets/demoLogo.jpg';
import WriteIdAndPw from '../components/login/WriteIdAndPw';
import LoginButton from '../components/login/LoginButton';
import GoToJoinMembership from '../components/login/GoToJoinMembership';
import FindIdOrPw from '../components/login/FindIdOrPw';
import EasyLoginBtns from '../components/login/EasyLoginBtns';
import { ScrollView } from 'react-native-gesture-handler';

const LoginScreen:React.FC = () => {
    return (
        <ScrollView style={style.screen}>
            <View style={style.logoArea}>
                <Image source={logo} style={{
                width: 598,
                height: 217
                }}
                />
            </View>
            <View>
                <WriteIdAndPw/>
            </View>
            <View>
                <LoginButton/>
            </View>
            <View>
                <GoToJoinMembership/>
            </View>
            <View>
                <FindIdOrPw/>
            </View>
            <View>
                <Text style={style.loginText}>
                    간편 로그인
                </Text>
            </View>
            <View>
                <EasyLoginBtns />
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        backgroundColor: "#FFFFFF"
    },
    logoArea: {},
    loginText :{
        fontSize: 18,
        color: "#000000",
        paddingLeft: 20
    }
})
export default LoginScreen;