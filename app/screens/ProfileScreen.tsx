import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import MyProfile from '../components/myPage/MyProfile';
import LogoutButton from '../components/myPage/LogoutButton';

const ProfileScreen: React.FC = () => {
    return (
        <ScrollView style={styles.screen}>
            <MyProfile/>
            <LogoutButton/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen : {
        backgroundColor: '#FFFFFF'
    }
})
export default ProfileScreen;