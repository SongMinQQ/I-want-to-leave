import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import CoursesScreen from '../screens/CoursesScreen';
import MyPageScreen from '../screens/MyPageScreen';
import ChattingMainScreen from '../screens/ChattingMainScreen';
import SettingScreen from '../screens/SettingScreen';

const Tab = createMaterialBottomTabNavigator();

const MainContentsNavigation: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='courses' component={CoursesScreen}/>
            <Tab.Screen name='chatting' component={ChattingMainScreen}/>
            <Tab.Screen name='mypage' component={MyPageScreen}/>
            <Tab.Screen name='setting' component={SettingScreen}/>
        </Tab.Navigator>
    );
};

export default MainContentsNavigation;