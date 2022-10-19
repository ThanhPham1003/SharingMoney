import * as React from 'react';
import {  Text } from 'react-native';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
import { withTheme, useTheme } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useNavigation } from '@react-navigation/native';
import Button from '../../shared/components/button/Button';
import API from '../../config/environmentVariables'
import axios from 'axios';

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const dispatch = useAppDispatch();


    return (
        <SafeAreaView style={styles.Container}>
            <View style={styles.PictureSection}>
                <Image style={styles.Picture} 
                    source={require('../../assets/images/Login-Picture.png')} 
                />
            </View>
            <View style={styles.MainSection}>
                <View style={styles.LoginTittleSection}>
                    <Text style={styles.LoginTittleText}>Đăng Nhập</Text>
                    <View style={styles.LoginContentText}> 
                        <Text style={{fontSize: 16 }}> Chào mừng bạn đến với </Text>
                        <Text style={{fontWeight: '700', fontSize: 16}}>Sharing Money</Text> 
                    </View>
                </View>
                <View style ={styles.ButtonSection}>
                    <Button                         
                        type="neutral"
                        variant="ghost"
                        size="medium"
                        onPress={() => {
                            navigation.navigate('MAIN', {})
                        }}
                    >
                        <View style={styles.GoogleButton}>
                            <Image  style={styles.GoogleLogo}
                                source={require('../../assets/images/Google-Logo.png')} 
                            />
                            <Text style={styles.ButtonText}>Đăng Nhập với Google</Text>
                        </View>
 
                    </Button>
                    <View style={{marginTop: 20}}>
                        <Button
                            type="neutral"
                            variant="ghost"
                            size="medium"
                        >

                            <View style={styles.FacebookButton}>
                                <Image  style={styles.FacebookLogo}
                                    source={require('../../assets/images/Facebook-Logo.png')} 
                                />
                                <Text style={styles.ButtonText}>Đăng Nhập với Facebook</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>

    );
};
const styles = StyleSheet.create({
    Container:{
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    PictureSection:{
        backgroundColor: '#FFF0E2',
        flex: 0.4,
    },
    Picture:{
        width: 390,
        height: 293,
        
    },
    MainSection:{

        flex: 0.6,
        marginLeft: 20,
        marginTop: 30,
    },
    LoginTittleSection:{
        height: 70,
    },
    LoginTittleText:{
        fontSize: 28,
        fontWeight: '500',
    },
    LoginContentText:{
        marginTop: 10,
        flexDirection: 'row'
    },
    ButtonSection:{
        marginTop: 20,
        width:'92%',
    },
    GoogleButton:{
        width: 310,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    FacebookButton:{
        width: 310,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    GoogleLogo :{
        width: 24,
        height: 24,
        marginRight: 10
    },
    FacebookLogo :{
        width: 24,
        height: 24,
        marginRight: 10
    },
    ButtonText:{
        fontSize:13,
        fontWeight: '500'
    }


})

export default withTheme(Login);
