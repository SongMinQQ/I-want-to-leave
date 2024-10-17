import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TripSchedule } from '../../types/types';
import AndDesign from 'react-native-vector-icons/AntDesign'

interface SelectScheduleImageProps {
    setNewSchedule: React.Dispatch<React.SetStateAction<TripSchedule>>;
}

const { width: deviceWidth } = Dimensions.get('window');

const SelectScheduleImage: React.FC<SelectScheduleImageProps> = ({setNewSchedule}) => {
    return (
        //FlatList로 작성해야함. 가로 스크롤. 
        //이미지가 존재하면 이미지를 먼저띄우고 맨 오른쪽에 이미지 추가 버튼이 있어야함
        //이미지 추가 버튼을 누르면 갤러리에서 선택할지 Lorem Picsum api에서 받아온
        //이미지 선택 화면을 보여줄지 custom Alert 출력(갤러리에서 선택, 다른 이미지 선택)
        <ScrollView>
            <Text>이미지 선택</Text>
            <TouchableOpacity>
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