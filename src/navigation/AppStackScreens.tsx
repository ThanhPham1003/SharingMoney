import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Components, Login, Home, CreatingRoom } from '../pages';
import MainStackScreens from './MainStackScreens';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebaseService } from '@root/shared/services/firebase/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStoreName } from '@root/shared/enums/local-store.enum';
import { useAppDispatch, useAppSelector } from '@root/redux/store';
import { verifyToken } from '@root/redux/app/action';
interface AppStackScreensProps {}

type MainStackParamList = {
    LOGIN: undefined;
    MAIN: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const AppStackScreens: React.FC<AppStackScreensProps> = (props) => {
    const dispatch = useAppDispatch();

    const [initializing, setInitializing] = useState<boolean>(true);
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

    // Handle user state changes
    const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
        if (user) {
            getToken(user);
        }
        setUser(user);
        if (initializing) setInitializing(false);
    };

    const getToken = async (user: FirebaseAuthTypes.User) => {
        const token = await AsyncStorage.getItem(LocalStoreName.TOKEN);
        
        await firebaseService.getToken(user);
        dispatch(verifyToken());
    };

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {!user ? (
                    <Stack.Screen name="LOGIN" component={Login} options={{headerShown: false}} />
                ) : (
                    <Stack.Screen name="MAIN" component={MainStackScreens} options={{headerShown: false}} />
                )}
                {/* <Stack.Screen name="HOME" component={Home} />
                <Stack.Screen name="CREATINGROOM" component={CreatingRoom} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppStackScreens;
