import * as React from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IRoom } from '@root/shared/interfaces/room.interface';
import reactotron from 'reactotron-react-native';
interface RoomCardProps {
  room: IRoom
}

const RoomCard: React.FC<RoomCardProps> = (props: RoomCardProps) => {
  const {room} = props;
  const {colors} = useTheme();
  const navigation = useNavigation();
  const toDetails = () => {
    navigation.navigate('ROOMDETAIL', {room: room})
  }
  return(
    <TouchableOpacity style={styles.Container} onPress={() => toDetails()}>
      <View style={styles.PhotoSection}>
      </View>
      <View style={styles.TextSection}>
        <View style={styles.RoomNameArea}>
          <Text style={styles.RoomNameText}>{room.name}</Text>
        </View>
        <View style={styles.RoomDescriptionArea}>
          <Text style={{color: colors.neutral_3}}>{room.description}</Text>
        </View>
        <View style={styles.RoomMemberArea}>
          <Text style={{color: colors.neutral_5}}>Icon: Amount of people</Text>
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
    backgroundColor: 'blue',
    marginRight: 20
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