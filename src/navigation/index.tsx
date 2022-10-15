import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Components, Login } from '../pages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

interface NavigationProps {}

const Tab = createBottomTabNavigator();
const Navigation: React.FC<NavigationProps> = (props) => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="COMPONENTS" component={Components} />
                <Tab.Screen name="LOGIN" component={Login} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
