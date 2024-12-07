import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';

interface Post {
    title: string;
    startDate: string;
    endDate: string;
    image: string[];
    content: string;
}

interface MypostProps {
    item: Post;
}

const Mypost: React.FC<MypostProps> = ({item}) => {
    const {
        title,
        startDate,
        endDate,
        image,
        content
    }=item;

    return (
        <View>
            <Text>{title}</Text>
            <Text>여행한 날 : {startDate} ~ {endDate}</Text>
            <Image source={{uri: image[0] || "https://via.placeholder.com/100"}}/>
            <Text>{content}</Text>
        </View>
    );
};

export default Mypost;