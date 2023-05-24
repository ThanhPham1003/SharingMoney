import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import {  Text } from 'react-native';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, Platform, Image, Alert} from 'react-native';
import { withTheme, useTheme } from 'react-native-paper';
import TextInput from '../../shared/components/textInput/TextInput'
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import { Button} from '../../shared/components';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_ROOM_MUTATION } from '@root/graphql/mutations/room.mutation';
import { GET_ALL_FRIENDS } from '@root/graphql/queries/friend.query';
import { get } from 'lodash';
import {AddMemberCard} from '@root/components';
import reactotron from 'reactotron-react-native';
import MemberAddedCard from '@root/components/addMemberCard/MemberAddedCard';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import { firebaseService } from '@root/shared/services/firebase/firebase';
import {request, PERMISSIONS} from 'react-native-permissions'
import { Decode } from '@root/shared/services/decode/jwt-decode';
import { RoomUpdatedContext, RoomUpdatedProvider } from '@root/context';
import { IFriend } from '@root/shared/interfaces/friend.interface';
import Icon3 from 'react-native-vector-icons/Feather';

interface CreatingRoomProps {}

const CreatingRoom: React.FC<CreatingRoomProps> = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [roomName, setRoomName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [members, setMembers] = React.useState([])
  const [email, setEmail] = React.useState('')
  const [isValidEmail, setIsValidEmail] = React.useState(false)
  const [isFriendsActive, setIsFriendsActive] = React.useState<boolean>(true)
  const [roomProfileImage, setRoomProfileImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [friendList, setFriendList] = useState([]);
  const reloadContext = useContext(RoomUpdatedContext)
  const activeColor = colors.primary;
  const selectMember = (id: string) =>{
    setMembers([...members, id])
   
  }
  const deleteMember = (id: string) => {
    setMembers(members.filter(members => members !== id))
  }
  const [createRoom, { error: errorCreateRoom, loading: isLoading }] =
      useMutation(CREATE_ROOM_MUTATION);
  const [currentUser, setCurrentUser] = React.useState({
    id: ""
  } || null);
  const getId = async () => {
    const currentUser = await Decode.decodeToken();
    if(currentUser){
      setCurrentUser(currentUser);
    } 
  }
  const { data, loading, error } = useQuery(GET_ALL_FRIENDS, {
        variables: { page: 1, limit: 50, confirmed: true},
  });
  const backHome = () =>{
    navigation.navigate('SHARINGMONEY', {})
  }
  const verifyEmail = (email : string) => {
    let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    if(regex.test(email)){
      setIsValidEmail(true)
    }else setIsValidEmail(false)
  }
  const isEnoughInformation = () => {  
    if(!roomName || !members.length){
      Alert.alert('Alert','Please enter correct and complete information required.', [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    else {
      handleCreateRoom();
    }
  }
  const handleCreateRoom = async () => {
    
    const url = await firebaseService.uploadImage(roomProfileImage, imageName)
    await createRoom({
      variables: { createRoomInput: {name: roomName,description: description, users: members, image: url}}
    })
   
    Alert.alert('Alert','Create Room Successfully', [
          
      {text: 'OK', onPress: () => {
        setRoomName('');
        setDescription('');
        setMembers([]);
        setRoomProfileImage(null);
        reloadContext?.setReload({isRoomListUpdated: true})
      }},
    ]);
  }
  let options = {
    saveToPhotos: true,
    mediaType: 'photo'
  }
  const selectImage = async () =>{
    const granted = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    if(granted === "limited" || granted === "granted"){
      const result = await launchImageLibrary(options);
      setImageName(result.assets[0].fileName)
      setRoomProfileImage(result.assets[0].uri)
    }
  }
  useEffect(() => {
    verifyEmail(email)
  }, [email])
  React.useEffect( () => {
    getId();  
  },[])
  useEffect(() =>{
    if(data)
    {
      setFriendList(data.friends)
    }
  }, [data])
  useEffect(() =>{
    if(data)
    {
      const newFriendList = data.friends.filter((item: IFriend, index: number) => {
        const frId = item.requester === currentUser.id ? item.receiver : item.requester
        return members.indexOf(frId) === -1
      })
      setFriendList(newFriendList)
    }
  }, [members])




  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconRight={
              <TouchableOpacity onPress={() => backHome()}>
                <Icon name="close" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='CREATING ROOM'
      />
      <View style={styles.TextInputArea}>
        <Text style={styles.FieldNameText}>Room's Name</Text>
        <TextInput
          variant='one-line'
          placeholder='Enter name of the room'
          text={roomName}
          setText={(text) => setRoomName(text)}
        />
         {!roomName ? (
             
             <>
               <View style={{marginHorizontal: 10, marginTop:5}}>
                 <Text style={styles.WarningText}>Room Name mustn't be empty</Text>
               </View>
             </>
           ):(<></>)}
      </View>
      <View style={styles.TextInputArea}>
        <Text style={styles.FieldNameText}>Description</Text>
        <TextInput
          variant='multiple-lines'
          placeholder='Enter description'
          text={description}
          setText={(text) => setDescription(text)}
        />
      </View>

      <View style={styles.TextInputArea}>
        <Text style={styles.FieldNameText}>Add Members</Text>
      </View>
     
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

        <View style={styles.AddFriendArea}>        
          <View style={{...styles.FriendList, borderColor: colors.neutral_7}}>
            <FlatList
              data={friendList}
              renderItem={({item})  => <AddMemberCard friend={item} selectMember={selectMember} currentUserID={currentUser.id} /> }
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>

      {/* ):(
        <View style={styles.TextInputArea}>
          <TextInput
            variant='one-line'
            placeholder='Enter email of other'
            text={email}
            setText={(text) => setEmail(text)}
            iconRight={
              <TouchableOpacity>
                <Icon3 name="send" size={20} color={colors.neutral}/>
              </TouchableOpacity>
            }
          />
          {!isValidEmail ? (
             
             <>
               <View style={{marginHorizontal: 10, marginTop:5}}>
                 <Text style={styles.WarningText}>Email is invalid</Text>
               </View>
             </>
           ):(<></>)}
      </View>
      )}     */}
      {!members.length ? (
             <>
               <View style={{marginLeft: 20, marginTop:5}}>
                 <Text style={styles.WarningText}>Room Members mustn't be empty</Text>
               </View>
             </>
      ):(<></>)}
      <View style={styles.MemberAddedArea}>
        <FlatList
            data={members}
            renderItem={({item})  => <MemberAddedCard id={item} deleteMember={deleteMember}/> }
            keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View style={styles.TextInputArea}>
        <Text style={styles.FieldNameText}>Upload Photo</Text>
      </View>
      <View style={styles.UploadPhotoArea}>
        {roomProfileImage ? (
          <>
            <TouchableOpacity  onPress={selectImage}>
              <Image style={styles.UploadedImage} source={{uri: roomProfileImage}} />
            </TouchableOpacity>
          </>
        ):(
          <>
            <TouchableOpacity style={styles.UploadPhotoButton} onPress={selectImage}>
              <Icon2 name="photo-library" size={60} color={colors.neutral_4} />
              <Text style={{fontSize: 10, color: colors.neutral_4, marginTop: 5}}>Select Image</Text>
            </TouchableOpacity>
          </>

        )}
      </View>
      <View style={styles.ConfirmButton}>
              <Button 
              type='primary'
              variant='filled'
              size='large'
              onPress={() => isEnoughInformation()}
              >
                <Text style={styles.ConfirmButtonText}>Confirm</Text>
              </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  TextInputArea:{
    marginHorizontal: 10,
    marginTop: 10,
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
  MemberAddedArea:{

    marginTop: 10,
    maxHeight: 100,
    paddingHorizontal:10
  },
  ConfirmButton:{
    marginTop:20,

  },
  ConfirmButtonText:{
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    paddingHorizontal: 130
  },
  WarningText:{
    fontSize: 12,
    fontWeight: '600',
    color: 'red',
  },
  UploadPhotoArea:{
    marginHorizontal: 10,
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  UploadPhotoButton:{
    height: 100,
    width: 100,
    borderWidth: 1,
    borderStyle: 'dashed',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  UploadedImage:{
    height: 100,
    width: 100,
  }


})

export default withTheme(CreatingRoom);