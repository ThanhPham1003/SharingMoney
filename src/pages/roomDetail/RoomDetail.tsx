import * as React from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, SafeAreaView, TouchableOpacity, Text, Image } from 'react-native';
import {ExpenseCard} from '../../components'
import { Header } from '../../components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {UserCard} from '../../components';
import { Button} from '../../shared/components';
interface RoomDetailProps {}

const RoomDetail: React.FC<RoomDetailProps> = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isExpensesActive, setIsExpensesActive] = React.useState<boolean>(true)
  const activeColor = colors.primary;

  const backHome = () =>{
    navigation.navigate('SHARINGMONEY', {})
  }
  const toCreatingExpense = () => {
    navigation.navigate('CREATINGEXPENSE', {})
  }
  return (
    <SafeAreaView style={styles.Container}>
      <Header 
        iconLeft={
              <TouchableOpacity onPress={() => backHome()}>
                <Icon name="left" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='ROOM DETAIL'
      />
      <View style={{...styles.TopTab}}>
        {isExpensesActive ? (
          <>
            <TouchableOpacity style={{...styles.ExpensesList,borderBottomColor: activeColor}} onPress={() => setIsExpensesActive(true)}>
              <Text style={{...styles.TopTabTitle, color: activeColor}}>Expenses List</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.MembersList, borderColor: colors.neutral_8}} onPress={() => setIsExpensesActive(false)}>
              <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Members List</Text>
            </TouchableOpacity >
          </>
        ):(
          <>
            <TouchableOpacity style={{...styles.ExpensesList, borderColor: colors.neutral_8}} onPress={() => setIsExpensesActive(true)}>
              <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Expenses List</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.MembersList, borderBottomColor: activeColor}} onPress={() => setIsExpensesActive(false)}>
              <Text style={{...styles.TopTabTitle, color: activeColor}}>Members List</Text>
            </TouchableOpacity >
          </>
        )}
        
      </View>
      {isExpensesActive ?(
        <>
          <View style={styles.CardSection}>
            <ExpenseCard/>
          </View>
          <View style={styles.AddButtonSection}>
            <View style={{marginRight: 20}}>
                <Button 
                  type="primary" 
                  variant="round" 
                  size="large"
                  onPress={() => toCreatingExpense()}
                >
                  <Icon name="plus" size={30} color="#ffffff"/>
                </Button>
            </View>
          </View>
        </>
      ):(
        <>
          <UserCard
              elementLeft={
                <Image  style={styles.PictureProfile}
                  source={require('../../assets/images/Facebook-Logo.png')} 
                />
              } 
              name="Pham Thanh Binh"
            />
        </>
      )}

    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  Container:{
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  TopTab:{
    flex: 0.075,
    width: '100%',
    
    flexDirection: 'row'
  },
  TopTabTitle:{
    fontSize: 13,
    fontWeight: '600'
  },
  ExpensesList:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    
  },
  MembersList:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
  },
  PictureProfile:{
    width: 40,
    height: 40,
  },
  CardSection:{
    flex: 0.8,
    width: '100%',
    alignItems: 'center'
  },
  AddButtonSection:{
    flex: 0.125,
    width: '100%',
    alignItems: 'flex-end',
  }
  
})

export default RoomDetail;