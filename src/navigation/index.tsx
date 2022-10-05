import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Components, Login, Home, CreatingRoom } from '../pages';

interface NavigationProps {}

const Stack = createNativeStackNavigator();
const Navigation: React.FC<NavigationProps> = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="COMPONENTS" component={Components} options={{headerShown: false}} />
                <Stack.Screen name="LOGIN" component={Login} />
                <Stack.Screen name="HOME" component={Home} />
                <Stack.Screen name="CREATINGROOM" component={CreatingRoom} />
            </Stack.Navigator>
        </NavigationContainer>
    );;
};

export default Navigation;


