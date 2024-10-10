import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyPageScreen from '../screens/MyPageScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createMaterialTopTabNavigator();

const MyPageTopTabNavigation: React.FC = () =>  {
  return (
    <Tab.Navigator>
      <Tab.Screen name="mypage" component={MyPageScreen} />
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default MyPageTopTabNavigation;