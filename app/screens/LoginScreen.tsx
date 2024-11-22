import React, { useState } from 'react';
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

const LoginScreen: React.FC = () => {
  const [idAndPw, setIdAndPw] = useState({ id: '', pw: '' });
  const [googleLoginUrl, setGoogleLoginUrl] = useState<string | null>(null); // 구글 로그인 URL 상태

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

  const requestGoogleLogin = async () => {
    console.log('구글 로그인을 시도합니다.');
    try {
      const response = await axios.get(urls.googleLogin);
      const reportTo = response.headers['report-to']; // Access the report-to header
      if (reportTo) {
        const reportToData = JSON.parse(reportTo); // Parse the JSON string in the header
        const url = reportToData.endpoints[0].url; // Extract the URL
        console.log('Google Login URL:', url);
        setGoogleLoginUrl(url); // 구글 로그인 URL 상태 업데이트
      } else {
        console.log('Report-to header not found in response.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {googleLoginUrl ? (
        <GoogleLogin loginuri={googleLoginUrl} /> // GoogleLogin 컴포넌트 표시
      ) : (
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
            <EasyLoginBtns requestGoogleLogin={requestGoogleLogin} />
          </View>
        </ScrollView>
      )}
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
