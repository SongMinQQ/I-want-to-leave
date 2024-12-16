import React from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { travelDetail } from '../types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather';
import CustomText from '../utils/CustomText';

interface TravelLobbyScreenProps {
    travelDetail: travelDetail;
}
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const TravelLobbyScreen: React.FC<TravelLobbyScreenProps> = ({travelDetail}) => {
    const {
        endDate, // e.g., "2024-12-15"
        imageUrl, // Array of image URLs
        information, // e.g., "제주도"
        isDeleted, // 준비물 삭제
        preparation, // 사용자들 준비물, 따로 state로 관리
        startDate, // e.g., "2024-12-15"
        title, // e.g., "여행가자"
        travelCode,// 여행 고유번호 요청날릴때 필요
        usernames,
    } = travelDetail;
    if(travelDetail) return (
        <View>
            {imageUrl && <Image source={{uri: imageUrl[0]}} 
            style={{width: "100%",height: 220,justifyContent: 'flex-end',}}
            />}
            <View style={styles.travelTitle}>
                <CustomText style={styles.trabvelTitleFont}>{title}</CustomText>
                <TouchableOpacity>
                    <FontAwesome name='share-square-o' size={25} color={"#000000"}/>
                </TouchableOpacity>
               
            </View>
            <View style={styles.travelMember}>
                <Ionicons name='person' size={25} color={"#000000"}/>
                {usernames && usernames.map((name, index) => (
                    <CustomText key={index} style={styles.travelMemberFont}>
                        {name}
                    </CustomText>
                ))}
            </View>
            <View style={styles.travelMember}>
                <Feather name='calendar' size={25} color={"#000000"}/>
                <CustomText style={styles.travelMemberFont}>{startDate} ~ {endDate}</CustomText>
            </View>
            <View style={styles.travelMember}>
                <CustomText style={styles.travelMemberFont}>{information}</CustomText>
            </View>
            <View style={styles.travelMemo}>
                <View style={styles.travelMemoTitle}>
                    <MaterialCommunityIcons name='note-text-outline' size={35} color={"#000000"}/>
                    <CustomText>Memo</CustomText>
                </View>
                <TouchableOpacity>
                    <FontAwesome name='pencil' size={25} color={"#000000"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
    else return (
        <View>
            <CustomText>여행 정보를 불러오는데 실패했습니다.</CustomText>
        </View>
    )
};

const styles = StyleSheet.create({
    travelTitle : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: screenWidth * 0.04,
    },
    trabvelTitleFont: {
        fontSize: 20,
    },
    travelMember : {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        paddingRight: screenWidth * 0.03,
        paddingLeft: screenWidth * 0.03,
        paddingBottom: screenWidth * 0.03,
    },
    travelMemberFont: {
        fontSize : 17
    },
    travelMemo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: screenWidth * 0.05,
    },
    travelMemoTitle: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5
    }
})
export default TravelLobbyScreen;