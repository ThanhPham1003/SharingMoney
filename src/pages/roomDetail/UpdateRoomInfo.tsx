import { useEffect, useState, useContext } from 'react';
import {  Text, StyleSheet, SafeAreaView, TouchableOpacity, View, Image, Alert, Platform} from 'react-native';
import { Header } from '../../components';
import { withTheme, useTheme } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UPDATE_ROOM_MUTATION } from '@root/graphql/mutations/room.mutation';
import TextInput from '../../shared/components/textInput/TextInput'
import Icon from 'react-native-vector-icons/AntDesign';
import {request, PERMISSIONS} from 'react-native-permissions'
import {launchImageLibrary} from 'react-native-image-picker';
import { IRoom } from '@root/shared/interfaces/room.interface';
import { Button} from '../../shared/components';
import { useMutation, useQuery } from '@apollo/client';
import { firebaseService } from '@root/shared/services/firebase/firebase';
import { RoomUpdatedContext, RoomUpdatedProvider } from '@root/context';
interface UpdateRoomInfoProps{
  room: IRoom
}
const UpdateRoomInfo: React.FC<UpdateRoomInfoProps> = () => {
  const {colors} = useTheme();
  const route = useRoute();
  const room = route.params.room;
  const navigation = useNavigation();
  const [roomName, setRoomName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [roomProfileImage, setRoomProfileImage] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [updateRoom, { error: errorUpdateRoom, loading: isLoading, data: updateRoomData}] = useMutation(UPDATE_ROOM_MUTATION);
  const reloadContext = useContext(RoomUpdatedContext)
  const backHome = () =>{
    navigation.navigate('SHARINGMONEY', {})
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
  const isEnoughInformation = () => {  
    if(!roomName){
      Alert.alert('Alert','Please enter correct and complete information required.', [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    else {
      handleUpdateRoom();
    }
  }
  const handleUpdateRoom = async () => {
    const url = await firebaseService.uploadImage(roomProfileImage, imageName)
    const newRoom = {id: room._id, image: url, name: roomName, description: description, owner:room.owner, users: room.users}
    try{
      await updateRoom({
        variables: { updateRoomInput: newRoom}
      })
      Alert.alert('Alert', 'Updated Room Successfully', [
        {text: 'OK', onPress: () => {
          reloadContext?.setReload({isRoomListUpdated: true})
          navigation.goBack();
        }}
      ])
    }catch{
      Alert.alert('Alert',"Couldn't update room.", [
      
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }
  useEffect(() => {
    setRoomName(room.name)
    setDescription(room?.description)
    setRoomProfileImage(room?.image)
  },[room])
  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconRight={
              <TouchableOpacity onPress={() => backHome()}>
                <Icon name="close" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='UPDATE ROOM INFO'
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
        <Text style={styles.FieldNameText}>Room Photo</Text>
      </View>
      <View style={styles.UploadPhotoArea}>
        <TouchableOpacity  onPress={selectImage}>
          <Image style={styles.UploadedImage} source={{uri: roomProfileImage}} />
        </TouchableOpacity>
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
  )
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
  FieldNameText:{
    marginLeft: 20,
    marginBottom:10,
    fontSize: 13,
    fontWeight: '600'
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
  UploadedImage:{
    height: 100,
    width: 100,
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
})
export default withTheme(UpdateRoomInfo)