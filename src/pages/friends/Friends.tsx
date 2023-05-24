import react, { useEffect, useState, useContext } from 'react';
import {View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView, Alert} from 'react-native'
import { FriendCard, Header } from '../../components';
import { withTheme, useTheme } from 'react-native-paper';
import { useMutation, useQuery } from '@apollo/client';
import { GET_REQUEST_LIST, GET_ALL_FRIENDS } from '@root/graphql/queries/friend.query';
import { get } from 'lodash';
import { useNavigation } from '@react-navigation/native';

import reactotron from 'reactotron-react-native';

import { Decode } from '@root/shared/services/decode/jwt-decode';
import { Button } from '../../shared/components';
import Icon from 'react-native-vector-icons/AntDesign';
import RequestFriend from './RequestFriend';
import { IFriend } from '@root/shared/interfaces/friend.interface';
import { DELETE_FRIEND_MUTATION } from '@root/graphql/mutations/friend.mutation';
import { FriendUpdatedContext} from '@root/context';
interface FriendsProps{}
// const useGetList = (data: any, loading: boolean) => {
//   const [list, setList] = useState([]);
//   useEffect(() => {
//       if (!loading && data) {
//           setList(data);
//       }
//   }, [data, loading]);
//   return get(list, 'friends', []);
// };
const Friends: React.FC<FriendsProps> = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const activeColor = colors.primary;
  const [isFriendsActive, setIsFriendsActive] = useState<boolean>(true)
  const [isDeletingFriend, setIsDeletingFriend] = useState<boolean>(false)
  const [friendList, setFriendList] = useState([])
  const reloadContext = useContext(FriendUpdatedContext)
  const [focusFriend, setFocusFriend] = useState({
    _id:"",
    name: ""
  })
  const [currentUser, setCurrentUser] = useState({
    id: ""
} || null);
  const [modalVisible, setModalVisible] = useState(false);
  const getId = async () => {
    const currentUser = await Decode.decodeToken();
    if(currentUser){
      setCurrentUser(currentUser);
    } 
  }
  
  const { data, loading, error, refetch} = useQuery(GET_ALL_FRIENDS, {
    variables: { page: 1, limit: 50, confirmed: true},
  });
  const [deleteFriend, {error: errorCreateExpense, loading: isLoading, data: createExpenseData}] = useMutation(DELETE_FRIEND_MUTATION)

  const removeFriend = async () =>{
    Alert.alert("Alert", `Do you want to delete ${focusFriend.name} from this room?`, [
      {text: "Cancel", onPress: () => setIsDeletingFriend(false)},
      {text: "Confirm", onPress: async () => {
        try{
          await deleteFriend({
            variables: { id: focusFriend._id}
          })
          Alert.alert('Alert', 'Delete Friend Successfully', [
            {text: 'OK', onPress: () => {
              setIsDeletingFriend(false);
              reloadContext?.setReload({isFriendListUpdated: true})

            }}
          ])
        }catch{
          Alert.alert('Alert',"Couldn't delete friend members.", [
          
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      }}
    ])
  }

  useEffect( () => {
       getId();
  },[]) 
  useEffect(() => {
    refetch();
  },[reloadContext?.reload?.isFriendListUpdated])  
  useEffect(() => {
    if(data){
        setFriendList(data.friends)
    }
  }, [data])
  return (
    <SafeAreaView style={styles.Container}>
      <Header title='FRIENDS'/>
      <View style={{flex: 0.9}}>
        <View style={styles.Tab}>
          
          {isFriendsActive ? (
            <>
              <TouchableOpacity style={{...styles.FriendsTab,backgroundColor: activeColor}} onPress={() => setIsFriendsActive(true)}>
                <Text style={{...styles.TabTitle, color: "#ffffff"}}>Friends</Text>
              </TouchableOpacity >
              <TouchableOpacity  style={{...styles.RequestsTab}} onPress={() => setIsFriendsActive(false)}>
                <Text style={{...styles.TabTitle, color: colors.neutral_4}}>Requests</Text>
              </TouchableOpacity >
            </>
          ):(
            <>
              <TouchableOpacity style={{...styles.FriendsTab}} onPress={() => setIsFriendsActive(true)}>
                <Text style={{...styles.TabTitle, color: colors.neutral_4}}>Friends</Text>
              </TouchableOpacity >
              <TouchableOpacity  style={{...styles.RequestsTab, backgroundColor: activeColor}} onPress={() => setIsFriendsActive(false)}>
                <Text style={{...styles.TabTitle, color: "#ffffff"}}>Requests</Text>
              </TouchableOpacity >
            </>
          )}
        </View>
        
        {isFriendsActive ? (
          <ScrollView contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}>
            {friendList &&
              friendList.map((friend: IFriend, index: number) => (
                <FriendCard key={index} friend={friend} setIsDeletingFriend={setIsDeletingFriend}  setFocusFriend={setFocusFriend} isDeletingFriend={isDeletingFriend} currentUserID={currentUser.id}/>
              ))
            } 
          </ScrollView>  
          
        ):(
          <RequestFriend currentUserID={currentUser.id} />
        )}
      </View>
      {!isDeletingFriend ? (
        <View style={styles.CreateFriendSection}>
          <View style={{ marginRight: 20 }}>
            <Button
              type="primary"
              variant="round"
              size="large"
              onPress={() =>{
                navigation.navigate('CREATINGFRIEND', {});
              }}
            >
              <Icon name="plus" size={30} color="#ffffff" />
            </Button>
          </View>
        </View>

      ):(
        <View style ={{...styles.DeletingMemberSection, borderTopColor: colors.neutral_4, backgroundColor: colors.primary_10}}>
        <TouchableOpacity onPress={() => removeFriend()}>
          <Text style={styles.TextRoomUpdate}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDeletingFriend(false)}>
          <Text style={styles.TextRoomUpdate}>Cancel</Text>
        </TouchableOpacity>
      </View>
      )}


      
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Container:{
    backgroundColor: '#ffffff',
    flex: 1,
  },
  ModalContainer:{
    backgroundColor: '#ffffff',
    width: '90%',
    height: 100

  },
  Tab:{
    flexDirection: 'row',
    height: 30,
    marginTop: 10,
    marginHorizontal: 10,
  },
  FriendsTab:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  RequestsTab:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  TabTitle:{
    fontSize: 13,
    fontWeight: '600'
  },
  CreateFriendSection: {
    flex: 0.1,
    alignItems: 'flex-end',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  TextRoomUpdate:{
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 5,
    marginLeft: 12,
  },
  DeletingMemberSection:{
    flex: 0.1,
    borderTopWidth: 0.5,
    width:'100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
export default withTheme(Friends);