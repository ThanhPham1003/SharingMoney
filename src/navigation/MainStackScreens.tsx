import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreatingRoom } from '../pages';
import TabStackScreens from './TabStackScreens';

interface MainStackScreensProps {}

export type MainStackParamList = {
    SHARINGMONEY: undefined;
    CREATINGROOM: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const MainStackScreens: React.FC<MainStackScreensProps> = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="SHARINGMONEY" component={TabStackScreens} />
            <Stack.Screen name="CREATINGROOM" component={CreatingRoom} />
        </Stack.Navigator>
    );
};

export default MainStackScreens;
