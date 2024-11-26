import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import EasyLoginBtns from '../components/login/EasyLoginBtns';
import { NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
// import { GOOGLE_OAUTH_CLIENT_ID } from '@env';

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    // back에 JWT 요청 로직 추가 필요
    const googleLoginCheck = async() => {
        try{
            const isSignedIn = await GoogleSignin.getCurrentUser();
            if (isSignedIn != null) {
                // 로그인 성공 시 Main으로 이동
                navigation.navigate("Main");
            }
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
                        source={require('../assets/demoLogo.jpg')}
                        style={{
                            width: 598,
                            height: 217,
                        }}
                    />
                </View>
                <View>
                    <Text style={style.loginText}>로그인 후 떠나볼래를 이용해 보세요!</Text>
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
