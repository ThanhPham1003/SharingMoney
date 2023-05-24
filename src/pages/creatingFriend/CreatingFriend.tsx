import * as React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text, Alert } from 'react-native';
import { Header } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../../shared/components/textInput/TextInput'
import { withTheme, useTheme } from 'react-native-paper';
import { CREATE_FRIEND_MUTATION } from '@root/graphql/mutations/friend.mutation';
import { useMutation, useQuery } from '@apollo/client';
import { Button} from '../../shared/components';
interface CreatingFriendProps{}

const CreatingFriend: React.FC<CreatingFriendProps> = () => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const [email, setEmail] = useState('')
  const [isValidEmail, setIsValidEmail] = React.useState(false)
  const backFriend = () =>{
    navigation.goBack();
  }
  const [createFriend, { error: errorCreateFriend, loading: isLoading, data: createFriendData }] = useMutation(CREATE_FRIEND_MUTATION);

  const verifyEmail = (email : string) => {
    let regex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    if(regex.test(email)){
      setIsValidEmail(true)
    }else setIsValidEmail(false)
  }

  const handleCreateFriend = async () => {
        
    await createFriend({
        variables: { createFriendInput: {receiver: email}},
    });
    setEmail('');
    Alert.alert('Alert','Friend request was sent', [
          
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  };
  useEffect(() => {
    verifyEmail(email)
  }, [email])
  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconRight={
              <TouchableOpacity onPress={() => backFriend()}>
                <Icon name="close" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='ADD FRIEND'
      />
      <View style={styles.FriendInfoSection}>
        <Text style={styles.TittleText}>Room's Name</Text>
        <TextInput
          variant='one-line'
          placeholder='Enter name of the room'
          text={email}
          setText={(text) => setEmail(text)}
        />
        {!isValidEmail ? (
             
             <>
               <View style={{marginHorizontal: 10, marginTop:5}}>
                 <Text style={styles.WarningText}>Email is invalid or empty</Text>
               </View>
             </>
           ):(<></>)}
      </View>
      <View style={styles.ButtonSection}>
              <Button 
              type='primary'
              variant='filled'
              size='large'
              onPress={() => handleCreateFriend()}
              >
                <Text style={styles.ButtonText}>Send</Text>
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
  FriendInfoSection:{
    marginHorizontal: 10,
    marginTop: 10,
  },
  TittleText:{
    marginLeft: 20,
    marginBottom:10,
    fontSize: 13,
    fontWeight: '600'
  },
  ButtonSection:{
    marginTop:20,
  },
  ButtonText:{
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  WarningText:{
    fontSize: 12,
    fontWeight: '600',
    color: 'red',
  },

})
export default withTheme(CreatingFriend);