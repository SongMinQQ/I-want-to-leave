import axios from 'axios';
import { setToken, logout } from '../redux/getToken';
import { AppDispatch, RootState } from '../redux/store';
import { urls } from './requests';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// 로그인 요청 후 토큰 저장
const loginUser = () => async (dispatch: AppDispatch) => {
    const userDetails = GoogleSignin.getCurrentUser()?.user;
    const userInfo = {
        "provider" : "Google",
        "providerId" : userDetails?.id,
        "nickname": userDetails?.name,
        "email" : userDetails?.email
    }
    console.log("back에 토큰 요청 시작");
    try {
        const response = await axios.post(urls.login, userInfo, {
            headers: {
                'Content-Type': 'application/json',
            },
            // data: userInfo
        });
        console.log(response);
        const token = response.headers['authorization'] || response.headers['Authorization'];
        dispatch(setToken(token)); // 받은 토큰 저장
    } catch (error: any) {
        console.error('Login error:', error.response?.data?.message || error.message);
    }
};

// 앱 실행 시 상태 확인
const checkAuthState = () => (dispatch: AppDispatch, getState: () => RootState) => {
    const { getToken } = getState();

    if (getToken.token) {
        console.log('User is already logged in');
        return;
        // 추가 동작이 필요하면 여기에 구현
    } else {
        console.log('No token found, redirecting to login');
        loginUser();
    }
};

// 로그아웃
const handleLogout = () => (dispatch: AppDispatch) => {
    dispatch(logout());
    console.log('User logged out successfully');
};

export { loginUser, checkAuthState, handleLogout };
