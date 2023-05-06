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
}

const UserSharesList: React.FC<UserSharesListProps> = (props) => {
  const { colors } = useTheme();
  const {userShare} = props
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
  useEffect(() => {
    reactotron.log("33333", userShare.amount)
  }, [userShare])
  return(
  <View style={styles.Container}>
    <View style={{width: '90%'}}>
      <UserCard
            elementLeft={
              <Image  style={styles.PictureProfile}
                source={require('../../assets/images/Facebook-Logo.png')} 
              />
            } 
            name={userShareInfo.name}
            elementRight={
              <>
                <Text style={{...styles.ShareText, color: colors.neutral_4}}>{userShare.percent}</Text>
                <Text style={{...styles.AmountNeededText, color: colors.primary}}>{userShare.amount}</Text>
              </>
            } 
      />

    </View>
  </View>
  )
}
const styles = StyleSheet.create({
  Container:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  PictureProfile:{
    width: 40,
    height: 40,
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