import * as React from 'react';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
import { View, StyleSheet, Text } from 'react-native';

interface HeaderProps {
  iconLeft?: React.ReactNode;
  title?: string;
  iconRight?: React.ReactNode;
  theme: Theme;
}

const Header: React.FC<HeaderProps> = ({iconLeft =null, title, iconRight=null }) => {
  const { colors } = useTheme();
  return(
    <View style={{...styles.HeaderSection, borderColor: colors.neutral_6}}>
      <View style={styles.IconArea}>
        {iconLeft}
      </View>
      <View style={styles.TextArea}>
        <Text style={styles.TitleText}>{title}</Text>
      </View>
      <View style={styles.IconArea}>
        {iconRight}
      </View>
    </View>
  )
};
const styles = StyleSheet.create({
  HeaderSection:{
    width: '100%',
    height: 40,
    flexDirection: 'row',
    borderBottomWidth: 0.2,
  },
  IconArea:{
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextArea:{
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  TitleText:{
    fontSize: 20,
    fontWeight: "600"
  }
  
})
export default withTheme(Header);