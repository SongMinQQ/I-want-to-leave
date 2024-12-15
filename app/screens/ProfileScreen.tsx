import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import MyProfile from '../components/myPage/MyProfile';
import MyPostsAndComments from '../navigation/MyPostsAndComments';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
    return (
        <ScrollView style={styles.screen}>
            <MyProfile/>
            <Text style={styles.fontStyle}>내 작성글</Text>
            <View style={styles.underline}/>
            {/* 기기 높이의 1.5배를 예시로 사용 */}
            <View style={{ minHeight: screenHeight * 0.6 }}>
                <MyPostsAndComments/>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen : {
        backgroundColor: '#FFFFFF',
        flex: 1
    },
    fontStyle : {
        fontWeight : 'bold',
        color: "#000000",
        fontSize : 18,
        marginLeft : screenWidth * 0.035,
        marginTop : 35,
        marginBottom : 15
    },
    underline : {
        borderWidth : 2,
        borderColor : "#000000",
        width : screenWidth * 0.95,
        alignSelf : 'center',
        marginBottom: 5
    }
});

export default ProfileScreen;
