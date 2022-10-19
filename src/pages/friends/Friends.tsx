import * as React from 'react';
import {View, Text} from 'react-native'

interface FriendsProps{}

const Friends: React.FC<FriendsProps> = (props) => {
  return (
    <View>
      <Text>
        Friends Page
      </Text>
    </View>
  )
}
export default Friends;