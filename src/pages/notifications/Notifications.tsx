import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native'
import { Header } from '../../components';
interface NotificationsProps{}

const Notifications: React.FC<NotificationsProps> = (props) => {
  return (
    <SafeAreaView>
      <Header title='NOTIFICATIONS'/>
      <Text>
        Notifications Page
      </Text>
    </SafeAreaView>
  )
}
export default Notifications;