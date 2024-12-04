import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MyComment from '../components/myPage/MyComment';

interface Comment {
    commentCode: number;
    content: string;
    timestamp: number;
    postCode: number;
    postTitle: string;
}

const MyCommentsScreen: React.FC = () => {
    const [comments, setComments] = useState<Comment[]>([
        {
            commentCode: 1,
            content: "여행 경비가 살짝 부족한데 주변에 저렴한 숙소 추천좀 해주실 수 있나요?",
            timestamp : new Date().getTime(),
            postCode : 21,
            postTitle : "석촌호수 탐방기"
        }
    ]);
    // const [comments, setComments] = useState<Comment[]>([]);
    return comments.length > 0 ? (
        <View style={styles.screen}>
            {comments.map((item) => (
                <MyComment item={item} key={item.commentCode}/>
            ))}
        </View>
    )
    :
    (
        <View style={styles.screen}>
            <Text>작성한 댓글이 없습니다.</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen : {
        backgroundColor: "#ffffff",
        flex : 1
    }
})
export default MyCommentsScreen;