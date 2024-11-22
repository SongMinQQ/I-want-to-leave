import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
type GoogleLoginRouteProp = RouteProp<
    { GoogleLogin: { loginuri: string } },
    'GoogleLogin'
>;
const GoogleLogin: React.FC = () => {
    const route = useRoute<GoogleLoginRouteProp>();
    const loginuri = route.params.loginuri; // 네비게이션 파라미터에서 loginuri 가져오기
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: loginuri }}
                onLoadStart={() => setIsLoading(true)}
                onLoadEnd={() => setIsLoading(false)}
                onNavigationStateChange={(event) => {
                    if (event.url.includes('your-redirect-uri')) {
                        console.log('Redirected to:', event.url);
                        // 성공적으로 인증된 경우 토큰을 가져오도록 처리
                    }
                }}
            />
            {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        </View>
    );
};

export default GoogleLogin;
