import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreatingRoom, RoomDetail, ExpenseDetail, CreatingExpense, Friends, CreatingFriend, AddNewMembers, UpdateRoomInfo} from '../pages';
import TabStackScreens from './TabStackScreens';
import { ApolloProvider } from '@apollo/client';
import { client } from '@root/configuration/apollo';

interface MainStackScreensProps {}

export type MainStackParamList = {
    SHARINGMONEY: {};
    FRIENDS:{}
    CREATINGROOM: {};
    ROOMDETAIL: {};
    ADDNEWMEMBERS: {};
    UPDATEROOMINFO: {};
    EXPENSEDETAIL: {};
    CREATINGEXPENSE: {};
    CREATINGFRIEND:{}
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const MainStackScreens: React.FC<MainStackScreensProps> = (props) => {
    return (
        <ApolloProvider client={client}>
            <Stack.Navigator>
                <Stack.Screen
                    name="SHARINGMONEY"
                    component={TabStackScreens}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CREATINGROOM"
                    component={CreatingRoom}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ROOMDETAIL"
                    component={RoomDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="ADDNEWMEMBERS"
                    component={AddNewMembers}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="UPDATEROOMINFO"
                    component={UpdateRoomInfo}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EXPENSEDETAIL"
                    component={ExpenseDetail}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CREATINGEXPENSE"
                    component={CreatingExpense}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FRIENDS"
                    component={Friends}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CREATINGFRIEND"
                    component={CreatingFriend}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </ApolloProvider>
    );
};

export default MainStackScreens;
