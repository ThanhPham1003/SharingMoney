import * as React from 'react';
import {View, Text, SafeAreaView, StyleSheet, Image} from 'react-native'
import { Header } from '../../components';
interface NotificationsProps{}

const Notifications: React.FC<NotificationsProps> = (props) => {
  return (
    <SafeAreaView style={styles.Container}>
      <Header title='NOTIFICATIONS'/>
        <View style={styles.NotiCard}>
          <View style={styles.ElementLeftSection}>
            <Image  style={styles.PictureArea}
              source={require('../../assets/images/friend.png')} 
            />
          </View>
          <View style={styles.ContentSection}>
            <Text style={styles.ContentText}> Binh Boong has sent a friend request.</Text>
          </View>
        </View>
        <View style={styles.NotiCard}>
          <View style={styles.ElementLeftSection}>
            <Image  style={styles.PictureArea}
              source={require('../../assets/images/friend.png')} 
            />
          </View>
          <View style={styles.ContentSection}>
            <Text style={styles.ContentText}> Thành Phạm has sent a friend request.</Text>
          </View>
        </View>
        <View style={styles.NotiCard}>
          <View style={styles.ElementLeftSection}>
            <Image  style={styles.PictureArea}
              source={require('../../assets/images/Home.png')} 
            />
          </View>
          <View style={styles.ContentSection}>
            <Text style={styles.ContentText}> You have created the "Room test" group.</Text>
          </View>
        </View>
        <View style={styles.NotiCard}>
          <View style={styles.ElementLeftSection}>
            <Image  style={styles.PictureArea}
              source={require('../../assets/images/Expense.png')} 
            />
          </View>
          <View style={styles.ContentSection}>
            <Text style={styles.ContentText}> You have created the "Ts" expense.</Text>
          </View>
        </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  Container:{
    backgroundColor: '#ffffff',
    flex: 1,
  },
  NotiCard:{
    marginHorizontal: 10,
    marginTop: 20,
    minHeight: 64,
    width: ' 100%',
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset:{
      width: 0,
      height: 11,
    },
    shadowRadius: 11,
    shadowOpacity: 0.1,
    backgroundColor: "#ffffff",
    padding: 10,
    flexDirection: 'row',  
  },
  ElementLeftSection:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ContentSection:{
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ContentText:{
    fontSize: 14,
    fontWeight: '600'
  },
  PictureArea:{
    width: 40,
    height: 40,
  }
})
export default Notifications;