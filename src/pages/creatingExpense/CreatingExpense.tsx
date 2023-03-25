import * as React from 'react';
import {  KeyboardAvoidingView, Platform,ScrollView, Text } from 'react-native';
import { StyleSheet, View, SafeAreaView, TouchableOpacity} from 'react-native';
import { withTheme, useTheme } from 'react-native-paper';
import TextInput from '../../shared/components/textInput/TextInput'
import { useNavigation } from '@react-navigation/native';
import { Header } from '../../components';
import { Button} from '../../shared/components';
import Icon from 'react-native-vector-icons/AntDesign';
import ButtonIcon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'

interface CreatingExpenseProps {}

const CreatingExpense: React.FC<CreatingExpenseProps> = (props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [expenseName, setExpenseName] = React.useState<string>('')
  const [description, setDescription] = React.useState<string>('')
  const [amountOfMoney, setAmountOfMoney] = React.useState<string>('')
  const [payer, setPayer] = React.useState<string>('')
  const [addingMembers, setAddingMembers] = React.useState<string>('')
  const [date, setDate] = React.useState<Date>(new Date())
  const [dateText, setDateText] = React.useState<string>('')
  const [openDatePicker, setOpenDatePicker] = React.useState<boolean>(false)
  const [isSharingEvenly, setIsSharingEvenly] = React.useState<boolean>(true)

  const back = () =>{
    navigation.navigate('ROOMDETAIL', {})
  }

  return(
    <SafeAreaView style={styles.Container}>
      <Header 
        iconLeft={
              <TouchableOpacity onPress={() => back()}>
                <Icon name="left" size={25} color={colors.neutral_4} />
              </TouchableOpacity>
        } 
        title='CREATING ROOM'
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView>
          <View style={styles.TextInputArea}>
            <Text style={styles.FieldNameText}>Expense Name</Text>
            <TextInput
              variant='one-line'
              placeholder='Enter your Expense'
              text={expenseName}
              setText={(text) => setExpenseName(text)}
            />
          </View>
          <View style={styles.TextInputArea}>
            <Text style={styles.FieldNameText}>Decription</Text>
            <TextInput
              variant='multiple-lines'
              placeholder='Enter decription'
              text={description}
              setText={(text) => setDescription(text)}
            />
          </View>
          <View style={styles.TextInputArea}>
            <Text style={styles.FieldNameText}>Amount of Money</Text>
            <TextInput
              variant='one-line'
              placeholder='Enter amount of money'
              text={amountOfMoney}
              setText={(text) => setAmountOfMoney(text)}
            />
          </View>
          <View style={styles.TextInputArea}>
            <Text style={styles.FieldNameText}>Payer</Text>
            <TextInput
              variant='one-line'
              placeholder='Enter payer'
              text={payer}
              setText={(text) => setPayer(text)}
            />
          </View>
          <View style={styles.TextInputArea}>
            <Text style={styles.FieldNameText}>Adding Member</Text>
            <TextInput
              variant='one-line'
              placeholder='Enter name of member'
              text={addingMembers}
              setText={(text) => setAddingMembers(text)}
            />
          </View>
          <View style={styles.TextInputArea}>
            <Text style={styles.FieldNameText}>Date</Text>
            <TextInput
              variant='one-line'
              placeholder='Enter the date of payment'
              text={dateText}
              setText={(text) => setDateText(text)}
              iconRight={
                <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                  <Icon name="calendar" size={26} color={colors.neutral_4}/>
                </TouchableOpacity>

              }
            />
          </View>
          <View style={styles.TextInputArea}>
            <Text style={styles.FieldNameText}>Expense Type</Text>
            {isSharingEvenly ? (
              <>
                <Button
                  type="neutral"
                  variant="ghost"
                  size="large"
                  onPress={() => setIsSharingEvenly(true)}
                >
                  <View style={styles.ShareButton}>
                    <ButtonIcon name="dot-circle-o" size={20} color={colors.primary}/>
                    <Text style={styles.IconButton}>Share Evenly</Text>
                  </View>
                </Button>
                <View style={{marginTop: 15}}>
                  <Button
                    type="neutral"
                    variant="ghost"
                    size="large"
                    onPress={() => setIsSharingEvenly(false)}
                  >
                    <View style={styles.ShareButton}>
                      <ButtonIcon name="circle-thin" size={20} color={colors.primary}/>
                      <Text style={styles.IconButton}>Share proportionally</Text>
                    </View>
                  </Button>   
                </View>
              </>
            ):(
              <>
                <Button
                  type="neutral"
                  variant="ghost"
                  size="large"
                  onPress={() => setIsSharingEvenly(true)}
                >
                  <View style={styles.ShareButton}>
                    <ButtonIcon name="circle-thin" size={20} color={colors.primary}/>
                    <Text style={styles.IconButton}>Share Evenly</Text>
                  </View>
                </Button>
                <View style={{marginTop: 15}}>
                  <Button
                    type="neutral"
                    variant="ghost"
                    size="large"
                    onPress={() => setIsSharingEvenly(false)}
                  >
                    <View style={styles.ShareButton}>
                      <ButtonIcon name="dot-circle-o" size={20} color={colors.primary}/>
                      <Text style={styles.IconButton}>Share proportionally</Text>
                    </View>
                  </Button>   
                </View>
              </>
            )}
            
            
          </View>
          <>
            <DatePicker
              modal
              open={openDatePicker}
              maximumDate={date}
              date={date}
              mode="date"
              onConfirm={(date) => {
                setOpenDatePicker(false)
                setDateText(date.getDate()+ '/' + (date.getMonth() + 1) + '/' + date.getFullYear())
              }}
              onCancel={() => {
                setOpenDatePicker(false)
              }}
            />
          </>
        </ScrollView>
      </KeyboardAvoidingView>
      
    </SafeAreaView>
  )
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
  },
  ShareButton:{
    width: 320,
    flexDirection: 'row',
    alignItems: 'center',
  },
  IconButton:{
    marginLeft: 15,
    fontSize: 13,
    fontWeight: '600'
  }
})
export default CreatingExpense