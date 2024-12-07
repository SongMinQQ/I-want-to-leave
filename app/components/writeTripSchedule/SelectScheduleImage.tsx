import React, { useEffect, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { RootStackParamList, TripSchedule } from '../../types/types';
import AndDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel'; // Carousel import
import { launchImageLibrary } from 'react-native-image-picker';

interface SelectScheduleImageProps {
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

type SelectScheduleImageRouteProp = RouteProp<RootStackParamList, 'WriteTripSchedule'>;

const { width: deviceWidth } = Dimensions.get('window');

const SelectScheduleImage: React.FC<SelectScheduleImageProps> = ({ setNewSchedule }) => {
    const [images, setImages] = useState<string[]>([]); // 이미지 배열
    const [selectImageToGallery, setSelectImageToGallery] = useState(null);
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const route = useRoute<SelectScheduleImageRouteProp>();

    // 이전 화면에서 선택한 이미지가 있을 경우 이를 상태에 추가
    useEffect(() => {
        if (route.params?.selectedImage) {
            const newImage = route.params.selectedImage as string;
            setImages((prevImages) => [...prevImages, newImage]);
        }
    }, [route.params]);
    // 갤러리에서 이미지를 선택 시 이를 상태에 추가
    useEffect(()=> {
        if(selectImageToGallery){
            console.log(selectImageToGallery)
            setImages((prevImages) => [...prevImages, selectImageToGallery.uri]);
        }
    },[selectImageToGallery])
    /**이미지 추가 핸들러*/ 
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

    /**이미지 삭제 핸들러*/
    const handleDeleteImage = (index: number) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // 선택된 이미지 삭제
    };

    const selectFromGallery = () => {
        console.log('갤러리에서 이미지를 선택합니다.');
        // 갤러리 연동 로직 추가 필요 (e.g., react-native-image-picker)
        const options = {
            noData: true,
          };
      
          launchImageLibrary(options, (response) => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
                setSelectImageToGallery(response.assets[0]);
            }
          });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>이미지 선택</Text>

            {/* Carousel */}
            <Carousel
                loop={false}
                width={deviceWidth}
                height={200}
                data={[...images, 'add-button']} // 마지막에 항상 추가 버튼을 포함
                renderItem={({ item, index }) => {
                    if (item === 'add-button') {
                        return (
                            <TouchableOpacity onPress={handleAddImage} style={styles.addButtonWrapper}>
                                <View style={styles.addButton}>
                                    <AndDesign name="plus" size={30} color="#000" />
                                </View>
                            </TouchableOpacity>
                        );
                    }
                    return (
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: item }} style={styles.image} />
                            {/* 삭제 버튼 */}
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => handleDeleteImage(index)}
                            >
                                <Entypo name="minus" size={20} color="#ff4d4f" />
                            </TouchableOpacity>
                        </View>
                    );
                }}
                mode="parallax"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: deviceWidth * 0.05,
        fontWeight: 'bold',
        color: "#000000",
        padding: 16
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    addButtonWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        width: deviceWidth,
        height: 200,
    },
    addButton: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    deleteButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 5,
    },
});

export default SelectScheduleImage;
