import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import logo from '../assets/demoLogo.jpg';
import WriteIdAndPw from '../components/login/WriteIdAndPw';
import LoginButton from '../components/login/LoginButton';
import GoToJoinMembership from '../components/login/GoToJoinMembership';
import FindIdOrPw from '../components/login/FindIdOrPw';
import EasyLoginBtns from '../components/login/EasyLoginBtns';
import GoogleLogin from '../components/login/GoogleLogin'; // GoogleLogin 컴포넌트 추가
import { urls } from '../utils/requests';
import axios from 'axios';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GOOGLE_OAUTH_CLIENT_ID } from '@env';

const LoginScreen: React.FC = () => {
    const [idAndPw, setIdAndPw] = useState({ id: '', pw: '' });
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const requestLogin = async () => {
        console.log('로그인을 시도합니다.');
        try {
            const response = await axios.get(urls.login);
            console.log(response);
            console.log('로그인 성공');
        } catch (err) {
            console.error(err);
        }
    };

    const googleLoginCheck = async() => {
        try{
            const isSignedIn = await GoogleSignin.getCurrentUser();
            if(isSignedIn) navigation.navigate("Main");
            else return
        }
        catch(err){
            console.error(err);
        }
    }
    useFocusEffect(
        React.useCallback(() => {
            googleLoginCheck(); // 화면이 포커스될 때마다 로그인 상태 확인
        }, [])
    );
    return (
        <>

            <ScrollView style={style.screen}>
                <View style={style.logoArea}>
                    <Image
                        source={logo}
                        style={{
                            width: 598,
                            height: 217,
                        }}
                    />
                </View>
                <View>
                    <WriteIdAndPw setIdAndPw={setIdAndPw} />
                </View>
                <View>
                    <LoginButton requestLogin={requestLogin} />
                </View>
                <View>
                    <GoToJoinMembership />
                </View>
                <View>
                    <FindIdOrPw />
                </View>
                <View>
                    <Text style={style.loginText}>간편 로그인</Text>
                </View>
                <View>
                    <EasyLoginBtns/>
                </View>
            </ScrollView>
        </>
    );
};

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        backgroundColor: '#FFFFFF',
    },
    logoArea: {},
    loginText: {
        fontSize: 18,
        color: '#000000',
        paddingLeft: 20,
    },
});

export default LoginScreen;
