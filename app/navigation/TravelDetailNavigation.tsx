import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TravelLobbyScreen from '../screens/TravelLobbyScreen';
import TravelScheduleScreen from '../screens/TravelScheduleScreen';
import TravelRouteScreen from '../screens/TravelRouteScreen';
import TravelAiScreen from '../screens/TravelAiScreen';
import { Alert } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { urls } from '../utils/requests';
import { useEffect, useState } from 'react';

const Tab = createMaterialTopTabNavigator();
type TravelDetailNavigationRouteProp = RouteProp<RootStackParamList, 'TravelDetailNavigation'>;
const TravelDetailNavigation: React.FC = () => {
    const token = useSelector((state: RootState) => state.getToken.token);
    const route = useRoute<TravelDetailNavigationRouteProp>();
    const travelCode = route.params.travelCode;

    const [travelDetail, setTravelDetail] = useState({});
    const getTravelDetailInfo = async() => {
        try{
            const response = await axios.get(`${urls.getTravelDetail}${travelCode}`,{
                headers:{
                Authorization : token
                }
            })
            console.log(response.data);
            setTravelDetail(response.data);
        }
        catch(err){
            console.error(err);
            Alert.alert("오류","여행 정보를 불러오는데에 실패했습니다.")
        }
    }
    useEffect(() => {
        getTravelDetailInfo();
    },[]);
    return (
        <Tab.Navigator
    screenOptions={{
        tabBarLabelStyle: { fontSize: 15 },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#cccccc',
        tabBarIndicatorStyle: {
            backgroundColor: '#000000',
            height: 2,
            width: 0.7
        },
        tabBarStyle: {
            justifyContent: 'flex-start',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 4,
        },
        tabBarItemStyle: {
            alignItems: 'flex-start',
            width: 'auto',
        },
        tabBarContentContainerStyle: {
            alignItems: 'flex-start',
        },
        swipeEnabled: false,
    }}
>
    <Tab.Screen
        name="travelLobby"
        options={{
            tabBarLabel: "여행 로비"
        }}
    >
        {(props) => <TravelLobbyScreen {...props} travelDetail={travelDetail} />}
    </Tab.Screen>
    <Tab.Screen
        name="travelSchedule"
        options={{
            tabBarLabel: "여행 일정"
        }}
    >
        {(props) => <TravelScheduleScreen {...props} travelDetail={travelDetail} />}
    </Tab.Screen>
    <Tab.Screen
        name="travelRoute"
        options={{
            tabBarLabel: "여행 경로"
        }}
    >
        {(props) => <TravelRouteScreen {...props} travelDetail={travelDetail} />}
    </Tab.Screen>
    <Tab.Screen
        name="aiEvaluate"
        options={{
            tabBarLabel: "AI 평가"
        }}
    >
        {(props) => <TravelAiScreen {...props} travelDetail={travelDetail} />}
    </Tab.Screen>
</Tab.Navigator>

    );
}

export default TravelDetailNavigation;