import * as React from 'react';
import {View, Text} from 'react-native'

interface NotificationsProps{}

const Notifications: React.FC<NotificationsProps> = (props) => {
  return (
    <View>
      <Text>
        Notifications Page
      </Text>
    </View>
  )
}
export default Notifications;