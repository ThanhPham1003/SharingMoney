import react, { useEffect, useState, useContext, useCallback, useLayoutEffect } from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, SafeAreaView,ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from '@root/shared/components';
import firestore from '@react-native-firebase/firestore'
import Icon from 'react-native-vector-icons/Feather';
import { GiftedChat } from 'react-native-gifted-chat'
import { Decode } from '@root/shared/services/decode/jwt-decode'; 
import { firebaseService } from '@root/shared/services/firebase/firebase';
import { IRoom } from '@root/shared/interfaces/room.interface';
import reactotron from 'reactotron-react-native';
interface ChattingRoomProps {
  room: IRoom
}

const ChattingRoom: React.FC<ChattingRoomProps> = (props) => {
  const { colors } = useTheme();
  // const [message, setMesage] = useState('')
  // const [tempMessage, setTempMessage] = useState('')
  // const [isSent, setIsSent] = useState(false);
  const {room} = props
  const [messages, setMessages] = useState([{
    _id: 0,
    text:"",
    createdAt: new Date(),
    user:{
      _id: 0,
      name: "",
      avatar: ""
    }
  }]);
  const [currentUser, setCurrentUser] = useState({
    id: "",
    email: "",
    name: "",
    avatar: "",
  } || null);
  const getId = async () => {
    const currentUser = await Decode.decodeToken();
    if(currentUser){
      setCurrentUser(currentUser);
    } 
  }
  useEffect( () => {
    getId();
  },[])

  useLayoutEffect(() => {
    const unsubscriber = firestore()
    .collection(room._id)
    .orderBy('createdAt', 'desc')
    .onSnapshot(documentSnapshot => {
      setMessages(
        documentSnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    });
    return () => unsubscriber();
  },[])
  //   useLayoutEffect(() => {
  //   const unsubscriber = firestore()
  //   .collection(room._id)
  //   .orderBy('createdAt', 'desc')
  //   .onSnapshot(documentSnapshot => {
 
  //     documentSnapshot.docs.map(doc => reactotron.log("77777", doc.data().text))
  //   });
  //   return () => unsubscriber();
  // },[])


  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    const { _id, createdAt, text, user} = messages[0];
    firestore().collection(room._id).add({
      _id,
      createdAt,
      text,
      user
    });
  }, [])
  // const unsubcribe = () =>{
  //   const message = firebaseService.unsubscribe()
  //   if(message){
  //     setMessages(message)
  //   }
  // }
  // useLayoutEffect(() => {
  //   return () => unsubcribe();
  // }, [])
  // const onSend = useCallback((messages = []) =>{
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
  //   const { _id, createdAt, text, user} = messages[0];
  //   firebaseService.addMessage(_id, createdAt, text, user)
  // }, [])
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar
      }}
    />
  )
}
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