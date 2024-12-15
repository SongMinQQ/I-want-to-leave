import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomText from '../../utils/CustomText';

interface Comment {
    commentCode: number;
    content: string;
    timestamp: number;
    postCode: number;
    postTitle: string;
}

interface MyCommentProps {
    item: Comment;
}

const MyComment: React.FC<MyCommentProps> = ({item}) => {
    const {
        commentCode,
        content,
        timestamp,
        postCode,
        postTitle
    } = item;
    return (
        <TouchableOpacity>
            <CustomText>{postTitle}</CustomText>
            <CustomText>{timestamp}</CustomText>
            <CustomText>{content}</CustomText>
        </TouchableOpacity>
    );
};

export default MyComment;