import { createSlice } from '@reduxjs/toolkit';

const getToken = createSlice({
    name: 'getToken',
    initialState: {
        token: null, // 사용자 토큰 (null 초기값)
    },
    reducers: {
        // 토큰 저장 (로그인 성공 시)
        setToken: (state, action) => {
            state.token = action.payload; // 백엔드에서 받은 토큰
        },
        // 로그아웃 처리
        logout: (state) => {
            state.token = null; // 토큰 삭제
        },
    },
});

export const { setToken, logout } = getToken.actions;

export default getToken.reducer;
