import { IUserShare } from '@root/shared/interfaces/expense.interface';
import react, { useEffect, useState } from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import reactotron from 'reactotron-react-native';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '@root/graphql/queries/user.query';
import { UserCard } from '@root/components';

interface UserSharesListProps{
  userShare: IUserShare
  setIsDeleting() : void
}

const UserSharesList: React.FC<UserSharesListProps> = (props) => {
  const { colors } = useTheme();
  const {userShare, setIsDeleting} = props
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userShare.payer },
  });
  const [userShareInfo, setUserShareInfo] = useState({
    name: ""
  })
  useEffect(() => {
    if(data){
      setUserShareInfo(data.user)
    }
  }, [data])
  return(
  <TouchableOpacity style={styles.Container} onPress={() => setIsDeleting(true)}>
      <UserCard
            elementLeft={
              <Image  style={styles.PictureProfile}
                source={require('../../assets/images/User.png')} 
              />
            } 
            name={userShareInfo.name}
            elementRight={
              <>
                <Text style={{...styles.ShareText, color: colors.neutral_4}}>{userShare.percent}%</Text>
                <Text style={{...styles.AmountNeededText, color: colors.primary}}>{userShare.amount}</Text>
              </>
            } 
      />
  </TouchableOpacity>
  )
}
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
  ShareText:{
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 5
  },
  AmountNeededText:{
    fontSize: 14,
    fontWeight: '600'
  }
})
export default UserSharesList