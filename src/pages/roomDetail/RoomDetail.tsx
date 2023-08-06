import react, { useEffect, useState, useContext } from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView, Alert } from 'react-native';
import {ExpenseCard} from '../../components'
import { Header } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import {UserCard} from '../../components';
import { Button} from '../../shared/components';
import { get } from 'lodash';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_ROOM_MUTATION, REMOVE_ROOM_MUTATION } from '@root/graphql/mutations/room.mutation';
import reactotron from 'reactotron-react-native';
import { GET_ALL_EXPENSES } from '@root/graphql/queries/expense.query';
import { IExpense } from '@root/shared/interfaces/expense.interface';
import { IUser } from '@root/shared/interfaces/user.interface';
import MemberRoomList from '../memberRoomList/MemberRoomList';
import { IRoom } from '@root/shared/interfaces/room.interface';
import TextInput from '../../shared/components/textInput/TextInput'
import { ExpenseUpdatedContext } from '@root/context';
import ChattingRoom from '../chattingRoom/ChattingRoom';
import { Decode } from '@root/shared/services/decode/jwt-decode';
import { RoomUpdatedContext, RoomUpdatedProvider } from '@root/context';
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
  const [isMembersListActive, setIsMembersListActive] = useState<boolean>(true)
  const [isUpdatingRoom, setIsUpdatingRoom] = useState<boolean>(false)
  const [isMakeAdmin, setIsMakeAdmin] = useState<boolean>(false)
  const activeColor = colors.primary;
  const [expenseList, setExpenseList] = useState([])
  const [focusUser, setFocusUser] = useState({
    name:"",
    _id:""
  })
  const [searchingText, setSearchingText] = useState('');
  const reloadContext = useContext(ExpenseUpdatedContext)
  const reloadRoomList = useContext(RoomUpdatedContext)

  const [currentUser, setCurrentUser] = useState({
    id: ""
  } || null);
  const { data, loading, error, refetch } = useQuery(GET_ALL_EXPENSES, {
    variables: { roomId: room?._id},
  });
  const [updateRoom, { error: errorUpdateRoom, loading: isLoading, data: updateRoomData}] = useMutation(UPDATE_ROOM_MUTATION);
  
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
  const getId = async () => {
    const currentUser = await Decode.decodeToken();
    if(currentUser){
      setCurrentUser(currentUser);
    } 
  }
  const makeAdmin = () =>{
    Alert.alert('Alert', `Do you want to make ${focusUser.name} for admin?`,[
      {text: 'Confirm', onPress: () => {
        Alert.alert('Alert', `${focusUser.name} is admin now.`);
        setIsMakeAdmin(false);
      }},
      {text: 'Cancel', onPress: () => console.log("cancel")}
    ])
  }
  const deleteMember = async () => {
    Alert.alert("Alert", `Do you want to delete ${focusUser.name} from this room?`, [
      {text: "Cancel", onPress: () => setIsMakeAdmin(false)},
      {text: "Confirm", onPress: async () => {
        const newMembers = room.users.filter((id: string) => id !==focusUser._id)
        console.log("444444", newMembers)
        const newRoom = {id: room._id, image: room.image, name: room.name, description: room.description, owner:room.owner, users: newMembers}
        try{
          await updateRoom({
            variables: { updateRoomInput: newRoom}
          })
          Alert.alert('Alert', 'Delete Member Successfully', [
            {text: 'OK', onPress: () => {
              reloadRoomList?.setReload({isRoomListUpdated: true})
              navigation.navigate('SHARINGMONEY', {});
            }}
          ])
        }catch{
          Alert.alert('Alert',"Couldn't add new members.", [
          
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      }}
    ])
  }
  const deleteRoom = () => {
    // Alert.alert("Alert", 'Do you want to delete this room?', [
    //   {text: "Cancel", onPress: () => console.log("cancel")},
    //   {text: "Confirm", onPress: async () => {
    //     try{
    //       await 
    //     }
    //   }}
    // ])
  }

  const backHome = () =>{
    navigation.navigate('SHARINGMONEY', {})
  }
  const toCreatingExpense = () => {
    navigation.navigate('CREATINGEXPENSE', {room: room})
  }
  const toAddNewMembers = () => {
    navigation.navigate('ADDNEWMEMBERS',{room: room, currentUserID: currentUser.id})
  }
  const toUpdateRoomInfo = () => {
    navigation.navigate('UPDATEROOMINFO',{room: room})
  }

  useEffect(() => {
    refetch();
  }, [reloadContext?.reload?.isExpenseListUpdated])
  useEffect(() => {
    if(data){
        setExpenseList(data.expenses)
    }
  }, [data])
  useEffect( () => {
    getId();  
  },[])



  return (
    <SafeAreaView style={styles.Container}>
      <Header 
        iconLeft={
              <TouchableOpacity onPress={() => backHome()}>
                <Icon name="left" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title={room.name}
        iconRight={
          <TouchableOpacity onPress={() => setIsUpdatingRoom(true)}>
            <Icon2 name="dots-three-vertical" size={25} color={colors.neutral_4} />
          </TouchableOpacity>
        } 
      />
      {!isUpdatingRoom ? (
        <>
          <View style={{...styles.TopTab}}>
            {isExpensesActive ? (
              <>
                <TouchableOpacity style={{...styles.ExpensesList,borderBottomColor: activeColor}} onPress={() => setIsExpensesActive(true)}>
                  <Text style={{...styles.TopTabTitle, color: activeColor}}>Expenses List</Text>
                </TouchableOpacity >
                <TouchableOpacity  style={{...styles.MembersList, borderColor: colors.neutral_8}} onPress={() => {setIsExpensesActive(false); setIsMembersListActive(true)}}>
                  <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Members List</Text>
                </TouchableOpacity >
                <TouchableOpacity  style={{...styles.MembersList, borderColor: colors.neutral_8}} onPress={() => {setIsExpensesActive(false); setIsMembersListActive(false)}}>
                  <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Messenger</Text>
                </TouchableOpacity >
              </>
            ):(
              <>
                <TouchableOpacity style={{...styles.ExpensesList, borderColor: colors.neutral_8}} onPress={() => {setIsExpensesActive(true)}}>
                  <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Expenses List</Text>
                </TouchableOpacity >
                {isMembersListActive ?(
                  <>
                    <TouchableOpacity  style={{...styles.MembersList, borderBottomColor: activeColor}} onPress={() => {setIsExpensesActive(false); setIsMembersListActive(true)}}>
                      <Text style={{...styles.TopTabTitle, color: activeColor}}>Members List</Text>
                    </TouchableOpacity >
                    <TouchableOpacity  style={{...styles.MembersList, borderColor: colors.neutral_8}} onPress={() => {setIsExpensesActive(false); setIsMembersListActive(false)}}>
                      <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Messenger</Text>
                    </TouchableOpacity >
                  </>
                ):(
                  <>
                    <TouchableOpacity  style={{...styles.MembersList, borderBottomColor: colors.neutral_8}} onPress={() => {setIsExpensesActive(false); setIsMembersListActive(true)}}>
                      <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Members List</Text>
                    </TouchableOpacity >
                    <TouchableOpacity  style={{...styles.MembersList, borderColor: activeColor}} onPress={() => {setIsExpensesActive(false); setIsMembersListActive(false)}}>
                      <Text style={{...styles.TopTabTitle, color: activeColor}}>Messenger</Text>
                    </TouchableOpacity >
                  </>
                )}
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
              {isMembersListActive ? (
                <>
                  <View style={{flex: 0.85}}>
                    {room.users && 
                      room.users.map((memberId: string, index: number) => (
                        <MemberRoomList key={index} memberId={memberId} isMakeAdmin={isMakeAdmin} setIsMakeAdmin={setIsMakeAdmin} setFocusUser={setFocusUser}/>
                      ))
                    }
                  </View>
                  {isMakeAdmin ?(
                    <View style ={{...styles.MakeAdminSection, borderTopColor: colors.neutral_4, backgroundColor: colors.primary_10}}>
                      <TouchableOpacity onPress={() => makeAdmin()}>
                        <Text style={styles.TextRoomUpdate}>Make Admin</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteMember()}>
                        <Text style={styles.TextRoomUpdate}>Delete</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => setIsMakeAdmin(false)}>
                        <Text style={styles.TextRoomUpdate}>Cancel</Text>
                      </TouchableOpacity>
                    </View>
                  ):(
                    <></>
                  )}
                 
                  
                </>
                ):(
                  <ChattingRoom room={room}/>
                )}
                  
              </>
            )}
          </View>
        </>
      ):(
        <View style={{...styles.UpdateSection}}>
          <View style={styles.UpdatePart}>
            <TouchableOpacity onPress={() => toAddNewMembers()}>
              <Text style={styles.TextRoomUpdate}>Manage Members</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => toUpdateRoomInfo()}>
              <Text style={styles.TextRoomUpdate}>Update Room Information</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.TextRoomUpdate}>Delete Room</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 0.15, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => setIsUpdatingRoom(false)}>
              <Icon name="close" size={25} color={colors.neutral_4} />
            </TouchableOpacity>
          </View>
        </View>
      )}
      

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
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    
  },
  MembersList:{
    flex: 0.33,
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
    flex: 0.15,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  UpdateSection:{
    width: '100%',
    flexDirection: 'row',
    marginTop: 10
  },
  UpdatePart:{
    flex: 0.85,
    marginLeft: 10,
    justifyContent: 'center'
  },
  SearchingSection:{
    marginHorizontal: 10,
    marginTop: 10,
  },
  TextRoomUpdate:{
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 12,
  },
  MakeAdminSection:{
    flex: 0.15,
    borderTopWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  }
  
})

export default RoomDetail;