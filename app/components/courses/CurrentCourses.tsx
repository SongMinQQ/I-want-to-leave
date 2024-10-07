import React, { useState } from 'react';
import { Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

// 여행 코스 타입 정의
interface Course {
    id: string;
    title: string;
    subtitle: string;
    image: string;
  }

const CurrentCourses = () => {
    const [travelDatas, setTravelDatas] = useState([
        {
          id: '1',
          title: '서울 한옥여행',
          subtitle: '오늘의 여행코스',
          image: 'https://images.unsplash.com/photo-1727906871259-9a3dfe6b141d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1MXx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: '2',
          title: '전주 비빔밥 코스',
          subtitle: '오늘의 여행코스',
          image: 'https://images.unsplash.com/photo-1726199029699-e314218e852d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyNXx8fGVufDB8fHx8fA%3D%3D',
        },
        {
          id: '3',
          title: '제주도 하쿠산이',
          subtitle: '오늘의 여행코스',
          image: 'https://plus.unsplash.com/premium_photo-1728037068190-15a5bd1d6573?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzM3x8fGVufDB8fHx8fA%3D%3D',
        },
      ]);
    const renderItem = ({ item }: { item: Course }) => (
        <TouchableOpacity>
            <View style={styles.courseItem} key={item.id}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
        </TouchableOpacity>
      );

    return (
        <View style={style.screen}>
            <Text style={style.textStyle}>최근 등록된 여행 코스</Text>
            <FlatList
                data={travelDatas}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true} // 가로 스크롤 가능하게 설정
                showsHorizontalScrollIndicator={false} // 스크롤 바 숨기기
            />
        </View>
    );
};

const style = StyleSheet.create({
    screen: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10
    },
    textStyle: {
        color: '#000000',
        fontSize: 16,
        fontWeight: 'bold',
        paddingBottom: 10
    }
})

const styles = StyleSheet.create({
    courseItem: {
      width: screenWidth * 0.4, // 각 항목의 넓이를 화면의 70%로 설정
      marginRight: 15,
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#333',
    },
    subtitle: {
      fontSize: 12,
      color: '#777',
    },
  });
export default CurrentCourses;