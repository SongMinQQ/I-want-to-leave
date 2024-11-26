import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import BestTopicSlider from '../components/courses/BestTopicSlider';
import CurrentCourses from '../components/courses/CurrentCourses';
import AnotherCourses from '../components/courses/AnotherCourses';

const CoursesScreen: React.FC = () => {
    return (
        <FlatList
            data={[]} // 데이터가 없어도 FlatList가 정상적으로 동작하도록 빈 배열 설정
            renderItem={null} // `AnotherCourses`로 처리될 것이므로 여기선 항목 렌더링 필요 없음
            ListHeaderComponent={(
                <View style={style.screen}>
                    <Text style={style.mostTopic}>MOST TOPIC</Text>
                    <BestTopicSlider />
                    <CurrentCourses />
                    <Text style={style.anotherCourse}>다른 여행 코스 추천</Text>
                </View>
            )}
            ListFooterComponent={<AnotherCourses />} // `AnotherCourses`를 하단에 추가
            keyExtractor={(_, index) => index.toString()} // keyExtractor는 빈 배열에도 필요함
        />
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