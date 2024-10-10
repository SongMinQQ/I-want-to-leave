import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import CoursesScreen from '../screens/CoursesScreen';
import ChattingMainScreen from '../screens/ChattingMainScreen';
import SettingScreen from '../screens/SettingScreen';
import MyPageTopTabNavigation from './MyPageTopTabNavigation';

const Tab = createMaterialBottomTabNavigator();

const MainContentsNavigation: React.FC = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='courses' component={CoursesScreen} />
            <Tab.Screen name='chatting' component={ChattingMainScreen}/>
            <Tab.Screen name='mypageContainer' component={MyPageTopTabNavigation}/>
            <Tab.Screen name='setting' component={SettingScreen}/>
        </Tab.Navigator>
    );
};

export default MainContentsNavigation;