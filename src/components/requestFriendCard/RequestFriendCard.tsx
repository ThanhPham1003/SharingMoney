import react, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { CONFIRM_FRIEND_MUTATION } from '@root/graphql/mutations/friend.mutation';
import reactotron from 'reactotron-react-native';
import { UserCard } from '@root/components';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
import { IRequest } from '@root/shared/interfaces/friend.interface';
import { Button} from '../../shared/components';

interface RequestFriendCardProps{
  requester: IRequest
  userId?: string
}

const RequestFriendCard: React.FC<RequestFriendCardProps> = (props) =>{
  const {requester, userId} = props
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: requester.requester },
  });
  const [memberInfo, setMemberInfo] = useState({
    name: ""
  })
  const [confirmFriend,{ error: errorCreateFriend, loading: isLoading, data: createFriendData }] = useMutation(CONFIRM_FRIEND_MUTATION);
  const handleAccept = async () => {
    await confirmFriend({
        variables: {updateFriendInput: {
                id: requester._id, 
                confirmed: true, 
                requester: requester.requester, 
                receiver: userId
            }
        }
    });
}
  useEffect(() => {
    if(data){
      setMemberInfo(data.user)
    }
  }, [data])
  return(
    <TouchableOpacity style={styles.Container}>
      <View style={styles.PhotoSection}>
        <Image  style={styles.PictureProfile}
                  source={require('../../assets/images/Facebook-Logo.png')} 
        />
      </View>
      <View style={styles.NameAndButtonSection}>
        <Text style={styles.NameText}>{memberInfo?.name||""}</Text>
        <View style={styles.ButtonSection}>
          <Button 
                type='primary'
                variant='filled'
                size='medium'
                onPress={() => handleAccept()}
          >
                <View style={{paddingHorizontal: 20}}>
                  <Text>Accept</Text>
                </View>
                  
          </Button>
          <View style={{marginLeft: 15}}>
            <Button 
                  type='neutral'
                  variant='filled'
                  size='medium'
            >
                  <View style={{paddingHorizontal: 20}}>
                    <Text>Delete</Text>
                  </View>
            </Button>
          </View>
        </View>
      </View>
      <View style={styles.TimeSection}>
        <Text>10w</Text>
      </View>

    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
  Container:{
    marginTop: 20,
    minHeight: 100,
    width: ' 95%',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset:{
      width: 0,
      height: 11,
    },
    shadowRadius: 11,
    shadowOpacity: 0.1,
    backgroundColor: "#ffffff",
    flexDirection: 'row',
    padding: 10,
    
  },
  PhotoSection:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  PictureProfile:{
    width: 50,
    height: 50,
  },
  NameAndButtonSection:{
    flex: 0.7,
    justifyContent: 'center',
  },
  NameText:{
    fontSize: 14,
    fontWeight: '600'
  },
  ButtonSection:{
    flexDirection: 'row',
    marginTop: 10,
  },
  TimeSection:{
    flex: 0.1
  }
})

export default RequestFriendCard;
