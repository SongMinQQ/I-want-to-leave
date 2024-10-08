import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const EasyLoginBtns: React.FC = () => {
    return (
        <View style={style.btnsArea}>
            <TouchableOpacity style={style.btns}>
                <Text>google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btns}>
                <Text>naver</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btns}>
                <Text>kakao</Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    btnsArea : {
        backgroundColor: "#FFFFFF",
        display: 'flex',
        flexDirection: 'row',
        gap: 60,
        justifyContent: 'center',
        paddingTop: 45
    },
    btns : {
        width: 50,
        height: 50,
        backgroundColor: "#cb202067"
    }
})
export default EasyLoginBtns;