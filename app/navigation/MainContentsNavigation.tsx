import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import CoursesScreen from '../screens/CoursesScreen';
import ChattingMainScreen from '../screens/ChattingMainScreen';
import SettingScreen from '../screens/SettingScreen';
import MyPageTopTabNavigation from './MyPageTopTabNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';


const Tab = createBottomTabNavigator();

const EmptyScreen: React.FC = () => {
    return null; // Empty screen component
};

const MainContentsNavigation: React.FC = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
                name="WriteSchedule"
                component={EmptyScreen} // 나는 오로지 버튼만 필요한데
                options={{
                tabBarIcon: ({ color }) => <AntDesign name="pluscircleo" size={20} color={color} />,
                tabBarLabel: '마이페이지',
                // Custom button for the third tab
                tabBarButton: () => (
                    <TouchableOpacity
                    onPress={() => navigation.navigate('WriteTripSchedule')} // Navigate to your new screen
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                    >
                    <AntDesign name="pluscircleo" size={28} color={"#000000"} />
                    </TouchableOpacity>
                ),
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