import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface Props {
    placeholderText: string; // 여기에 타입을 명확히 지정
}

const JoinTextInput: React.FC<Props> = ({ placeholderText }) => {
    const isPassword = placeholderText.substring(0,4);
    return (
        <TextInput 
        style={style.joinInput}
        placeholder={placeholderText} 
        maxLength={20} 
        secureTextEntry={isPassword === "비밀번호" ? true : false}
        >
        </TextInput>
    );
};

const style = StyleSheet.create({
    joinInput : {
        borderBottomColor: "#000000",
        borderBottomWidth: 0.5,
    }
})
export default JoinTextInput;