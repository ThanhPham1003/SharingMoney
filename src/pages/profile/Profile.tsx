import * as React from 'react';
import {View, Text, SafeAreaView} from 'react-native'
import { Header } from '../../components';
interface ProfileProps{}

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <SafeAreaView>
      <Header title='PROFILE'/>
      <Text>
        Profile Page
      </Text>
    </SafeAreaView>
  )
}
export default Profile;