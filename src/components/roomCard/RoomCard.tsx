import * as React from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IRoom } from '@root/shared/interfaces/room.interface';
import { GET_USER } from '@root/graphql/queries/user.query';
import { useQuery, useMutation } from '@apollo/client';
import reactotron from 'reactotron-react-native';
interface RoomCardProps {
  room: IRoom
}

const RoomCard: React.FC<RoomCardProps> = (props: RoomCardProps) => {
  const {room} = props;
  const {colors} = useTheme();
  const navigation = useNavigation();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: { id: room.owner },
  });
  const [ownerInfo, setOwnerInfo] = React.useState({
    name: "",
    _id: "",
  });
  const toDetails = () => {
    navigation.navigate('ROOMDETAIL', {room: room})
  }
  React.useEffect(() => {
    if (data) {
        setOwnerInfo(data.user);
    }
  }, [data]);
  React.useEffect(() => {
    console.log("444444", room._id)
  }, [])
  const amoutOfMember = room.users.length
  return(
    <TouchableOpacity style={styles.Container} onPress={() => toDetails()}>
      <View style={styles.PhotoSection}>
        <Image style={{height: 100, width: 100}} source={{uri: room.image}}/>
      </View>
      <View style={styles.TextSection}>
        <View style={styles.RoomNameArea}>
          <Text style={styles.RoomNameText}>{room.name}</Text>
        </View>
        <View style={styles.RoomDescriptionArea}>
          <Text style={{color: colors.neutral_3}}>{room.description}</Text>
        </View>
        <View style={styles.RoomMemberArea}>
          <Text style={{color: colors.neutral_5}}>{amoutOfMember} members</Text>
        </View>
        <View style={styles.RoomMemberArea}>
          <Text style={{color: colors.neutral_5}}>Owner: {ownerInfo.name}</Text>
        </View>
      </View>
      
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  Container:{
    marginTop: 20,
    minHeight: 124,
    width: ' 90%',
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset:{
      width: 0,
      height: 11,
    },
    shadowRadius: 11,
    shadowOpacity: 0.1,
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    padding: 10
  },
  PhotoSection:{
    flex: 0.33,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextSection:{
    flex: 0.65,
    flexDirection: 'column',
  },
  RoomNameArea:{
  },
  RoomNameText:{
    fontSize: 16,
    fontWeight: '600'
  },
  RoomDescriptionArea:{
    marginTop: 10,
  },
  RoomMemberArea:{
    marginTop: 10,
  }
  
})

export default withTheme(RoomCard)