import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GoToJoinMembership:React.FC  = () => {
    const navigation:any = useNavigation();
    return (
        <View style={style.area}>
            <Text >떠나볼래가 처음이신가요?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Join")}>
                <Text style={style.joinMenbershipTextDesign}>
                    회원가입
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const style = StyleSheet.create({
    area: {
        backgroundColor: "#FFFFFF",
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        justifyContent: 'center'
    },
    joinMenbershipTextDesign: {
        fontWeight: 'bold',
        color: '#000000'
    }
})
export default GoToJoinMembership;