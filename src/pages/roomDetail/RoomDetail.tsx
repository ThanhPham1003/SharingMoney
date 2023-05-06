import react, { useEffect, useState } from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import {ExpenseCard} from '../../components'
import { Header } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {UserCard} from '../../components';
import { Button} from '../../shared/components';
import { get } from 'lodash';
import { useQuery } from '@apollo/client';
import reactotron from 'reactotron-react-native';
import { GET_ALL_EXPENSES } from '@root/graphql/queries/expense.query';
import { IExpense } from '@root/shared/interfaces/expense.interface';
import { IUser } from '@root/shared/interfaces/user.interface';
import MemberRoomList from '../memberRoomList/MemberRoomList';
import { IRoom } from '@root/shared/interfaces/room.interface';
import TextInput from '../../shared/components/textInput/TextInput'
interface RoomDetailProps {
  room?: IRoom
  route: any
}
const RoomDetail: React.FC<RoomDetailProps> = () => {
  const route = useRoute();
  const room = route.params.room;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isExpensesActive, setIsExpensesActive] = useState<boolean>(true)
  const activeColor = colors.primary;
  const [expenseList, setExpenseList] = useState([])
  const [searchingText, setSearchingText] = useState('');
  const { data, loading, error } = useQuery(GET_ALL_EXPENSES, {
    variables: { roomId: room?._id},
  });
  const searchFilter = (text: string) => {
    if(text) {
        const newExpenseList = data.expenses.filter((item: IExpense, index: number) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setExpenseList(newExpenseList)
      setSearchingText(text);
    }else{
      setExpenseList(data.expenses);
      setSearchingText(text);
    }
}

  const backHome = () =>{
    navigation.navigate('SHARINGMONEY', {})
  }
  const toCreatingExpense = () => {
    navigation.navigate('CREATINGEXPENSE', {room: room})
  }
  useEffect(() => {
    if(data){
        setExpenseList(data.expenses)
    }
}, [data])

  return (
    <SafeAreaView style={styles.Container}>
      <Header 
        iconLeft={
              <TouchableOpacity onPress={() => backHome()}>
                <Icon name="left" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='ROOM DETAIL'
      />
      <View style={{...styles.TopTab}}>
        {isExpensesActive ? (
          <>
            <TouchableOpacity style={{...styles.ExpensesList,borderBottomColor: activeColor}} onPress={() => setIsExpensesActive(true)}>
              <Text style={{...styles.TopTabTitle, color: activeColor}}>Expenses List</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.MembersList, borderColor: colors.neutral_8}} onPress={() => setIsExpensesActive(false)}>
              <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Members List</Text>
            </TouchableOpacity >
          </>
        ):(
          <>
            <TouchableOpacity style={{...styles.ExpensesList, borderColor: colors.neutral_8}} onPress={() => setIsExpensesActive(true)}>
              <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Expenses List</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.MembersList, borderBottomColor: activeColor}} onPress={() => setIsExpensesActive(false)}>
              <Text style={{...styles.TopTabTitle, color: activeColor}}>Members List</Text>
            </TouchableOpacity >
          </>
        )}
        
      </View>
      <View style={styles.TabContent}>
        {isExpensesActive ?(
          <>
            <View style={styles.SearchingSection}>
                <TextInput
                    iconLeft={
                        <Icon style={{marginLeft: 5}} name="search1" size={20} color={colors.neutral} />
                    }
                    variant='one-line'
                    placeholder='Searching expense here...'
                    text={searchingText}
                    setText={(text) => searchFilter(text)}
                />
            </View>
            <ScrollView style={styles.CardSection} contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}>
                  {expenseList &&
                      expenseList.map((expenseDetail: IExpense, index: number) => (
                          <ExpenseCard key={index} room ={room} expense={expenseDetail}/>
                      ))
                  }
            </ScrollView>
            <View style={styles.AddButtonSection}>
              <View style={{marginRight: 20}}>
                  <Button 
                    type="primary" 
                    variant="round" 
                    size="large"
                    onPress={() => toCreatingExpense()}
                  >
                    <Icon name="plus" size={30} color="#ffffff"/>
                  </Button>
              </View>
            </View>
          </>
        ):(
          <>
            {/* <UserCard
                elementLeft={
                  <Image  style={styles.PictureProfile}
                    source={require('../../assets/images/Facebook-Logo.png')} 
                  />
                } 
                name="Pham Thanh Binh"
              /> */}
              {room.users && 
                room.users.map((memberId: string, index: number) => (
                  <MemberRoomList key={index} memberId={memberId}/>
                ))
              }
              
          </>
        )}
      </View>
      

    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  Container:{
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  TopTab:{
    flex: 0.075,
    width: '100%',
    
    flexDirection: 'row'
  },
  TopTabTitle:{
    fontSize: 13,
    fontWeight: '600'
  },
  TabContent:{
    flex: 0.925,
    width: '100%'
  },
  ExpensesList:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    
  },
  MembersList:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
  },
  PictureProfile:{
    width: 40,
    height: 40,
  },
  CardSection:{
    flex: 0.8,
    width: '100%',
  },
  AddButtonSection:{
    flex: 0.125,
    width: '100%',
    alignItems: 'flex-end',
  },
  SearchingSection:{
    marginHorizontal: 10,
    marginTop: 10,
  }
  
})

export default RoomDetail;