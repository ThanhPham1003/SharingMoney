import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import {  Text, StyleSheet, SafeAreaView, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Header } from '../../components';
import { withTheme, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IRoom } from '@root/shared/interfaces/room.interface';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_FRIENDS } from '@root/graphql/queries/friend.query';
import { get } from 'lodash';
import { IFriend } from '@root/shared/interfaces/friend.interface';
import TextInput from '../../shared/components/textInput/TextInput'
import {AddMemberCard} from '@root/components';
import reactotron from 'reactotron-react-native';
import MemberAddedCard from '@root/components/addMemberCard/MemberAddedCard';
import { Button} from '../../shared/components';
import { UPDATE_ROOM_MUTATION } from '@root/graphql/mutations/room.mutation';
import { RoomUpdatedContext, RoomUpdatedProvider } from '@root/context';
interface AddNewMembersProps{
  room: IRoom
  currentUserID: string
}

const AddNewMembers: React.FC<AddNewMembersProps> = () =>{
  const route = useRoute();
  const room = route.params.room;
  const currentUserID = route.params.currentUserID;
  const { colors } = useTheme();
  const [members, setMembers] = useState([])
  const navigation = useNavigation();
  const [availableFriend, setAvailableFriend] = useState([]);
  const [email, setEmail] = React.useState('')
  const [isValidEmail, setIsValidEmail] = React.useState(false)
  const [isRoomMemberActive, setIsRoomMemberActive] = React.useState<boolean>(true)
  const [friendList, setFriendList] = useState([]);
  const reloadContext = useContext(RoomUpdatedContext)
  const activeColor = colors.primary;
  const { data, loading, error } = useQuery(GET_ALL_FRIENDS, {
    variables: { page: 1, limit: 50, confirmed: true},
  });
  const [updateRoom, { error: errorUpdateRoom, loading: isLoading, data: updateRoomData}] = useMutation(UPDATE_ROOM_MUTATION);
  const selectMember = (id: string) =>{
    setMembers([...members, id])
  }
  const deleteMember = (id: string) => {
    setMembers(members.filter(members => members !== id))
  }
  const backHome = () =>{
    navigation.goBack();
  }
  const checkAvailable = () => {
    if(data){
      const available = data.friends.filter((item: IFriend, index:number) =>{
          const frId = item.requester === currentUserID ? item.receiver : item.requester
          return members.indexOf(frId) === -1
      })
      setAvailableFriend(available);
    }
  }
  const verifyEmail = (email : string) => {
    let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    if(regex.test(email)){
      setIsValidEmail(true)
    }else setIsValidEmail(false)
  }
  const AddNewMembers = async () =>{
    if(members.length === 0)
    {
      Alert.alert('Alert', 'Please select the friends want to add to the group',[
        {text: 'OK', onPress: () => {}}
      ])
    }else{
      const newMember = [...members, currentUserID]
      const newRoom = {id: room._id, image: room.image, name: room.name, description: room.description, owner:room.owner, users: newMember}
      try{
        await updateRoom({
          variables: { updateRoomInput: newRoom}
        })
        Alert.alert('Alert', 'Updated Members Successfully', [
          {text: 'OK', onPress: () => {
            reloadContext?.setReload({isRoomListUpdated: true})
            navigation.goBack();
          }}
        ])
      }catch{
        Alert.alert('Alert',"Couldn't update members.", [
        
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    }
  }
  useEffect(() =>{
    if(room.users){
      const onlyMember = room.users.filter((id: string) => id !== currentUserID)
      setMembers(onlyMember)
    }
  }, [])
  useEffect(() => {
    checkAvailable()
  }, [data, members])
  useEffect(() => {
    verifyEmail(email)
  }, [email])
  // useEffect(() =>{

  //     const newFriendList = availableList.filter((item: IFriend, index: number) => {
  //       const frId = item.requester === currentUserID ? item.receiver : item.requester
  //       return members.indexOf(frId) === -1
  //     })
  //     setAvailableFriend(newFriendList)

  // }, [members])
  

  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconRight={
              <TouchableOpacity onPress={() => backHome()}>
                <Icon name="close" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='MANAGE ROOM MEMBERS'
      />
      {/* <View style={styles.AddMemberTab}>
        
        {isFriendsActive ? (
          <>
            <TouchableOpacity style={{...styles.FriendsTab,backgroundColor: activeColor}} onPress={() => setIsFriendsActive(true)}>
              <Text style={{...styles.TabTitle, color: "#ffffff"}}>Friends</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.OthersTab}} onPress={() => setIsFriendsActive(false)}>
              <Text style={{...styles.TabTitle, color: colors.neutral_4}}>Others</Text>
            </TouchableOpacity >
          </>
        ):(
          <>
            <TouchableOpacity style={{...styles.FriendsTab}} onPress={() => setIsFriendsActive(true)}>
              <Text style={{...styles.TabTitle, color: colors.neutral_4}}>Friends</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.OthersTab, backgroundColor: activeColor}} onPress={() => setIsFriendsActive(false)}>
              <Text style={{...styles.TabTitle, color: "#ffffff"}}>Others</Text>
            </TouchableOpacity >
          </>
        )}
      </View> */}
      {/* {isFriendsActive ? ( */}
      <View style={styles.AddMemberTab}>
        {isRoomMemberActive ? (
            <>
              <TouchableOpacity style={{...styles.FriendsTab,backgroundColor: activeColor}} onPress={() => setIsRoomMemberActive(true)}>
                <Text style={{...styles.TabTitle, color: "#ffffff"}}>Room Members</Text>
              </TouchableOpacity >
              <TouchableOpacity  style={{...styles.OthersTab}} onPress={() => setIsRoomMemberActive(false)}>
                <Text style={{...styles.TabTitle, color: colors.neutral_4}}>Pending</Text>
              </TouchableOpacity >
            </>
          ):(
            <>
              <TouchableOpacity style={{...styles.FriendsTab}} onPress={() => setIsRoomMemberActive(true)}>
                <Text style={{...styles.TabTitle, color: colors.neutral_4}}>Room Members</Text>
              </TouchableOpacity >
              <TouchableOpacity  style={{...styles.OthersTab, backgroundColor: activeColor}} onPress={() => setIsRoomMemberActive(false)}>
                <Text style={{...styles.TabTitle, color: "#ffffff"}}>Pending</Text>
              </TouchableOpacity >
            </>
          )}
      </View> 
      {isRoomMemberActive ?(
      <>
          <View style={styles.AddFriendArea}>        
            <View style={{...styles.FriendList, borderColor: colors.neutral_7}}>
              <FlatList
                data={availableFriend}
                renderItem={({item})  => <AddMemberCard friend={item} selectMember={selectMember} currentUserID={currentUserID} /> }
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        <View style={styles.MemberAddedArea}>
          <FlatList
              data={members}
              renderItem={({item})  => <MemberAddedCard id={item} deleteMember={deleteMember}/> }
              keyExtractor={(item, index) => index.toString()}
          />
        </View>    
        <View style={styles.ConfirmButton}>
                <Button 
                type='primary'
                variant='filled'
                size='large'
                onPress={() => AddNewMembers()}
                >
                  <Text style={styles.ConfirmButtonText}>Add</Text>
                </Button>
        </View>
      </>

      ):(
        <></>
      )}      

      {/* ):(
        <View style={styles.TextInputArea}>
          <TextInput
            variant='one-line'
            placeholder='Enter email of other'
            text={email}
            setText={(text) => setEmail(text)}
          />
          {!isValidEmail ? (
             
             <>
               <View style={{marginHorizontal: 10, marginTop:5}}>
                 <Text style={styles.WarningText}>Email is invalid</Text>
               </View>
             </>
           ):(<></>)}
      </View>
      )} */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Container:{
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  AddMemberTab:{
    marginHorizontal: 20,
    flexDirection: 'row',
    height: 30,
  },
  FriendsTab:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  OthersTab:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  TabTitle:{
    fontSize: 13,
    fontWeight: '600'
  },
  TextInputArea:{
    marginHorizontal: 10,
    marginTop: 10,
  },
  AddFriendArea:{
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal:10,
    maxHeight: 100

  },
  AddOtherArea:{
    marginHorizontal: 10,
    marginTop: 10,
    paddingHorizontal:10

  },
  FieldNameText:{
    marginLeft: 20,
    marginBottom:10,
    fontSize: 13,
    fontWeight: '600'
  },
  FriendList:{
    borderWidth: 1,
    borderRadius: 4,
  },
  WarningText:{
    fontSize: 12,
    fontWeight: '600',
    color: 'red',
  },
  MemberAddedArea:{

    marginTop: 10,
    maxHeight: 200,
    paddingHorizontal:10
  },
  ConfirmButton:{
    marginTop:20,

  },
  ConfirmButtonText:{
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    paddingHorizontal: 145
  },
})
export default AddNewMembers;