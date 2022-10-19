import * as React from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import {RoomCard} from '../../components'
import { useNavigation } from '@react-navigation/native';
interface ExpenseProps {
}

const ExpenseCard: React.FC<ExpenseProps> = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toDetails = () => {
    navigation.navigate('EXPENSEDETAIL', {})
  } 
  return (
    <TouchableOpacity style={styles.Container} onPress={() => toDetails()}>
      <View style={styles.TitleSection}>
        <View style={styles.TitleNameArea}>
          <Text style={styles.TitleNameText}>Expense Name</Text>
        </View>

        <View style={styles.ExpenseTypeArea}>
          <Text style={styles.ExpenseTypeText}>Type</Text>
        </View>
      </View>
      <View style={styles.DecriptionSection}>
        <View style={styles.DecriptionTextArea}>
          <Text style={{...styles.DecriptionText, color: colors.neutral_4}}>Decription Here</Text>
        </View>
        <View style={styles.AmountArea}>
          <Text style={{...styles.AmountText, color: colors.primary}}>1.000.000đ</Text>
        </View>
      </View>
      <View style={styles.LineSection}>

      </View>
      <View style={styles.PayerAndTimeSection}>
        <View style={styles.PayerTitleArea}>
          <Text style={{...styles.PayerTitleText, color: colors.neutral_6}}>Payer</Text>
        </View>
        <View style={styles.PayerArea}>
          <Image  style={styles.PictureProfileArea}
            source={require('../../assets/images/Facebook-Logo.png')} 
          />
          <Text style={{...styles.PayerNameText, color: colors.neutral_4}}>Payer Name</Text>
        </View>
        <View style={styles.TimeArea}>
          <Text style={{...styles.TimeText,color: colors.neutral_6}}> Time here</Text>
        </View>
        
      </View>
    </TouchableOpacity>
  )
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
      height: 10,
    },
    shadowRadius: 11,
    shadowOpacity: 0.1,
    backgroundColor: "#FFFFFF",
    padding: 10,

  },
  TitleSection:{
    flex: 0.2,
    flexDirection: 'row',

  },
  TitleNameArea:{
    flex: 0.8,
  },
  TitleNameText:{
    fontSize: 16,
    fontWeight: '600'
  },
  ExpenseTypeArea:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#287D3C',
    borderRadius: 4
  },
  ExpenseTypeText:{
    fontSize: 13,
    fontWeight: '600',
    color: '#fff'
  },
  DecriptionSection:{
    flex: 0.6,
    marginBottom: 5
  },
  DecriptionTextArea:{
    flex: 0.6,

  },
  DecriptionText:{
    fontSize: 13,
    fontWeight: '400',
  },
  AmountArea:{
    flex: 0.4
  },
  AmountText:{
    fontSize: 16,
    fontWeight: '700',
  },
  LineSection:{
    borderWidth: 0.3,
    marginBottom: 8
  },
  PayerAndTimeSection:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 0.2
  },
  PayerTitleArea:{
    flex: 0.2,
  },
  PayerArea:{
    flex: 0.6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  PayerTitleText:{
    fontSize: 11,
    fontWeight: '400'
  },
  PictureProfileArea:{
    width: 20,
    height: 20,
    marginRight: 10
  },
  PayerNameText:{
    fontSize: 11,
    fontWeight: '400'
  },
  TimeArea:{
    flex: 0.2
  },
  TimeText:{
    fontSize: 11,
    fontWeight: '400'
  }


})
export default ExpenseCard;