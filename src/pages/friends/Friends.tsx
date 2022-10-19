import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native'
import { Header } from '../../components';
interface FriendsProps{}

const Friends: React.FC<FriendsProps> = (props) => {
  return (
    <SafeAreaView>
      <Header title='FRIENDS'/>
      <Text>
        Friends Page
      </Text>
    </SafeAreaView>
  )
}
export default Friends;