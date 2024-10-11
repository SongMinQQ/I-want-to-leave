import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CoursesScreen from '../screens/CoursesScreen';
import ChattingMainScreen from '../screens/ChattingMainScreen';
import SettingScreen from '../screens/SettingScreen';
import MyPageTopTabNavigation from './MyPageTopTabNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'


const Tab = createBottomTabNavigator();

const MainContentsNavigation: React.FC = () => {
    return (
        <Tab.Navigator
        screenOptions={{
            tabBarActiveTintColor: '#000000',  // 활성화된 탭의 아이콘 색상
            tabBarInactiveTintColor: '#888888',  // 비활성화된 탭의 아이콘 색상
            tabBarStyle: {
                paddingTop: 5,   // 탭 바 위쪽 여백
                paddingBottom: 5, // 탭 바 아래쪽 여백
                height: 54,       // 전체 탭 바의 높이를 조정
            },
        }}>
            <Tab.Screen 
            name='courses' 
            component={CoursesScreen} 
            options={{
                tabBarIcon:({color}) => (<Entypo name='home' size={20} color={color}/>),
                tabBarLabel: "홈"
            }}
            />
            <Tab.Screen 
            name='chatting' 
            component={ChattingMainScreen}
            options={{
                tabBarIcon:({color}) => (<Entypo name='chat' size={20} color={color}/>),
                tabBarLabel: "채팅"
            }}
            />
            <Tab.Screen 
            name='mypageContainer' 
            component={MyPageTopTabNavigation}
            options={{
                tabBarIcon:({color}) => (<Ionicons name='person' size={20} color={color}/>),
                tabBarLabel: "마이페이지"
            }}
            />
            <Tab.Screen 
            name='setting' 
            component={SettingScreen}
            options={{
                tabBarIcon:({color}) => (<MaterialIcons name='settings' size={20} color={color}/>),
                tabBarLabel: "설정"
            }}
            />
        </Tab.Navigator>
    );
};

export default MainContentsNavigation;