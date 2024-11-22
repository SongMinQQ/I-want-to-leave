import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

const GoogleLogin: React.FC<{ loginuri: string }> = ({ loginuri }) => {
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
