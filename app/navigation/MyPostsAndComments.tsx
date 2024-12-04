import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPostsScreen from '../screens/MyPostsScreen';
import MyCommentsScreen from '../screens/MyCommentsScreen';
import { StyleSheet, View, Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const MyPostsAndComents: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarLabel: ({ focused }) => (
                    <View
                        style={[
                            styles.tabButton,
                            focused ? styles.tabButtonActive : styles.tabButtonInactive,
                        ]}
                    >
                        <Text
                            style={[
                                styles.tabButtonText,
                                focused ? styles.tabButtonTextActive : styles.tabButtonTextInactive,
                            ]}
                        >
                            {route.name === 'myposts' ? '내 게시글' : '내 댓글'}
                        </Text>
                    </View>
                ),
                tabBarStyle: {
                    backgroundColor: 'transparent', // 탭 배경 투명
                    elevation: 0, // 그림자 제거
                    justifyContent: "flex-start"
                },
                tabBarIndicatorStyle: {
                    height: 0, // 하단 인디케이터 제거
                },
                tabBarContentContainerStyle: {
                    justifyContent: "flex-start", // 탭 간의 균등 분배
                },
                tabBarItemStyle: {
                    width: 'auto'
                },
                tabBarPressColor: "transparent",
                swipeEnabled: false,
                animationEnabled: false
            })}
        >
            <Tab.Screen name="myposts" component={MyPostsScreen} />
            <Tab.Screen name="mycomments" component={MyCommentsScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabButton: {
        paddingVertical: 6,
        paddingHorizontal: 13,
        borderRadius: 20,
        borderWidth: 1,
        // marginHorizontal: 1, // 탭 간의 간격
    },
    tabButtonActive: {
        backgroundColor: '#000',
        borderColor: '#000',
    },
    tabButtonInactive: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    tabButtonTextActive: {
        color: '#fff',
    },
    tabButtonTextInactive: {
        color: '#000',
    },
});

export default MyPostsAndComents;
