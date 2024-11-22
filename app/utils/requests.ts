const localServer: string = "http://localhost:8080";

//안드로이드 기기로 테스트 할 경우 명령어 입력, -s 뒤에 기기명 입력
//adb -s R3CX10LZABX reverse tcp:8080 tcp:8080

export const urls = {
    login : `${localServer}/login`,
    googleLogin: `${localServer}/oauth2/authorization/Google`
}