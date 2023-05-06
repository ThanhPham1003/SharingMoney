import * as React from 'react';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
import { StyleSheet, View, Image, Text, TouchableOpacity,  } from 'react-native';
import reactotron from 'reactotron-react-native';
import { withTheme, useTheme } from 'react-native-paper';

interface PayerCardProps{
  userId: string,
  setPayer(): void
}
const PayerCard: React.FC<PayerCardProps> = (props: PayerCardProps) => {
  const { colors } = useTheme();
  const {userId, setPayer } = props
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: userId},
  });
  const [payerInfo, setPayerInfo] = React.useState({
    name: "",
    _id: "",
  });
  React.useEffect(() => {
    if (data) {
        setPayerInfo(data.user);
    }

  }, [data]);
  React.useEffect(() => {
    console.log("888888", payerInfo)
  }, [payerInfo])
  return(
    <TouchableOpacity style={{...styles.Container}} onPress={() => setPayer(payerInfo._id)}>
       
      <View style={{...styles.UserContainer}}>
        <Text style={{...styles.UserName, color: colors.neutral_2}}>{payerInfo.name}</Text>
      </View>
    </TouchableOpacity>
  )
}
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    //backgroundColor: 'yellow'
    marginHorizontal: 10,

  },
  UserContainer:{
    flexDirection: 'row',
    minHeight: 30,
    width: '100%',
    alignItems: 'center',
    marginLeft: 10,
  },
  PictureProfileArea:{
    width: 20,
    height: 20,
    marginHorizontal: 15
  },
  UserName:{
    fontWeight: '600',
    fontSize: 13,
  }
})
export default withTheme(PayerCard);