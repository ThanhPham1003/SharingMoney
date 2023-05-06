import react, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import reactotron from 'reactotron-react-native';
import { UserCard } from '@root/components';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
import { NumberInput } from '@root/shared/components';
import { withTheme, useTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
interface ShareCardProps{
  memberId: string;
  percent: number
  theme: Theme;

  onChangePercent(percent: number): void
}

const ShareCard: React.FC<ShareCardProps> = (props) =>{
  const {memberId, percent, onChangePercent} = props
  const { colors } = useTheme();
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
  // useEffect(() => {
  //   reactotron.log("11111111", currentPercent)
  // }, [currentPercent])
  // useEffect(() => {
  //   reactotron.log("22222222", totalPercent)
  // }, [totalPercent])
  // useEffect(() => {
  //   reactotron.log("333333", previousPercent)
  // }, [previousPercent])
  
  return(
    <View style={styles.Container}>
        <UserCard
          elementLeft={
              <Image  style={styles.PictureProfile}
                source={require('../../assets/images/Facebook-Logo.png')} 
              />
            } 
          name={memberInfo?.name || ""}
          elementRight={
            <NumberInput
              variant='one-line'
              iconLeft={<Icon name="percent" size={20} color={colors.neutral} />}
              number={percent}
              setNumber={(text: number) => onChangePercent?.(text)}
            />
          }
        />
    </View>
  )
};
const styles = StyleSheet.create({
  Container:{
    flexDirection: 'row',
  },
  PictureProfile:{
    width: 30,
    height: 30,
  },
})

export default withTheme(ShareCard)