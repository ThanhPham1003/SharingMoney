import react, { useEffect, useState, useContext } from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, SafeAreaView,ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from '@root/shared/components';
import Icon from 'react-native-vector-icons/Feather';
interface ChattingRoomProps {}

const ChattingRoom: React.FC<ChattingRoomProps> = () => {
  const { colors } = useTheme();
  const [message, setMesage] = useState('')
  const [tempMessage, setTempMessage] = useState('')
  const [isSent, setIsSent] = useState(false);
  return(
    <View style={styles.Container}>
      <View style={{...styles.MessageDisplaySection, backgroundColor: colors.primary_10}}>
        {isSent ? (
          <View style={{...styles.MessageStyle, backgroundColor: colors.primary_40}}>
            <Text>{message}</Text>
          </View>
        ): (
          <>
          </>
        )}
      </View>
      <View style={styles.TextInputSection}>
        <TextInput
          iconLeft={
            <Icon style={{marginLeft: 5}} name="camera" size={22} color={colors.neutral}/>
          }
          variant='one-line'
          placeholder='Message'
          text={tempMessage}
          setText={(text) => {setMesage(text); setTempMessage(text)}}
          iconRight={
            <TouchableOpacity onPress={() => {setIsSent(true); setTempMessage('')}}>
              <Icon name="send" size={20} color={colors.neutral}/>
            </TouchableOpacity>
          }
        />
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  Container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#ffffff'
  },
  MessageDisplaySection:{
    flex: 0.9,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  MessageStyle:{
    marginBottom: 10,
    marginRight: 5,
    padding: 10,
    borderRadius: 10,

  },
  TextInputSection:{
    flex: 0.1,
    width: '100%',
  }
  
})
export default withTheme(ChattingRoom);