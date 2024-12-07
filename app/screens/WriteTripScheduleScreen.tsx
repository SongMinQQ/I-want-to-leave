import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Keyboard, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PickDate from '../components/writeTripSchedule/PickDate';
import WriteScheduleTitle from '../components/writeTripSchedule/WriteScheduleTitle';
import WriteScheduleInformation from '../components/writeTripSchedule/WriteScheduleInformation';
import SelectScheduleImage from '../components/writeTripSchedule/SelectScheduleImage';
import InviteFriends from '../components/writeTripSchedule/InviteFriends';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SelectDate from '../components/writeTripSchedule/SelectDate';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TripSchedule } from '../types/types';
import WriteTimeline from '../components/writeTripSchedule/WriteTimeline';

const pages = [
    [
        { component: PickDate, title: '날짜 선택' },
        { component: WriteScheduleTitle, title: '여행 제목 작성' },
        { component: WriteScheduleInformation, title: '여행 설명 작성'},
        { component: SelectScheduleImage, title: '대표 이미지 선택' },
        { component: InviteFriends, title: '친구 초대' },
    ],
    [
        // { component: SelectDate, title: '날짜 선택' },
        { component: WriteTimeline, title: '여행 일정 작성'}
    ]
];

const getKoreaCurrentDate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const koreaTime = new Date(now.getTime() + offset + 9 * 60 * 60 * 1000); // 한국 시간으로 변환
    const koreaDate = new Date(
        koreaTime.getFullYear(),
        koreaTime.getMonth(),
        koreaTime.getDate(),
        koreaTime.getHours(),
        koreaTime.getMinutes(),
        koreaTime.getSeconds()
    ); // 타임존 정보 없이 한국 시간으로 Date 객체 생성
    return koreaDate;
};

const WriteTripScheduleScreen: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [newSchedule, setNewSchedule] = useState<TripSchedule>({
        startDate: getKoreaCurrentDate(),
        endDate: getKoreaCurrentDate(),
        title: '',
        information: '',
        image: [],
        member: [],
        schedule: []
    });

    useEffect(() => {
        // 키보드 이벤트 리스너 추가
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });
        // console.log(newSchedule.startDate)
        return () => {
            // 이벤트 리스너 정리
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

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
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollContent}
                extraScrollHeight={10} // 작은 여유만 추가
                enableOnAndroid={true}
                enableAutomaticScroll={false} // 자동 스크롤을 비활성화
                scrollEnabled={!isKeyboardVisible}
            >
                {/* 현재 페이지의 컴포넌트들 렌더링 */}
                {pages[currentPage].map((section, index) => {
                    const SectionComponent = section.component;
                    return (
                        <View key={index} style={styles.section}>
                            <SectionComponent
                                startDate={newSchedule.startDate}
                                endDate={newSchedule.endDate}
                                setNewSchedule={setNewSchedule}
                            />
                        </View>
                    );
                })}
            </KeyboardAwareScrollView>

            {/* 네비게이션 바 (화면 하단에 고정 또는 키보드가 올라오면 스크롤과 함께 위치 조정) */}
            {!isKeyboardVisible && (
                <View style={styles.btnsArea}>
                    {currentPage > 0 && (
                        <TouchableOpacity
                            style={[styles.levelBtn, styles.leftBtn]}
                            onPress={goPreviousPage}
                        >
                            <MaterialIcons name="arrow-back-ios" size={35} color="#000000" />
                            <Text style={styles.btnText}>이전</Text>
                        </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                        style={[styles.levelBtn, styles.rightBtn]}
                        onPress={goNextPage}
                    >
                        <Text style={styles.btnText}>
                            {currentPage < pages.length - 1 ? '다음' : '계획 작성'}
                        </Text>
                        {currentPage < pages.length - 1 ? (
                            <MaterialIcons name="arrow-forward-ios" size={35} color="#000000" />
                        ) : (
                            <MaterialCommunityIcons name='pencil-plus' size={35} color="#000000" />
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
        // paddingHorizontal: 20,
        paddingBottom: 100, // 네비게이션 바 공간 확보
    },
    section: {
        marginBottom: 20,
        // alignItems: 'center'
    },
    btnsArea: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderColor: '#ddd',
    },
    levelBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftBtn: {
        justifyContent: 'flex-start',
        flex: 1,
    },
    rightBtn: {
        justifyContent: 'flex-end',
        flex: 1,
    },
    btnText: {
        color: '#000000',
        fontSize: 20,
    },
});

export default WriteTripScheduleScreen;
