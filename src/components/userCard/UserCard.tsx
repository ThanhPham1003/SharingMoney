import * as React from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Theme } from 'react-native-paper/lib/typescript/types';
interface UserCardProps{
  elementLeft?: React.ReactNode;
  name?: string;
  elementRight?: React.ReactNode;
  theme: Theme
}

const UserCard: React.FC<UserCardProps> = ({elementLeft=null, name, elementRight=null}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();

  return(
    <TouchableOpacity style={styles.Container}>
      <View style={styles.ElementLeftSection}>
        {elementLeft}
      </View>
      <View style={styles.NameSection}>
        <Text style={styles.NameText}>{name}</Text>
      </View>
      <View style={styles.ElementRightSection}>
        {elementRight}
      </View>

    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  Container:{
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
    flexDirection: 'row',
    padding: 10,
    
  },
  ElementLeftSection:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  NameSection:{
    flex: 0.45,
    justifyContent: 'center',
  },
  NameText:{
    fontSize: 14,
    fontWeight: '600'
  },
  ElementRightSection:{
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
})
export default withTheme(UserCard)