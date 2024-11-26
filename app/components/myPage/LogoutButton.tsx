import React from 'react';
import { TouchableOpacity, StyleSheet, Alert, Text } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

interface LogoutButtonProps {
    onLogoutSuccess?: () => void; // 로그아웃 성공 시 실행할 콜백 (선택 사항)
}

const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogoutSuccess }) => {
    const navigation:any = useNavigation();
    const handleLogout = async () => {
        try {
            await GoogleSignin.signOut(); // Google 로그아웃
            Alert.alert('알림', '로그아웃 되었습니다.');
            console.log('User signed out');
            navigation.navigate('Login');
            if (onLogoutSuccess) {
                onLogoutSuccess(); // 성공 시 콜백 실행
            }
        } catch (error: any) {
            console.error('Logout Error:', error.message);
            Alert.alert('Error', 'An error occurred during logout.');
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <AntDesign name="logout" size={24} color="#ffffff" />
            <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DB4437',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginVertical: 10,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        marginLeft: 10,
    },
});

export default LogoutButton;
