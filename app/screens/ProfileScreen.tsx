import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import MyProfile from '../components/myPage/MyProfile';
import MyPostsAndComments from '../navigation/MyPostsAndComments';

const { width: screenWidth } = Dimensions.get('window');

const ProfileScreen: React.FC = () => {
    return (
        <View style={styles.screen}>
            <MyProfile/>
            <Text style={styles.fontStyle}>내 작성글</Text>
            <View style={styles.underline}/>
            <MyPostsAndComments/>
        </View>
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
        borderWidth : 1.8,
        borderColor : "#000000",
        width : screenWidth * 0.95,
        alignSelf : 'center',
        marginBottom: 5
    }
})
export default ProfileScreen;