import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

interface Article {
    id: string;
    category: string;
    title: string;
    description: string;
    image: string;
  }

// 데이터 배열 생성
const articles = [
  {
    id: '1',
    category: 'BESTS 1',
    title: '서울 드라마 명소 코스 추천합니다 😊',
    description: '드라마 "보이스"에 나온 드라마 촬영 명소들을 같이 돌아봐요',
    image: 'https://images.unsplash.com/photo-1727042395792-803ce6f1b9bb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNTB8fHxlbnwwfHx8fHw%3D',
  },
  {
    id: '2',
    category: 'BESTS 2',
    title: '야구장 밖에서는 석촌 탐방기',
    description: '야구장도 가고 석촌호수도 즐기는 코스입니다 🏟️',
    image: 'https://images.unsplash.com/photo-1727791962712-1d36ec09b068?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODd8fHxlbnwwfHx8fHw%3D',
  },
  {
    id: '3',
    category: 'BESTS 3',
    title: 'SM 사옥 관광 후기',
    description: '🎤 SM 좋아하던 팬으로서 성수동에 위치한 사옥으로 가봤어요 ❤️',
    image: 'https://images.unsplash.com/photo-1726501615020-c191eb696705?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMDd8fHxlbnwwfHx8fHw%3D',
  },
  {
    id: '4',
    category: 'BESTS 4',
    title: '울산 바다 탐방기',
    description: '지난 여름 부끄럽게 다녀온 울산 바다 탐방기 🏖️',
    image: 'https://images.unsplash.com/photo-1727402881307-9b2d1cd53ca5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMDh8fHxlbnwwfHx8fHw%3D',
  },
];

// 렌더링 함수
const renderItem = ({ item } : {item : Article}) => (
  <TouchableOpacity style={styles.touchableColor}>
      <View style={styles.itemContainer} key={item.id}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
  </TouchableOpacity>
);

const AnotherCourses: React.FC = () => {
  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  category: {
    color: '#FF6347',
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000000'
  },
  description: {
    fontSize: 14,
    color: '#777',
  },
  touchableColor: {
    backgroundColor: '#FFFFFF'
  }
});

export default AnotherCourses;
