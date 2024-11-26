import React, { useEffect } from 'react';
import { Button, StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { GOOGLE_OAUTH_CLIENT_ID } from '@env';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native';

const GoogleLoginBtn: React.FC = () => {
    const navigation = useNavigation();
    useEffect(() => {
        console.log(GOOGLE_OAUTH_CLIENT_ID);
        GoogleSignin.configure({
            webClientId: GOOGLE_OAUTH_CLIENT_ID, // 환경 변수에서 가져온 클라이언트 ID
            offlineAccess: true, // Refresh token 사용 여부
        });
    }, [GOOGLE_OAUTH_CLIENT_ID]);

    const signInWithGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices(); // Play Services가 사용 가능한지 확인
            const userInfo = await GoogleSignin.signIn(); // Google 로그인 수행
            console.log('User Info:', userInfo);
            navigation.navigate("Main");
            // Alert.alert('Success', `Welcome ${userInfo.user.name}`);
        } catch (error: any) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                Alert.alert('Cancelled', 'Login was cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                Alert.alert('In Progress', 'Login is in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                Alert.alert('Error', 'Play Services not available or outdated');
            } else {
                console.error('Google Sign-In Error:', error.message);
                Alert.alert('Error', 'An error occurred during login');
            }
        }
    };

    return (
        <View>
            <TouchableOpacity onPress={signInWithGoogle} >
                <AntDesign name='google' size={50} color={'#000000'}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
});

export default GoogleLoginBtn;
