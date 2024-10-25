import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import PickDate from '../components/writeTripSchedule/PickDate';
import WriteScheduleTitle from '../components/writeTripSchedule/WriteScheduleTitle';
import SelectScheduleImage from '../components/writeTripSchedule/SelectScheduleImage';
import InviteFriends from '../components/writeTripSchedule/InviteFriends';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDate from '../components/writeTripSchedule/SelectDate';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// Pages with multiple components
const pages = [
    [
        { component: PickDate, title: '날짜 선택' },
        { component: WriteScheduleTitle, title: '여행 제목 작성' },
        { component: SelectScheduleImage, title: '대표 이미지 선택' },
        { component: InviteFriends, title: '친구 초대' },
    ],
    [
        { component: SelectDate, title: '날짜 선택' }
    ]
];

const WriteTripScheduleScreen: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0); // Tracks the current page

    const goNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Render all components in the current page */}
                {pages[currentPage].map((section, index) => {
                    const SectionComponent = section.component;
                    return (
                        <View key={index} style={styles.section}>
                            <SectionComponent />
                        </View>
                    );
                })}
            </ScrollView>

            {/* Navigation Buttons */}
            <View style={styles.btnsArea}>
                {/* Previous button (if applicable) */}
                {currentPage > 0 && (
                    <TouchableOpacity
                        style={[styles.levelBtn, styles.leftBtn]}
                        onPress={goPreviousPage}
                    >
                        <MaterialIcons name="arrow-back-ios" size={35} color="#000000" />
                        <Text style={styles.btnText}>이전</Text>
                    </TouchableOpacity>
                )}

                {/* Always show the Next button as a 'Proceed' or 'Submit' button */}
                <TouchableOpacity
                    style={[styles.levelBtn, styles.rightBtn]}
                    onPress={goNextPage} // Adjust this logic as needed
                >
                    <Text style={styles.btnText}>
                        {currentPage < pages.length - 1 ? '다음' : '계획 작성'} {/* "완료" on the last page */}
                    </Text>
                    {currentPage < pages.length - 1 ?
                        <MaterialIcons name="arrow-forward-ios" size={35} color="#000000" />
                        :
                        <MaterialCommunityIcons name='pencil-plus' size={35} color="#000000" />}
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { height } = Dimensions.get('window'); // Get screen height

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensure the container takes up the entire screen
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        // paddingHorizontal: 10,
        paddingBottom: 80, // Ensure space for the buttons
    },
    section: {
        marginBottom: 20, // Add space between sections
    },
    btnsArea: {
        position: 'absolute', // Fixed at the bottom
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF', // Ensure it doesn’t overlap with the content
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    levelBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftBtn: {
        justifyContent: 'flex-start',
        flex: 1, // Push to the far left
    },
    rightBtn: {
        justifyContent: 'flex-end',
        flex: 1, // Push to the far right
    },
    btnText: {
        color: '#000000',
        fontSize: 20,
    },
});

export default WriteTripScheduleScreen;
