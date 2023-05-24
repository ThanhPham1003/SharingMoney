import react, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from 'react-native';

import reactotron from 'reactotron-react-native';
import { UserCard } from '@root/components';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
interface MemBerRoomListProps{
  memberId: string
  isMakeAdmin : boolean
  setIsMakeAdmin(): void
  setFocusUser(): void
}

const MemberRoomList: React.FC<MemBerRoomListProps> = (props) =>{
  const {memberId, isMakeAdmin, setIsMakeAdmin, setFocusUser} = props
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: memberId },
  });
  const [memberInfo, setMemberInfo] = useState({
    name: "",
    _id: ""
  })
  useEffect(() => {
    if(data){
      setMemberInfo(data.user)
    }
  }, [data])
  return(
    <TouchableOpacity style={{...styles.Container}} onPress={() => {setIsMakeAdmin(!isMakeAdmin); setFocusUser(memberInfo)} }>

        <UserCard
          elementLeft={
              <Image  style={styles.PictureProfile}
                source={require('../../assets/images/User.png')} 
              />
            } 
          name={memberInfo?.name || ""}
        />

    </TouchableOpacity>
  )
};
const styles = StyleSheet.create({
  Container:{
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10
  },
  PictureProfile:{
    width: 30,
    height: 30,
  },
})

export default MemberRoomList