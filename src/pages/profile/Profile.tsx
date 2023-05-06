import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native'
import { Header } from '../../components';
import { withTheme, useTheme } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';
import { firebaseService } from '@root/shared/services/firebase/firebase';
interface ProfileProps{}

const Profile: React.FC<ProfileProps> = (props) => {
  const {colors} = useTheme()
  return (
    <SafeAreaView style={styles.Container}>
      <Header title='PROFILE'/>
      <View style={{...styles.PhotoSection, backgroundColor: colors.primary_20}}>
        <Image  style={{...styles.PictureProfile, borderColor: colors.primary}}
          source={require('../../assets/images/Facebook-Logo.png')} 
        />
        <Text style={styles.NameText}>Thanh Pham</Text>
        <Text style={{...styles.EmailText, color: colors.neutral_4}}>pct1003@gmail.com</Text>
      </View>
      <View style={styles.InfoSection}>
        <View style={styles.BalanceSection}>
          <Text style={styles.BalanceText}> Total speding:</Text>
          <Text style={{...styles.MoneyText, color: colors.primary}}> 1000000d</Text>
        </View>
        <View style={styles.BalanceSection}>
          <Text style={styles.BalanceText}> Total paid:</Text>
          <Text style={{...styles.MoneyText, color: colors.primary}}> 700000d</Text>
        </View>
        <View style={styles.BalanceSection}>
          <Text style={styles.BalanceText}> Total debt:</Text>
          <Text style={{...styles.MoneyText, color: colors.primary}}> 300000d</Text>
        </View>
      </View>
      <View style={styles.LogoutSection}>
          <TouchableOpacity onPress={() => firebaseService.signOut()}>
            <Text style={{...styles.LogoutText, color: colors.primary}}>Log out</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Container:{
    backgroundColor: '#ffffff',
    flex: 1,
  },
  PhotoSection:{
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  PictureProfile:{
    width: 100,
    height: 100,
    borderWidth: 2,
    borderRadius: 50
  },
  NameText:{
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
  },
  EmailText:{
    fontSize: 13,
    marginTop: 10,
  },
  InfoSection:{
    flex: 0.6,
    marginTop: 10
  },
  BalanceSection:{
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row'
  },
  BalanceText: {
    fontSize: 16,
    fontWeight: '600',
  },
  MoneyText:{
    fontSize: 16,
    marginLeft: 10,
  },
  LogoutSection:{
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center'
  }, 
  LogoutText:{
    fontSize: 18,
    fontWeight: '600',
  }
})


export default withTheme(Profile);