import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const FindIdOrPw: React.FC = () => {
    return (
        <View style={style.screen}>
            <TouchableOpacity><Text style={style.buttonText}>아이디 찾기</Text></TouchableOpacity>
            <View style={style.separator} />
            <TouchableOpacity><Text style={style.buttonText}>비밀번호 찾기</Text></TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 55,
        backgroundColor: "#FFFFFF"
    },
    separator: {
        height: '100%',
        width: 1, // 세로선의 두께
        backgroundColor: 'black', // 세로선의 색상
        marginHorizontal: 20, // 텍스트와 세로선 사이 간격
    },
    buttonText: {
        fontWeight: 'bold',
        color: '#000000'
    }
})
export default FindIdOrPw;