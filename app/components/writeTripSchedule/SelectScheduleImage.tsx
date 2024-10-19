import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList, TripSchedule } from '../../types/types';
import AndDesign from 'react-native-vector-icons/AntDesign'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';

interface SelectScheduleImageProps {
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}
type SelectScheduleImageRouteProp = RouteProp<RootStackParamList, 'WriteTripSchedule'>;

const { width: deviceWidth } = Dimensions.get('window');

const SelectScheduleImage: React.FC<SelectScheduleImageProps> = ({setNewSchedule}) => {
    const [images, setImages] = useState<string[]>([]);

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const route = useRoute<SelectScheduleImageRouteProp>();

    // 이전 화면에서 선택한 이미지가 있을 경우 이를 상태에 추가
    useEffect(() => {
        if (route.params?.selectedImage) {
            const newImage = route.params.selectedImage as string;
            setImages((prevImages) => [...prevImages, newImage]);
        }
    }, [route.params]);


    const handleAddImage = () => {
        Alert.alert(
            '이미지 선택',
            '어디서 이미지를 선택하시겠습니까?',
            [
                { text: '갤러리에서 선택', onPress: () => selectFromGallery() },
                { text: '다른 이미지 선택', onPress: () => navigation.navigate('ImageSelect') },
                { text: '취소', style: 'cancel' },
            ]
        );
    };

    const selectFromGallery = () => {
        console.log('갤러리에서 이미지를 선택합니다.');
        // 갤러리 연동 로직 추가 필요 (e.g., react-native-image-picker)
    };

    return (
        // Carousel from 'react-native-reanimated-carousel' 사용
        //이미지가 존재하면 이미지를 먼저띄우고 맨 오른쪽에 이미지 추가 버튼이 있어야함
        //이미지 추가 버튼을 누르면 갤러리에서 선택할지 Lorem Picsum api에서 받아온
        //이미지 선택 화면을 보여줄지 custom Alert 출력(갤러리에서 선택, 다른 이미지 선택)
        <ScrollView>
            <Text>이미지 선택</Text>
            <TouchableOpacity onPress={handleAddImage}>
                <View>
                    <AndDesign name='plus' size={20} color={'#000000'}/>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({

})
export default SelectScheduleImage;