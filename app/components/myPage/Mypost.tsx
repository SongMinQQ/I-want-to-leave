import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import CustomText from '../../utils/CustomText';

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
            <CustomText>{title}</CustomText>
            <CustomText>여행한 날 : {startDate} ~ {endDate}</CustomText>
            <Image source={{uri: image[0] || "https://via.placeholder.com/100"}}/>
            <CustomText>{content}</CustomText>
        </View>
    );
};

export default Mypost;