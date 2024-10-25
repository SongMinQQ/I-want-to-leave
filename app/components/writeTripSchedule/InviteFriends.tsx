import React from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const { width: deviceWidth } = Dimensions.get('window');

const InviteFriends: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>친구 초대하기</Text>
            <View style={styles.searchArea}>
                <TextInput placeholder='친구의 이메일 주소를 입력하세요.(최대 4명)' style={styles.input}/>
                <TouchableOpacity>
                    <EvilIcons name='search' size={20} color={'#000000'}/>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        //padding: 15
        paddingHorizontal: deviceWidth * 0.05,
    },
    title: {
        fontSize: deviceWidth * 0.05, // Adjust title size based on the device width
        color: "#000000",
        fontWeight: 'bold'
    },
    searchArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    input: {
        //marginTop: 10,
        borderBottomWidth: 1,
        borderColor: '#000000',
        fontSize: deviceWidth * 0.04,
        paddingVertical: 5,
    },
})
export default InviteFriends;