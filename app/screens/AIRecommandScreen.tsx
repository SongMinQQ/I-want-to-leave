import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { recommandAI } from '../types/types';
import DateSetting from '../components/aiRecommand/DateSetting';
import CustomText from '../utils/CustomText';
import CustomInput from '../utils/CustomInput';

const { width: deviceWidth } = Dimensions.get('window');

const AIRecommandScreen: React.FC = () => {
    const [recommandParam, setRecommandParam] = useState<recommandAI>({
        startLocation: "서울",
        startDate: "",
        endDate: "",
        keywords: "도시",
        carOwned: true
    });

    const toggleCar = () => {
        setRecommandParam((prev) => ({
            ...prev, // Spread the previous state to keep other properties unchanged
            carOwned: !prev.carOwned // Toggle the `carOwned` property
        }))};
    return (
        <View style={styles.screen}>
            <View>
                <CustomText>차량 여부</CustomText>
                <Switch value={recommandParam.carOwned} onValueChange={toggleCar} />
                <DateSetting startDay = {recommandParam.startDate} endDay = {recommandParam.endDate} setRecommandParam = {setRecommandParam}/>
            </View>
            <View style={styles.inputArea}>
                <CustomInput 
                placeholder='여행 장소나 지역명을 입력하세요' 
                style={styles.input}
                
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "#ffffff",
        display: 'flex',
        flexDirection: 'column',
        flex: 1
    },
    inputArea: {
        alignSelf: 'center'
    },
    input : {
        borderColor: "#000000",
        borderWidth: 1,
        width: deviceWidth * 0.7,
        borderRadius: 10,
        padding: 10
    }
})
export default AIRecommandScreen;