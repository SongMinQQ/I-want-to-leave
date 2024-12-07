import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { GOOGLE_OAUTH_CLIENT_ID } from '@env';
import { useNavigation } from '@react-navigation/native';
import { loginUser } from '../../utils/loginTokenHandler';

const GoogleLoginBtn: React.FC = () => {
    const navigation: any = useNavigation();
    useEffect(() => {
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
            await loginUser();
            if(userInfo["data"] != null)navigation.navigate("Main");
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
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
                // initiate sign in
                signInWithGoogle();
            }}
        />
    );
};

export default GoogleLoginBtn;
