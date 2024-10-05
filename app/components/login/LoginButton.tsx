import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const LoginButton = () => {
    const navigation:any = useNavigation();
    return (
        <View style= {style.btnArea}>
            <TouchableOpacity style={style.loginBtn} onPress={()=> navigation.navigate("Main")}>
                <Text style={style.btnText}>로그인</Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    btnArea : {
        padding: 30,
        backgroundColor:"#FFFFFF"
    },
    loginBtn: {
        backgroundColor: "#000000",
        padding: 20,
        
    },
    btnText: {
        color: "#FFFFFF",
        textAlign: 'center',
        letterSpacing: 2,
        fontSize: 15, // 텍스트 크기
        fontWeight: 'bold', // 텍스트를 bold로 설정
        
    }
})
export default LoginButton;