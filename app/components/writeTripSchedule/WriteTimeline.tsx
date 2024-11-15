import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';

const WriteTimeline: React.FC = () => {
    return (
        <View style={styles.screen}>
            <Text>시간</Text>
            <TextInput style={styles.inputStyle}/>
            <Text>일정 제목</Text>
            <TextInput style={styles.inputStyle}/>
            <Text>일정 내용</Text>
            <TextInput style={styles.inputStyle}/>
            <View style={styles.completeBtnArea}>
                <TouchableOpacity><Text>v</Text></TouchableOpacity>
                <TouchableOpacity><Text>x</Text></TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        display: 'flex',
        gap: 5
    },
    inputStyle: {
        borderWidth: 1
    },
    completeBtnArea:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})
export default WriteTimeline;