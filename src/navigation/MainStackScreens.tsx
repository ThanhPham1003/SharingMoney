import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {CreatingRoom, RoomDetail, ExpenseDetail, CreatingExpense} from '../pages';
import TabStackScreens from './TabStackScreens'

interface MainStackScreensProps {}

export type MainStackParamList = {
    SHARINGMONEY: undefined;
    CREATINGROOM: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();
const MainStackScreens: React.FC<MainStackScreensProps> = (props) => {
  return(
      <Stack.Navigator >
        <Stack.Screen name="SHARINGMONEY" component={TabStackScreens} options={{headerShown: false}} />
        <Stack.Screen name="CREATINGROOM" component={CreatingRoom} options={{headerShown: false}}/>
        <Stack.Screen name="ROOMDETAIL" component={RoomDetail} options={{headerShown: false}}/>
        <Stack.Screen name="EXPENSEDETAIL" component={ExpenseDetail} options={{headerShown: false}}/>
        <Stack.Screen name="CREATINGEXPENSE" component={CreatingExpense} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}

export default MainStackScreens;
