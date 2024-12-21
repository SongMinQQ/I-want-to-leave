import React, { useState } from 'react';
import { Dimensions, StyleSheet, Switch, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';
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
    const keywordsList = ["도시", "자연", "맛집", "데이트", "관광명소", "쇼핑"];
    
    const toggleCar = () => {
        setRecommandParam((prev) => ({
            ...prev,
            carOwned: !prev.carOwned
        }));
    };

    const handleKeywordSelect = (keyword: string) => {
        setRecommandParam((prev) => ({
            ...prev,
            keywords: keyword
        }));
    };

    const handleCustomKeywordInput = (text: string) => {
        setRecommandParam((prev) => ({
            ...prev,
            keywords: text
        }));
    };

    return (
        <View style={styles.screen}>
            <View>
                <View style={styles.isHaveCarArea}>
                    <CustomText>차량 여부</CustomText>
                    <Switch value={recommandParam.carOwned} onValueChange={toggleCar} />
                </View>
                <DateSetting startDay={recommandParam.startDate} endDay={recommandParam.endDate} setRecommandParam={setRecommandParam} />
            </View>
            <View style={styles.inputArea}>
                <CustomInput
                    placeholder='여행을 시작하는 장소나 지역명을 입력하세요'
                    style={styles.input}
                    onChangeText={(text) => setRecommandParam((prev) => ({ ...prev, startLocation: text }))}
                />
            </View>
            <View style={styles.keywordContainer}>
                <CustomText style={styles.label}>키워드 선택</CustomText>
                <FlatList
                    data={keywordsList}
                    keyExtractor={(item) => item}
                    horizontal
                    showsHorizontalScrollIndicator={false} 
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.keywordButton,
                                recommandParam.keywords === item && styles.selectedKeyword
                            ]}
                            onPress={() => handleKeywordSelect(item)}
                        >
                            <Text style={styles.keywordText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
                <CustomInput
                    style={styles.customInput}
                    placeholder="직접 입력"
                    value={recommandParam.keywords}
                    onChangeText={handleCustomKeywordInput}
                />
            </View>
            <TouchableOpacity style={styles.submitBtn}>
                <CustomText style={styles.submitBtnText}>여행 일정 생성</CustomText>
            </TouchableOpacity>
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
    isHaveCarArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: 30
    },
    inputArea: {
        alignSelf: 'center',
        marginBottom: 20
    },
    input: {
        borderColor: "#000000",
        borderWidth: 1,
        width: deviceWidth * 0.7,
        borderRadius: 10,
        padding: 10
    },
    keywordContainer: {
        marginVertical: 20,
        paddingHorizontal: 20
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        fontWeight: 'bold'
    },
    keywordButton: {
        borderWidth: 1,
        borderColor: "#000000",
        borderRadius: 20,
        padding: 10,
        marginRight: 10,
        backgroundColor: "#f9f9f9"
    },
    selectedKeyword: {
        backgroundColor: "#007BFF",
        borderColor: "#007BFF"
    },
    keywordText: {
        color: "#000000"
    },
    customInput: {
        borderColor: "#000000",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10
    },
    submitBtn : {
        width: deviceWidth * 0.3,
        height: 40,
        alignSelf: 'center',
        borderColor: "#000000",
        borderWidth: 2,
        borderRadius: 8,
        justifyContent: "center"
    },
    submitBtnText : {
        textAlign: 'center',
        fontSize: 15
    }
});

export default AIRecommandScreen;
