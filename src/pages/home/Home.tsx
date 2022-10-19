import * as React from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text } from 'react-native';
import {RoomCard} from '../../components'
import { Button } from '../../shared/components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign'
interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <View style={styles.Container}>
            <View style={{ ...styles.BannerSection, 
              backgroundColor: colors.primary_20 }}
            >
                <View style={styles.TextArea}>
                  <Text style={styles.BiggerText}>Chia tiền dễ dàng cùng <Text style={{color: colors.primary}}>Sharing Money!</Text></Text>
                  <Text style={{...styles.SmallerText, color: colors.newtral_9}}>Chỉ cần vài bước đơn giản mà không cần tới Excel</Text>
                </View>
                <View style={styles.PhotoArea}>
                    <Image
                        style={styles.PhotoStyle}
                        source={require('../../assets/images/Home-picture.png')}
                    />
                </View>
            </View>
            <View style={styles.RoomListSection}>
              <RoomCard />
            </View>
            <View style={styles.CreateRoomSection}>
              <View style={{marginRight: 20}}>
                <Button 
                  type="primary" 
                  variant="round" 
                  size="large"
                  onPress={() => {
                    navigation.navigate('CREATINGROOM', {})
                  }}
                >
                  <Icon name="plus" size={30} color="#ffffff"/>
                </Button>
              </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    BannerSection: {
        flex: 0.21,
        flexDirection: 'row',
    },
    TextArea: {
        flex: 0.5,
        justifyContent: 'center',
        marginLeft: 20
    },
    BiggerTextArea:{
      flexDirection: 'row'
    },
    BiggerText:{
      fontSize: 18,
      fontWeight: '600'
    },
    SmallerText:{
      marginTop: 10,
      fontSize: 11
    },
    PhotoArea: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    PhotoStyle: {
        width: 263,
        height: 158,
        marginRight: 70
    },
    RoomListSection:{
      flex: 0.64,
      alignItems: 'center',
    },
    CreateRoomSection:{
      flex: 0.15,
      alignItems: 'flex-end',
    }
});

export default withTheme(Home);
