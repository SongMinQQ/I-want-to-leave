import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Mypost from '../components/myPage/Mypost';

interface Post {
    title: string;
    startDate: string;
    endDate: string;
    image: string[];
    content: string;
}

const MyPostsScreen: React.FC = () => {
    const[posts, setPosts] = useState<Post[]>([
        {
            title:"태국 여행",
            startDate: "2024-11-05",
            endDate: "2024-11-08",
            image: ["https://images.unsplash.com/photo-1727791962712-1d36ec09b068?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxODd8fHxlbnwwfHx8fHw%3D"],
            content: "졸업하기전에 이런데 한번 가야지"
        }
    ]);
    // const[posts, setPosts] = useState<Post[]>([]);
    return posts.length > 0 ?(
        <View style={styles.screen}>
            {posts.map((item, index) => (
                <Mypost item={item} key={index}/>
            ))}
        </View>
    ):
    (
        <View style={styles.screen}>
            <Text>공유한 게시글이 없습니다.</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#ffffff",
        flex: 1,
        padding: 16
    },
    textTest : {
        fontSize: 30
    }
})
export default MyPostsScreen;