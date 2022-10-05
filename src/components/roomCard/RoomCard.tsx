import * as React from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text } from 'react-native';

interface RoomCardProps {

}

const RoomCard: React.FC<RoomCardProps> = (props) => {
  const {colors} = useTheme();
  return(
    <View style={styles.Container}>
      <View style={styles.RoomNameArea}>
        <Text style={styles.RoomNameText}> Room's Name Here</Text>
      </View>
      <View style={styles.RoomDescriptionArea}>
        <Text>Room's Decription Here</Text>
      </View>
      <View style={styles.RoomMemberArea}>
        <Text> Icon: Amount of people</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Container:{
    marginTop: 20,
    minHeight: 120,
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
  },
  RoomNameArea:{
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  RoomNameText:{
    fontSize: 16,
    fontWeight: '600'
  },
  RoomDescriptionArea:{
    flex: 0.45,
    marginLeft: 10,
  },
  RoomMemberArea:{
    flex: 0.25,
    alignItems: 'flex-end',
    justifyContent:'center',
    marginRight: 10,
  }
  
})

export default withTheme(RoomCard)