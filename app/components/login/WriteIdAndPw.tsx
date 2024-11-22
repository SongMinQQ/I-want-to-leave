import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const WriteIdAndPw: React.FC<{ setIdAndPw: (value: any) => void }> = ({setIdAndPw}: any) => {
    return (
        <View style={style.screen}>
            <TextInput placeholder='아이디' 
            style={style.boxDesign} 
            onChangeText={(text) => setIdAndPw((prev: any) => ({ ...prev, id: text }))}/>
            <TextInput 
            placeholder='비밀번호' 
            style={style.boxDesign} 
            secureTextEntry={true} 
            onChangeText={(text) => setIdAndPw((prev: any) => ({ ...prev, pw: text }))}/>
        </View>
    );
};

const style = StyleSheet.create({
    screen : {
        display: 'flex',
        gap: 15,
        backgroundColor:"#FFFFFF",
        paddingTop: 30,    // 위
        paddingRight: 35,  // 오른쪽
        paddingBottom: 0,  // 아래
        paddingLeft: 35, 
    },
    boxDesign : {
        backgroundColor: "#ffffff",
        borderBottomColor: "#000000",
        borderBottomWidth: 0.5,
        width: '100%',
        borderColor: "#000000",
    }
})
export default WriteIdAndPw;