import * as React from 'react';
import { IFriend } from '@root/shared/interfaces/friend.interface';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
import { StyleSheet, View, Image, Text, TouchableOpacity,  } from 'react-native';
import reactotron from 'reactotron-react-native';
import { withTheme, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
interface AddedPayerCardProps{
  id: string,
  deletePayer?(): void
}
const AddedPayerCard: React.FC<AddedPayerCardProps> = (props: AddedPayerCardProps) => {
  const { colors } = useTheme();
  const {id, deletePayer} = props
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: id},
  });
  const [payerInfo, setPayerInfo] = React.useState({
    name: "",
  });
  React.useEffect(() => {
    if (data) {
        setPayerInfo(data.user);
    }
  }, [data]);
  return(
    <View style={{...styles.Container}}>
       
      <View style={{...styles.UserContainer, backgroundColor: colors.neutral_9}}>
        <View style={styles.UserSection}>
          <Image  style={styles.PictureProfileArea}
              source={require('../../assets/images/Facebook-Logo.png')} 
          />
          <Text style={{...styles.UserName, color: colors.neutral_2}}>{payerInfo.name}</Text>
        </View>
        <TouchableOpacity style={styles.CloseButton} onPress={() => deletePayer('')}>
          <Icon name="close" size={25} color={colors.neutral_4} />
        </TouchableOpacity>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    marginHorizontal: 10

  },
  UserContainer:{
    flexDirection: 'row',
    marginTop: 5,
    minHeight: 50,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  UserSection:{
    flexDirection: 'row',
  },
  PictureProfileArea:{
    width: 20,
    height: 20,
    marginHorizontal: 15
  },
  UserName:{
    fontWeight: '600',
    fontSize: 13,
  },
  CloseButton:{
    marginRight: 10,
  }

})
export default withTheme(AddedPayerCard);