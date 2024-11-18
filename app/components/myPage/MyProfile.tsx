import React, { useState } from 'react';
import { Dimensions, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import basicProfile from '../../assets/basicProfile.png';
import AntDesign from 'react-native-vector-icons/AntDesign';

const { width: deviceWidth } = Dimensions.get('window');

const MyProfile: React.FC = () => {
    const [isEdit, setIsEdit] = useState<Boolean>(false);

    return (
        <View style={styles.screen}>
            {/* Edit Button */}
            <TouchableOpacity 
                style={styles.editButton} 
                onPress={() => setIsEdit(true)}>
                <AntDesign name="edit" size={20} color={'#000000'} />
            </TouchableOpacity>
            
            {/* Profile Image */}
            <Image source={basicProfile} style={styles.profileImage} />
            
            {/* Username */}
            <Text style={styles.username}>username</Text>
            
            {/* User Info */}
            <View style={styles.userInfoArea}>
                <View><Text>글</Text><Text>num</Text></View>
                <View><Text>댓글</Text><Text>num</Text></View>
                <View><Text>여행</Text><Text>num</Text></View>
            </View>
            
            {/* Edit Mode */}
            {isEdit && (
                <TouchableOpacity onPress={() => setIsEdit(false)}>
                    <Text>수정</Text>
                </TouchableOpacity>
            )}
        </View>
    );
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
