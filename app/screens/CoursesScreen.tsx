import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BestTopicSlider from '../components/courses/BestTopicSlider';
import CurrentCourses from '../components/courses/CurrentCourses';
import AnotherCourses from '../components/courses/AnotherCourses';

const CoursesScreen: React.FC = () => {
    return (
        <ScrollView style={style.screen}>
            <Text style= {style.mostTopic}>MOST TOPIC</Text>
            <BestTopicSlider/>
            <CurrentCourses/>
            <Text style={style.anotherCourse}>다른 여행 코스 추천</Text>
            <AnotherCourses/>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    screen : {
        backgroundColor: "#FFFFFF",
        display: 'flex',
        flexDirection: 'column'
    },
    mostTopic : {
        fontSize: 15,
        color: '#000000',
        paddingLeft: 10,
        paddingTop: 2,
        fontWeight: 'bold'
    },
    anotherCourse : {
        padding: 10,
        fontWeight : 'bold',
        fontSize: 16,
        color: '#000000'
    }
})
export default CoursesScreen;