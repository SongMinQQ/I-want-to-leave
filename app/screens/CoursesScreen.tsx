import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BestTopicSlider from '../components/courses/BestTopicSlider';

const CoursesScreen: React.FC = () => {
    return (
        <ScrollView style={style.screen}>
            <Text>커뮤니티 메인 콘텐츠 스크린</Text>
            <BestTopicSlider/>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen : {
        backgroundColor: "#FFFFFF",
        display: 'flex',
        flexDirection: 'row'
    }
})
export default CoursesScreen;