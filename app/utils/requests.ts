
const localServer: string = "http://localhost:8080";
const emulatorServer: string = "http://10.0.2.2:8000";

//안드로이드 기기로 테스트 할 경우 명령어 입력, -s 뒤에 기기명 입력
//adb -s R3CX10LZABX reverse tcp:8080 tcp:8080
// adb -s R3CTB0MMDLJ reverse tcp:8080 tcp:8080
// adb -s R3CT90HAWER reverse tcp:8080 tcp:8080
// adb -s R3CX20F627H reverse tcp:8080 tcp:8080
export const urls = {
    login : `${localServer}/login`,
    googleLogin: `${localServer}/oauth2/authorization/Google`,
    generateSchedule: `${localServer}/schedule/initialize`,
    getTravelInfo: `${localServer}/mypage/travel-info`,
    getTravelDetail: `${localServer}/schedule/`,
    profilePostInfo: `${localServer}/mypage/post-info`,
    profileCommentInfo: `${localServer}/mypage/comment-info`,
    profileTravelInfo: `${localServer}/mypage/travel-info`,
}

