import * as React from 'react';
import {  Text } from 'react-native';
import { StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { withTheme, useTheme } from 'react-native-paper';
import TextInput from '../../shared/components/textInput/TextInput'
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components';
import Icon from 'react-native-vector-icons/AntDesign'

interface CreatingRoomProps {}

const CreatingRoom: React.FC<CreatingRoomProps> = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [roomName, setRoomName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [newMembers, setNewMembers] = React.useState<string>('')
  const backHome = () =>{
    navigation.navigate('SHARINGMONEY', {})
  }

  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconRight={
              <TouchableOpacity onPress={() => backHome()}>
                <Icon name="close" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='CREATING ROOM'
      />
      <View style={styles.TextInputArea}>
        <Text style={styles.FieldNameText}>Tên nhóm</Text>
        <TextInput
          variant='one-line'
          placeholder='Nhập tên phòng của bạn'
          text={roomName}
          setText={(text) => setRoomName(text)}
        />
      </View>
      <View style={styles.TextInputArea}>
        <Text style={styles.FieldNameText}>Mô tả</Text>
        <TextInput
          variant='multiple-lines'
          placeholder='Nhập mô tả'
          text={description}
          setText={(text) => setDescription(text)}
        />
      </View>
      <View style={styles.TextInputArea}>
        <Text style={styles.FieldNameText}>Tên thành viên</Text>
        <TextInput
          variant='one-line'
          placeholder='Nhập tên các thành viên'
          text={newMembers}
          setText={(text) => setNewMembers(text)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Container:{
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  TextInputArea:{
    marginHorizontal: 10,
    marginTop: 10,
  },
  FieldNameText:{
    marginLeft: 20,
    marginBottom:10,
    fontSize: 13,
    fontWeight: '600'
  }
})

export default withTheme(CreatingRoom);