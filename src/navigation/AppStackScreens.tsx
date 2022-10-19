import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Components, Login, Home, CreatingRoom } from '../pages';
import MainStackScreens from './MainStackScreens'

interface AppStackScreensProps {}

const Stack = createNativeStackNavigator();
const AppStackScreens: React.FC<AppStackScreensProps> = (props) => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen name="LOGIN" component={Login} options={{headerShown: false}}/>
                <Stack.Screen name="MAIN" component={MainStackScreens} options={{headerShown: false}}/>
                {/* <Stack.Screen name="HOME" component={Home} />
                <Stack.Screen name="CREATINGROOM" component={CreatingRoom} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStackScreens;


