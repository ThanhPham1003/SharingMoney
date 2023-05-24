import * as React from 'react';
import {  KeyboardAvoidingView, Platform,ScrollView, Text } from 'react-native';
import {useContext } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, FlatList, Image, ActivityIndicator, Alert} from 'react-native';
import { withTheme, useTheme } from 'react-native-paper';
import TextInput from '../../shared/components/textInput/TextInput'
import {NumberInput} from '../../shared/components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AddedPayerCard, Header } from '../../components';
import { Button} from '../../shared/components';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonIcon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
import { IRoom } from '@root/shared/interfaces/room.interface';
import MemberRoomList from '../memberRoomList/MemberRoomList';
import ShareCard from '@root/components/shareCard/ShareCard';
import { CREATE_EXPENSE_MUTATION } from '@root/graphql/mutations/expense.mutation';
import { useMutation, useQuery } from '@apollo/client';
import {PayerCard} from '@root/components'
import reactotron from 'reactotron-react-native';
// import { IUserShare } from '@root/shared/interfaces/expense.interface';
import { Theme } from 'react-native-paper/lib/typescript/types';
import MemberAddedCard from '@root/components/addMemberCard/MemberAddedCard';
import {launchImageLibrary} from 'react-native-image-picker';
import { firebaseService } from '@root/shared/services/firebase/firebase';
import {request, PERMISSIONS} from 'react-native-permissions'
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import { ExpenseUpdatedContext } from '@root/context';

interface CreatingExpenseProps {
  room: IRoom
  theme: Theme;
}

const CreatingExpense: React.FC<CreatingExpenseProps> = () => {
  const route = useRoute();
  const room = route.params.room;
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [expenseName, setExpenseName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [amountOfMoney, setAmountOfMoney] = React.useState<number>(0)
  const [payer, setPayer] = React.useState<string>('')
  const [userShares, setUserShares] = React.useState([])
  const [isEnoughPercent, setIsEnoughPercent] = React.useState<boolean>(true)
  const [date, setDate] = React.useState<Date>(new Date())
  const [dateText, setDateText] = React.useState<string>('')
  const [dateISO, setDateISO] = React.useState<string>('')
  const [openDatePicker, setOpenDatePicker] = React.useState<boolean>(false)
  const [isSharingEvenly, setIsSharingEvenly] = React.useState<boolean>(true)
  const [isLoaded, setIsLoaded] = React.useState<boolean>(true)
  const [isOpeningSnackbar, setIsOpeningSnackbar] = React.useState<boolean>(false)
  const [expenseImageUri, setExpenseImageUri] = React.useState(null);
  const [expenseImageName, setExpenseImageName] = React.useState(null);
  const reloadContext = useContext(ExpenseUpdatedContext)
  const back = () =>{
    navigation.navigate('ROOMDETAIL', {room: room})
  }
  
  const [createExpense, { error: errorCreateExpense, loading: isLoading, data: createExpenseData}] = useMutation(CREATE_EXPENSE_MUTATION);
  const isEnoughInformation = () => {
    if(!expenseName || (amountOfMoney <=0) || !payer || (!isSharingEvenly && !isEnoughPercent)){
      Alert.alert('Alert','Please enter correct and complete information required.', [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    else{
      handleUserShares();
    }
  }
  const handleUserShares = async () => {
    setIsLoaded(false)
    let newUS = null
    if(isSharingEvenly){
      const numberOfElements = userShares.length;
      newUS = userShares.map(user => {
        return{
          payer: user.payer,
          amount: amountOfMoney / numberOfElements || 0,
          percent: 100/ numberOfElements
        }
      })
      
    }
    else {
      newUS = userShares.map(user => {
        return{
          payer: user.payer,
          amount: (amountOfMoney*user.percent)/100 || 0,
          percent: user.percent
        }
      })
    }
    const url = await firebaseService.uploadImage(expenseImageUri, expenseImageName)
      handleCreateExpense({
        name: expenseName,
        description: description,
        payer: payer,
        userShares: newUS, 
        total: amountOfMoney,
        roomId: room._id,
        images: [url]
      });
  }
  const handleCreateExpense = async (expenseDetail: any) => {
    try{
      await createExpense({ 
        variables:{ createExpenseInput: expenseDetail}
      })
      
      Alert.alert('Alert','Create Expense Successfully', [
          
        {text: 'OK', onPress: () => {
          setExpenseName('');
          setDescription('');
          setPayer('');
          setAmountOfMoney(0);
          setDateText("");
          setDateISO("")
          setExpenseImageUri(null);
          setIsLoaded(true),
          setIsOpeningSnackbar(true);
          reloadContext?.setReload({isExpenseListUpdated: true})
        }},
      ]);
    }catch{
      setIsLoaded(true);
      Alert.alert('Alert',"Couldn't create expense.", [
        
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    
  }
  let options = {
    saveToPhotos: true,
    mediaType: 'photo'
  }
  const selectImage = async () =>{
    const granted = await request(Platform.OS === 'ios' ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
    if(granted === "limited" || granted === "granted"){
      const result = await launchImageLibrary(options);
      setExpenseImageName(result.assets[0].fileName)
      setExpenseImageUri(result.assets[0].uri)
    }
  }

  React.useEffect(() => {
    
    if(room?.users)
    {
      const newUserShares = room.users.map(user => {
        return {
          payer: user,
          percent: 0
        }
      })
      setUserShares(newUserShares)
    }
  }, [room.users])
  React.useEffect(() => {
    let totalPercent = userShares.map(a => a.percent).reduce(function(a,b)
    {
      return Number(a)+Number(b)
    }, 0)
    if(totalPercent !== 100){
      setIsEnoughPercent(false)
    }else {
      setIsEnoughPercent(true)
    }
  }, [userShares])
  // React.useEffect(() => {
  //   if(errorCreateExpense)
  //   {
  //     setIsLoaded(true);
  //     Alert.alert('Alert',"Couldn't create expense.", [
        
  //       {text: 'OK', onPress: () => console.log('OK Pressed')},
  //     ]);

  //   }
  // }, [errorCreateExpense])
  


  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconLeft={
              <TouchableOpacity onPress={() => back()}>
                <Icon name="left" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='CREATING EXPENSE'
      />
      {/* <Snackbar
        visible={isOpeningSnackbar}
        onDismiss={() => setIsOpeningSnackbar(false)}
        style={{backgroundColor: colors.primary}}
        elevation={10}
      >
            {createdStatus}
          </Snackbar> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
      {!isLoaded ? (
        <View style={{...styles.LoadingStyle, backgroundColor: colors.primary_60}}>
          <ActivityIndicator size="large"/>
          <Text> Wait a minute...</Text>
        </View>
      ) : (
        
          
          <ScrollView>
            <View style={styles.TextInputArea}>
              <Text style={styles.FieldNameText}>Expense Name</Text>
              <TextInput
                variant='one-line'
                placeholder='Enter your Expense'
                text={expenseName}
                setText={(text) => setExpenseName(text)}
              />
              {!expenseName ? (
              
                <>
                  <View style={{marginHorizontal: 10, marginTop:5}}>
                    <Text style={styles.WarningText}>Expense Name mustn't be empty</Text>
                  </View>
                </>
              ):(<></>)}
            </View>
            <View style={styles.TextInputArea}>
              <Text style={styles.FieldNameText}>Decription</Text>
              <TextInput
                variant='multiple-lines'
                placeholder='Enter decription'
                text={description}
                setText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.TextInputArea}>
              <Text style={styles.FieldNameText}>Amount of Money</Text>
              <NumberInput
                variant='one-line'
                placeholder='Enter amount of money'
                number={amountOfMoney}
                setNumber={(text: number) => setAmountOfMoney(text)}
              />
              {amountOfMoney <= 0 ? (
              
              <>
                <View style={{marginHorizontal: 10, marginTop:5}}>
                  <Text style={styles.WarningText}>Amount can't be empty and greater than 0</Text>
                </View>
              </>
            ):(<></>)}
            </View>
            <View style={styles.AddPayerArea}>
              <Text style={styles.FieldNameText}>Payer</Text>        
              
              {payer ? (
                <>
                  <AddedPayerCard id={payer} deletePayer={setPayer} />
                </>
              ):(
                <View style={{...styles.MemberList, borderColor: colors.neutral_6}}>
                { room.users &&
                room.users.map((memberId: string, index: number) => (
                    <PayerCard key={index} userId={memberId} setPayer={setPayer}/>
                  ))}
                
                </View>
              )}
              {!payer ? (
              
              <>
                <View style={{marginHorizontal: 10, marginTop:5}}>
                  <Text style={styles.WarningText}>Payer mustn't be empty</Text>
                </View>
              </>
            ):(<></>)}
            </View>
            <View style={styles.TextInputArea}>
              <Text style={styles.FieldNameText}>Date</Text>
              
              <View style={{...styles.DateSection, borderColor: colors.neutral_6, paddingVertical: 0}}>
                <View style={{flex: 0.9}}>
                  <Text style={{fontSize: 14, marginLeft: 10}}>{dateText}</Text>
                </View>
                <View style={{flex: 0.1}}>
                  <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                    <Icon name="calendar" size={26} color={colors.neutral_4}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Text style={styles.ShareTittle}>Upload Expense Photo</Text>
            <View style={styles.UploadPhotoArea}>
              {expenseImageUri ? (
                <>
                  <TouchableOpacity  onPress={selectImage}>
                    <Image style={styles.UploadedImage} source={{uri: expenseImageUri}} />
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
            <Text style={styles.ShareTittle}>Expense Type</Text>
            <View style={styles.ShareButtonArea}>
              
              {isSharingEvenly ? (
                <>
                    <TouchableOpacity style={{...styles.ShareButton, borderWidth: 1.5}} onPress={() => setIsSharingEvenly(true)}>
                      <ButtonIcon name="dot-circle-o" size={20} color={colors.primary}/>
                      <Text style={styles.IconButton}>Share Evenly</Text>
                    </TouchableOpacity>


                      <TouchableOpacity style={styles.ShareButton} onPress={() => setIsSharingEvenly(false)}>
                        <ButtonIcon name="circle-thin" size={20} color={colors.primary}/>
                        <Text style={styles.IconButton}>Share proportionally</Text>
                      </TouchableOpacity>

                </>
              ):(
                <>
                    <TouchableOpacity style={styles.ShareButton} onPress={() => setIsSharingEvenly(true)}>
                      <ButtonIcon name="circle-thin" size={20} color={colors.primary}/>
                      <Text style={styles.IconButton}>Share Evenly</Text>
                    </TouchableOpacity>


                      <TouchableOpacity style={{...styles.SharePercent, borderWidth: 1.5}} onPress={() => setIsSharingEvenly(false)}>
                        <View style={{flexDirection: 'row', borderBottomWidth: 0.2}}>
                          <ButtonIcon name="dot-circle-o" size={20} color={colors.primary}/>
                          <Text style={{...styles.IconButton, marginBottom: 20}}>Share proportionally</Text>
                        </View>
                          {userShares && 
                              userShares.map((member: IUserShare ,index: number) => (
                              
                              <ShareCard 
                                key={index} 
                                memberId={member.payer} 
                                percent={member.percent} 
                                onChangePercent={(value) => {
                                  let newUserShares = [...userShares]
                                  newUserShares[index].percent = value
                                  setUserShares(newUserShares)
                                }}
                              />
                            ))
                          }
                          { isEnoughPercent ? (
                              <>
                              </>
                          ):(
                            <View style={styles.WarningSection}>
                              <Text style={styles.WarningText}>The total percent must be 100%</Text>
                            </View>
                          )}

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
            <>
              <DatePicker
                modal
                open={openDatePicker}
                maximumDate={date}
                date={date}
                mode="date"
                onConfirm={(date) => {
                  setOpenDatePicker(false)
                  setDateText(date.getDate()+ '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
                  setDateISO(date.toISOString())
                }}
                onCancel={() => {
                  setOpenDatePicker(false)
                }}
              />
            </>
          </ScrollView>
        
      )
      } 
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  LoadingStyle:{
    marginTop: 50,
    marginHorizontal: 30,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset:{
      width: 0,
      height:2
    },
    shadowOpacity: 0.25,
    shadowRadius:4,
    elevation: 5
  },
  TextInputArea:{
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 20
  },
  AddPayerArea:{
    marginTop: 10,
    paddingHorizontal:10,
    maxHeight: 100,
    marginBottom: 20
  },
  MemberList:{
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 10,
    minHeight: 50,
  },
  ShareButtonArea:{
    marginBottom: 20,
    alignItems: 'center',
    justifyContent:'center',
  },
  FieldNameText:{
    marginLeft: 20,
    marginBottom:10,
    fontSize: 13,
    fontWeight: '600'
  },
  ShareTittle:{
    marginLeft: 30,
    marginBottom:10,
    fontSize: 13,
    fontWeight: '600'
  },
  ShareButton:{
    width: "90%",
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 10
  },
  SharePercent:{
    width: "90%",
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 0.5,
    borderRadius: 10
  },
  IconButton:{
    marginLeft: 15,
    fontSize: 13,
    fontWeight: '600'
  },
  ConfirmButton:{
    marginBottom:20
  },
  ConfirmButtonText:{
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    paddingHorizontal: 130
  },
  WarningSection:{
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  WarningText:{
    fontSize: 12,
    fontWeight: '600',
    color: 'red',
  },
  DateSection:{
    height: 50,
    borderRadius: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    paddingHorizontal:5,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  UploadPhotoArea:{
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  UploadPhotoButton:{
    height: 100,
    width: 100,
    marginVertical: 10,
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
export default withTheme(CreatingExpense);