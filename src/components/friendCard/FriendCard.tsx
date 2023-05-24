import react, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import reactotron from 'reactotron-react-native';
import { UserCard } from '@root/components';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
import { IFriend, IRequest } from '@root/shared/interfaces/friend.interface';
import { Button} from '../../shared/components';

interface FriendCardProps{
  friend: IFriend
  currentUserID?: string
  setIsDeletingFriend() : void
  setFocusFriend() : void
  isDeletingFriend: boolean
}

const FriendCard: React.FC<FriendCardProps> = (props) =>{
  const {friend, currentUserID, setIsDeletingFriend, isDeletingFriend, setFocusFriend} = props
  const frId = friend.requester === currentUserID ? friend.receiver : friend.requester
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: frId },
  });
  const [memberInfo, setMemberInfo] = useState({
    name: ""
  })
  useEffect(() => {
    if(data){
      setMemberInfo(data.user)
    }
  }, [data])
  return(
    <TouchableOpacity style={styles.Container} onPress={() => {setIsDeletingFriend(!isDeletingFriend); setFocusFriend({name: memberInfo.name, _id: friend._id})}}>
      <View style={styles.PhotoSection}>
        <Image  style={styles.PictureProfile}
            source={require('../../assets/images/User.png')} 
        />
      </View>
      <View style={styles.NameSection}>
        <Text style={styles.NameText}>{memberInfo?.name||""}</Text>
       
      </View>
    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
  Container:{
    marginTop: 20,
    minHeight: 80,
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
  NameSection:{
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

export default FriendCard;
