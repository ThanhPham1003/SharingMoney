import * as React from 'react';
import {View,Text, StyleSheet, SafeAreaView, TouchableOpacity, Image} from 'react-native'
import { withTheme, useTheme } from 'react-native-paper';
import { Header } from '../../components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
import {UserCard} from '../../components'
import reactotron from 'reactotron-react-native';
import { IExpense, IUserShare } from '@root/shared/interfaces/expense.interface';
import UserSharesList from '../userSharesList/UserSharesList';
import { IRoom } from '@root/shared/interfaces/room.interface';
interface ExpenseDetailProps{
  route?: any;
  expense: IExpense
  room: IRoom
}

const ExpenseDetail: React.FC<ExpenseDetailProps> = ({route}) => {
  const { colors } = useTheme();
  const expense = route.params.expense;
  const room = route.params.room;
  const navigation = useNavigation();
  const [isInfoActive, setIsInfoActive] = React.useState<boolean>(true)
  const activeColor = colors.primary;

  const backPrevious = () => {
    navigation.navigate('ROOMDETAIL', {room: room})
  }
  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconLeft={
              <TouchableOpacity onPress={() => backPrevious()}>
                <Icon name="left" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='EXPENSE DETAIL'
      />
      
      <View style={{...styles.TopTab}}>
        {isInfoActive ? (
          <>
            <TouchableOpacity style={{...styles.ExpenseInfo,borderBottomColor: activeColor}} onPress={() => setIsInfoActive(true)}>
              <Text style={{...styles.TopTabTitle, color: activeColor}}>Information</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.ExpenseOverview, borderColor: colors.neutral_8}} onPress={() => setIsInfoActive(false)}>
              <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Overview</Text>
            </TouchableOpacity >
          </>
        ):(
          <>
            <TouchableOpacity style={{...styles.ExpenseInfo, borderColor: colors.neutral_8}} onPress={() => setIsInfoActive(true)}>
              <Text style={{...styles.TopTabTitle, color: colors.neutral_4}}>Information</Text>
            </TouchableOpacity >
            <TouchableOpacity  style={{...styles.ExpenseOverview, borderBottomColor: activeColor}} onPress={() => setIsInfoActive(false)}>
              <Text style={{...styles.TopTabTitle, color: activeColor}}>Overview</Text>
            </TouchableOpacity >
          </>
        )}
        
      </View>
      {isInfoActive ? (
        <>
          <View style={{...styles.ExpenseCard, backgroundColor: colors.primary_10}}>
            <View style={styles.CardTitle}>
              <Text style={styles.CardTitleText}>{expense.name}</Text>
            </View>
            <View style={styles.CardDecription}>
              <Text style={{...styles.CardDecriptionText, color: colors.neutral_4}}>{expense.description}</Text>
            </View>
            <View style={{...styles.Amount, backgroundColor: colors.primary_20}}>
              <Text style={{...styles.AmountText, color: colors.primary}}>{expense.total}</Text>
            </View>
          </View>
          <View style={styles.ExpenseDetails}>
            <View style={{...styles.EachDetail, borderBottomColor: colors.neutral_6}}>
              <View style={styles.EachDetailLable}>
                <Text style={{...styles.EachDetailText, color: colors.neutral_4}}>Expense type</Text>
              </View>
              <View style={styles.EachDetailInfo}>
                <View style={styles.ExpenseType}>
                  <Text style={{...styles.EachDetailText, color: '#fff', fontWeight: '600'}}>{expense.__typename}</Text>
                </View>
              </View>

            </View>
            <View style={{...styles.EachDetail, borderBottomColor: colors.neutral_6}}>
              <View style={styles.EachDetailLable}>
                <Text style={{...styles.EachDetailText, color: colors.neutral_4}}>Payer</Text>
              </View>
              <View style={styles.EachDetailInfo}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image  style={styles.SmallPictureProfile}
                    source={require('../../assets/images/Facebook-Logo.png')} 
                  />
                  <Text style={{...styles.EachDetailText, color: colors.neutral_4}}>{route.params.payer}</Text>
                </View>
                  
              </View>
            </View>
            <View style={{...styles.EachDetail, borderBottomColor: colors.neutral_6}}>
              <View style={styles.EachDetailLable}>
                <Text style={{...styles.EachDetailText, color: colors.neutral_4}}>Date</Text>
              </View>
              <View style={styles.EachDetailInfo}>
                <Text style={{...styles.EachDetailText, color: colors.neutral_4}}>15/10/2022</Text>   
              </View>
            </View>
          </View>
      </>
      ):(
        <>
          {/* <UserCard
            elementLeft={
              <Image  style={styles.BigPictureProfile}
                source={require('../../assets/images/Facebook-Logo.png')} 
              />
            } 
            name="Pham Thanh Binh"
            elementRight={
              <>
                <Text style={{...styles.ShareText, color: colors.neutral_4}}>Evenly</Text>
                <Text style={{...styles.AmountNeededText, color: colors.primary}}>1.000.000đ</Text>
              </>
            } 
          /> */}
          {expense.userShares &&
            expense.userShares.map((userShare: IUserShare, index: number) => (
              <UserSharesList key={index} userShare={userShare}/>
            ))

          }
        </>
      )}
      
      
    </SafeAreaView>
  )
}
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
  ExpenseInfo:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
    
  },
  ExpenseOverview:{
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1.5,
  },
  ExpenseCard:{
    marginTop: 20,
    flex: 0.22,
    width: '90%',
    paddingHorizontal: 10
  },
  CardTitle:{
    flex: 0.2,
    justifyContent: 'center',

  },
  CardTitleText:{
    fontSize: 16,
    fontWeight: '600'
  },
  CardDecription:{
    flex: 0.3,
  },
  CardDecriptionText:{
    fontSize: 13,
    fontWeight: '400',
  },
  Amount:{
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  AmountText:{
    fontSize: 20,
    fontWeight: '700'
  },
  ExpenseDetails:{
    marginTop: 30,
    flex: 0.2,
    width: '90%',
  },
  EachDetail:{
    flex: 0.3,
    borderBottomWidth: 0.3,
    flexDirection: 'row',
    alignItems:'center',
    

  },
  EachDetailLable:{
    flex: 0.4,
  },
  EachDetailInfo:{
    flex: 0.6,
  },
  EachDetailText:{
    fontSize: 13,
    fontWeight: '400'
  },
  ExpenseType:{
    alignSelf: 'flex-start',
    backgroundColor: '#287D3C',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4
  },
  SmallPictureProfile:{
    width: 22,
    height: 22,
    marginRight: 10
  },
  BigPictureProfile:{
    width: 40,
    height: 40,
  },
  ShareText:{
    fontSize: 13,
    fontWeight: '400',
    marginBottom: 5
  },
  AmountNeededText:{
    fontSize: 14,
    fontWeight: '600'
  }
  
})
export default ExpenseDetail;