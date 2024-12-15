import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { travelDetail } from '../types/types';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomText from '../utils/CustomText';

interface TravelLobbyScreenProps {
    travelDetail: travelDetail;
}
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
            <View>
                <CustomText>{title}</CustomText>
                <FontAwesome name='share-square-o' size={25} color={"#000000"}/>
            </View>
            <View>
                <Ionicons name='person' size={25} color={"#000000"}/>
                {usernames && usernames.map((name, index) => (
                    <CustomText key={index}>
                        {name}
                    </CustomText>
                ))}
            </View>
            <View>
                <CustomText>{information}</CustomText>
                <CustomText>{startDate} ~ {endDate}</CustomText>
            </View>
            <View>
                <MaterialCommunityIcons name='note-text-outline' size={25} color={"#000000"}/>
                <CustomText>Memo</CustomText>
                <TouchableOpacity>
                    <FontAwesome name='pencil' size={25} color={"#000000"}/>
                </TouchableOpacity>
            </View>
        </View>
    );
    else return (
        <View>
            <CustomText>여행 정보를 불러오는데에 실패했습니다</CustomText>
        </View>
    )
};

export default TravelLobbyScreen;