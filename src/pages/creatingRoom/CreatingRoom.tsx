import * as React from 'react';
import {  Text } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { withTheme, useTheme } from 'react-native-paper';
import TextInput from '../../shared/components/textInput/TextInput'

interface CreatingRoomProps {}

const CreatingRoom: React.FC<CreatingRoomProps> = (props) => {
  const [roomName, setRoomName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [newMembers, setNewMembers] = React.useState<string>('')


  return(
    <View style={styles.Container}>
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
        <Text style={styles.FieldNameText}>Tên nhóm</Text>
        <TextInput
          variant='one-line'
          placeholder='Nhập tên các thành viên'
          text={newMembers}
          setText={(text) => setNewMembers(text)}
        />
      </View>
    </View>
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