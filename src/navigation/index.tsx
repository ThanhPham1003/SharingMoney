import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Components, Login } from '../pages';

interface NavigationProps {}

const Stack = createNativeStackNavigator();
const Navigation: React.FC<NavigationProps> = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="COMPONENTS" component={Components} />
                <Stack.Screen name="LOGIN" component={Login} />
            </Stack.Navigator>
        </NavigationContainer>
    );;
};

export default Navigation;


