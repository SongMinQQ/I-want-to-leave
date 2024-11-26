import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, Platform, StyleSheet, Text, View } from 'react-native';
import { googleLoginCheck } from '../../utils/utils';
import LogoutButton from './LogoutButton';

const { width: deviceWidth } = Dimensions.get('window');

const MyProfile: React.FC = () => {
    const [profileInfo, setProfileInfo] = useState<any>(null);
    useEffect(()=> {
        const data: any = googleLoginCheck();
        setProfileInfo(data.user);
        // console.log(profileInfo);
    },[])
    useEffect(()=> {
        console.log(profileInfo)
    },[profileInfo])
    return profileInfo ? (
        <View style={styles.screen}>
            
            {/* Profile Image */}
            <Image source={{uri:profileInfo.photo}} style={styles.profileImage} />
            
            {/* Username */}
            <Text style={styles.username}>{profileInfo.name}</Text>
            
            {/* User Info */}
            <View style={styles.userInfoArea}>
                <View><Text>글</Text><Text>num</Text></View>
                <View><Text>댓글</Text><Text>num</Text></View>
                <View><Text>여행</Text><Text>num</Text></View>
            </View>
            <LogoutButton/>
        </View>
    )
    :
    (
        <View style={styles.screen}>
            <ActivityIndicator size={'large'}/>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        padding: 20,
        width: deviceWidth - 30,
        alignSelf: 'center',
        marginTop: 20,
        gap: 20,
        height: 310,
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 20,
            },
        }),
        backgroundColor: "#ffffff",
        alignItems: 'center',
        // position: 'relative',
    },
    editButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000000',
    },
    userInfoArea: {
        display: 'flex',
        flexDirection: 'row',
        gap: 60,
    },
});

export default MyProfile;
