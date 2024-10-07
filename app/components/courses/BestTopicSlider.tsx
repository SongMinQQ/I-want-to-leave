import React from 'react';
import { Dimensions, StyleSheet, Image, View, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width: screenWidth } = Dimensions.get('window');

const BestTopicSlider = () => {
  const data = [
    { id: 1, title: "https://images.unsplash.com/photo-1728055279265-a1596deda909?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { id: 2, title: "https://plus.unsplash.com/premium_photo-1666557390174-8296736eb3cf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" },
    { id: 3, title: "https://images.unsplash.com/photo-1725556605299-93c6a64acca7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D" },
    { id: 4, title: "https://plus.unsplash.com/premium_photo-1724824053224-40d726301acf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyMHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  return (
    <View>
        <Text style={styles.title}>most topic 제목</Text>
        <Carousel
          loop
          width={screenWidth}
          height={250}
          autoPlay={true}
          data={data}
          scrollAnimationDuration={1000}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              <Image source={{ uri: item.title }} style={styles.image} />
            </View>
          )}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    resizeMode: 'cover',
  },
  title: {
    paddingLeft: 10
  }
});

export default BestTopicSlider;
