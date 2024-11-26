import { GoogleSignin } from "@react-native-google-signin/google-signin";

/**email형식 확인 함수*/
export const validateEmail = (email: any) => {
    const regex = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
}

/** 공백 제거 함수*/
export const removeWhitespace = (text: any) => {
    const regex = /\s/g;
    return text.replace(regex, '');
}

export const googleLoginCheck = () => {
    try {
        const userInfo = GoogleSignin.getCurrentUser();

        if (userInfo) {
            return userInfo; // 유저 정보 반환
        } else {
            return "로그인이 되어있지 않습니다.";
        }
    } catch (err) {
        console.error("Google login check error:", err);
        return "로그인 정보를 가져오는 중 오류가 발생했습니다.";
    }
};