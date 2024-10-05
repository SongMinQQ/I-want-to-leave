import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from '../screens/LoginScreen';
import JoinMembershipScreen from '../screens/JoinMembershipScreen';
import MainContentsNavigation from './MainContentsNavigation';

const Stack = createStackNavigator();

const StackNavigation: React.FC = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Stack.Navigator >
                {/* headerShown을 false로 설정하여 상단 'Login' 제거 */}
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Join" component={JoinMembershipScreen} />
                <Stack.Screen name="Main" component={MainContentsNavigation} />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default StackNavigation;
