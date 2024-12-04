import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

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
            <Text>{postTitle}</Text>
            <Text>{timestamp}</Text>
            <Text>{content}</Text>
        </TouchableOpacity>
    );
};

export default MyComment;