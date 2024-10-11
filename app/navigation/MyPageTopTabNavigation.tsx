import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPageScreen from '../screens/MyPageScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

const MyPageTopTabNavigation: React.FC = () =>  {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarLabelStyle: { fontSize: 15 },  // 폰트 크기와 두께 설정
      tabBarActiveTintColor: '#000000',   // 선택된 탭 텍스트 색상
      tabBarInactiveTintColor: '#cccccc', // 선택되지 않은 탭 텍스트 색상
      tabBarIndicatorStyle: {
        backgroundColor: '#000000',  // 선택된 탭 하단 바 색상
        height: 2,  // 하단 바의 두께
        width: 0.7
      },
      tabBarStyle: {
        justifyContent: 'flex-start',
        shadowColor: '#000',    // 상단 탭의 그림자 색상
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 4,  // Android에서 그림자 효과를 위한 elevation 설정
      },
      
      tabBarItemStyle: {
        alignItems: 'flex-start', // 각 탭 아이템을 왼쪽 정렬
        width: 'auto',            // 탭의 너비를 컨텐츠에 맞게 설정
      },
      tabBarContentContainerStyle: {
        alignItems: 'flex-start', // 탭 전체 컨테이너도 왼쪽으로 정렬
      },
      swipeEnabled: false,  // 슬라이드 기능 비활성화
    }}>
      <Tab.Screen 
      name="mypage" 
      component={MyPageScreen} 
      options={{
        tabBarLabel: "내 여행"
      }}
      />
      <Tab.Screen 
      name="profile" 
      component={ProfileScreen} 
      options={{
        tabBarLabel: "내 프로필"
      }}
      />
    </Tab.Navigator>
  );
}

export default MyPageTopTabNavigation;