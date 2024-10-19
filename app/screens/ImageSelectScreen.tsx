import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ActivityIndicator,
    FlatList,
    ListRenderItemInfo,
    Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
    WriteTripSchedule: { selectedImage: string };
};

type ImageSelectScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'WriteTripSchedule'
>;

const ImageSelectScreen: React.FC = () => {
    const navigation = useNavigation<ImageSelectScreenNavigationProp>();
    const [images, setImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1); // 페이지 번호 관리

    const { width } = Dimensions.get('window'); // 화면 너비 가져오기

    // Lorem Picsum API에서 이미지 목록을 가져오는 함수
    const fetchImages = async (pageNumber: number) => {
        try {
            const newImages = Array.from({ length: 10 }, (_, i) =>
                `https://picsum.photos/id/${i + pageNumber * 10}/400/600`
            );
            setImages((prevImages) => [...prevImages, ...newImages]); // 기존 이미지에 추가
        } catch (error) {
            console.error('이미지 로드 실패:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImages(page); // 초기 이미지 로드
    }, [page]);

    // 이미지 선택 시 호출되는 함수: 선택한 이미지를 전달하고 이전 화면으로 돌아감
    const handleImageSelect = (selectedImage: string) => {
        navigation.navigate('WriteTripSchedule', { selectedImage });
    };

    // 스크롤이 끝에 도달하면 페이지 증가
    const handleLoadMore = () => {
        if (!loading) {
            setPage((prevPage) => prevPage + 1);
            setLoading(true);
        }
    };

    // 이미지 렌더링 함수
    const renderImage = ({ item }: ListRenderItemInfo<string>) => (
        <TouchableOpacity
            onPress={() => handleImageSelect(item)}
            style={[styles.imageWrapper, { width: width / 2 - 16 }]} // 2열로 배치
        >
            <Image source={{ uri: item }} style={styles.image} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>이미지를 선택하세요</Text>
            <FlatList
                data={images}
                renderItem={renderImage}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // 2열 그리드 레이아웃
                columnWrapperStyle={styles.row} // 행 스타일 적용
                onEndReached={handleLoadMore} // 스크롤 끝에 도달하면 호출
                onEndReachedThreshold={0.5} // 스크롤 임계값
                ListFooterComponent={
                    loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    row: {
        justifyContent: 'space-between', // 각 열 사이에 여백 추가
    },
    imageWrapper: {
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
    },
});

export default ImageSelectScreen;
