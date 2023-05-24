import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image, Platform} from 'react-native'
import { Header } from '../../components';
import { withTheme, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { firebaseService } from '@root/shared/services/firebase/firebase';
import {request, PERMISSIONS} from 'react-native-permissions'
import {launchImageLibrary} from 'react-native-image-picker';
import { useQuery, useMutation } from '@apollo/client';
import { Decode } from '@root/shared/services/decode/jwt-decode';
import { GET_USER } from '@root/graphql/queries/user.query';
import { CurrentIDContext } from '@root/context';
import { useAppDispatch } from '@root/redux/store';
import { clearToken } from '@root/redux/app/slice';
interface ProfileProps{}

const Profile: React.FC<ProfileProps> = (props) => {
  const {colors} = useTheme()
  const dispatch = useAppDispatch();
  const [profileImage, setProfileImage] = useState("1");
  const [imageName, setImageName] = useState(null);
  const currentID = useContext(CurrentIDContext);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    avatar: "",
    name: "",
    email: ""

  })
  const { data, loading, error, refetch } = useQuery(GET_USER, {
    variables: { id: currentID?.currentID?.id},
  });

  let options = {
    saveToPhotos: true,
    mediaType: 'photo'
  }
  const selectImage = async () =>{
    const granted = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    if(granted === "limited" || granted === "granted"){
      const result = await launchImageLibrary(options);
      setImageName(result.assets[0].fileName)
      setProfileImage(result.assets[0].uri)
    }
  }

  useEffect(() => {
    if(data){
      setCurrentUser(data.user)
    }
  }, [data])
  useEffect(() => {
    setProfileImage(currentUser.avatar)
  }, [currentUser])


  return (
    <SafeAreaView style={styles.Container}>
      <Header title='PROFILE'/>
      <View style={{...styles.PhotoSection, backgroundColor: colors.primary_20}}>
        <TouchableOpacity  onPress={selectImage}>
          <Image  style={{...styles.PictureProfile, borderColor: colors.primary}}
            source={{uri: profileImage ? profileImage : "1" }} 
          />
        </TouchableOpacity>
        <Text style={styles.NameText}>{currentUser.name}</Text>
        <Text style={{...styles.EmailText, color: colors.neutral_4}}>{currentUser.email}</Text>
      </View>
      <View style={styles.InfoSection}>
        <View style={styles.BalanceSection}>
          <Text style={styles.BalanceText}> Total speding:</Text>
          <Text style={{...styles.MoneyText, color: colors.primary}}> 5000</Text>
        </View>
        <View style={styles.BalanceSection}>
          <Text style={styles.BalanceText}> Total paid:</Text>
          <Text style={{...styles.MoneyText, color: colors.primary}}> 10000</Text>
        </View>
        <View style={styles.BalanceSection}>
          <Text style={styles.BalanceText}> Total debt:</Text>
          <Text style={{...styles.MoneyText, color: colors.primary}}> 0</Text>
        </View>
      </View>
      <View style={styles.LogoutSection}>
          <TouchableOpacity onPress={async () => {
            await firebaseService.signOut();
            dispatch(clearToken());
          }}>
            <Text style={{...styles.LogoutText, color: colors.primary}}>Log out</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Container:{
    backgroundColor: '#ffffff',
    flex: 1,
  },
  PhotoSection:{
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PictureProfile:{
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50
  },
  NameText:{
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  EmailText:{
    fontSize: 13,
    marginTop: 10,
  },
  InfoSection:{
    flex: 0.6,
    marginTop: 10
  },
  BalanceSection:{
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row'
  },
  BalanceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  MoneyText:{
    fontSize: 16,
    marginLeft: 10,
  },
  LogoutSection:{
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  LogoutText:{
    fontSize: 18,
    fontWeight: '600',
  }
})


export default withTheme(Profile);