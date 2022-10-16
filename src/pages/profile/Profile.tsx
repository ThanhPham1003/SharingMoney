import * as React from 'react';
import {View, Text} from 'react-native'

interface ProfileProps{}

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <View>
      <Text>
        Profile Page
      </Text>
    </View>
  )
}
export default Profile;