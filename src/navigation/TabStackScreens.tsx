import * as React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {Home, Friends, Profile, Notifications} from '../pages'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
interface TabStackScreensProps {
  theme: Theme;
}

const TabStack = createBottomTabNavigator();
const TabStackScreens: React.FC<TabStackScreensProps> = (props) => {
  const { colors } = useTheme();
  const screenOptions =({route}) => ({


    tabBarIcon: ({ focused, color }) => {
      let iconName;

      if (route.name === 'HOME') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'FRIENDS') {
        iconName = focused ? 'people-sharp' : 'people-outline';
      }else if (route.name === 'PROFILE') {
        iconName = focused ? 'person' : 'person-outline';
      }else if (route.name === 'NOTIFICATIONS') {
        iconName = focused ? 'notifications-sharp' : 'notifications-outline';
      }

      // You can return any component that you like here!
      return <Ionicons name={iconName} size = {25} color={color} />;
    },
    tabBarActiveTintColor: colors.primary,
    tabBarInactiveTintColor: 'gray',
  })
  
  return(
    <TabStack.Navigator screenOptions={screenOptions}>
        <TabStack.Screen name="HOME" component={Home} />
        <TabStack.Screen name="FRIENDS" component={Friends} />
        <TabStack.Screen name="PROFILE" component={Profile} />
        <TabStack.Screen name="NOTIFICATIONS" component={Notifications} />
      </TabStack.Navigator>
  )
}
export default withTheme(TabStackScreens);