import react, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from 'react-native';

import reactotron from 'reactotron-react-native';
import { UserCard } from '@root/components';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
interface MemBerRoomListProps{
  memberId: string
}

const MemberRoomList: React.FC<MemBerRoomListProps> = (props) =>{
  const {memberId} = props
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: memberId },
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
    <View style={{...styles.Container}}>
      <View style={{width: '90%'}}>
        <UserCard
          elementLeft={
              <Image  style={styles.PictureProfile}
                source={require('../../assets/images/Facebook-Logo.png')} 
              />
            } 
          name={memberInfo?.name || ""}
        />
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  Container:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  PictureProfile:{
    width: 40,
    height: 40,
  },
})

export default MemberRoomList