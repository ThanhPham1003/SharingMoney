import * as React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Home, Friends, Profile, Notifications } from '../pages';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
interface TabStackScreensProps {
    theme: Theme;
}

type TabStackParamList = {
    HOME: undefined;
    FRIENDS: undefined;
    PROFILE: undefined;
    NOTIFICATIONS: undefined;
};

const TabStack = createBottomTabNavigator<TabStackParamList>();
const TabStackScreens: React.FC<TabStackScreensProps> = (props) => {
    const { colors } = useTheme();
    const screenOptions = ({ route }) => ({
        tabBarIcon: ({ focused = false, color = ""  }) => {
                let iconName;

                if (route?.name === 'HOME') {
                    iconName = focused ? 'home' : 'home-outline';
                } else if (route?.name === 'FRIENDS') {
                    iconName = focused ? 'people-sharp' : 'people-outline';
                } else if (route?.name === 'PROFILE') {
                    iconName = focused ? 'person' : 'person-outline';
                } else if (route?.name === 'NOTIFICATIONS') {
                    iconName = focused ? 'notifications-sharp' : 'notifications-outline';
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={25} color={color} />;
            },
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: 'gray',
    });
  
  return (
      <TabStack.Navigator screenOptions={screenOptions}>
          <TabStack.Screen name="HOME" component={Home} options={{ headerShown: false }} />
          <TabStack.Screen name="FRIENDS" component={Friends} options={{ headerShown: false }} />
          <TabStack.Screen name="PROFILE" component={Profile} options={{ headerShown: false }} />
          <TabStack.Screen
              name="NOTIFICATIONS"
              component={Notifications}
              options={{ headerShown: false }}
          />
      </TabStack.Navigator>
  );
}
export default withTheme(TabStackScreens);
