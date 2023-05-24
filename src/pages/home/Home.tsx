import react, { useEffect, useState, useContext } from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, SafeAreaView,ScrollView, FlatList } from 'react-native';
import { RoomCard } from '../../components';
import { Button } from '../../shared/components';
import { Header } from '../../components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import { GET_MY_ROOMS } from '@root/graphql/queries/room.query';
import {IRoom} from  '@root/shared/interfaces/room.interface';
import { RoomUpdatedContext, RoomUpdatedProvider } from '@root/context';
import { CurrentIDContext } from '@root/context';
import reactotron from 'reactotron-react-native';
import TextInput from '../../shared/components/textInput/TextInput'
import { Decode } from '@root/shared/services/decode/jwt-decode';

interface HomeProps {
}
const Home: React.FC<HomeProps> = (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { data, loading, error, refetch } = useQuery(GET_MY_ROOMS, {
        variables: { page: 1, limit: 10 },
    });
    const [roomList, setRoomList] = useState([])
    const [searchingText, setSearchingText] = useState('');
    const reloadContext = useContext(RoomUpdatedContext)
    const currentID = useContext(CurrentIDContext);
    const getUser = async () => {
        const currentUser = await Decode.decodeToken();
        currentID?.setCurrentID({id:currentUser.id})
    }
    const searchFilter = (text: string) => {
        if(text) {        
            const newRoomList = data.rooms.filter((item: IRoom) => {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setRoomList(newRoomList)
          setSearchingText(text);
        }else{
          setRoomList(data.rooms);
          setSearchingText(text);
        }
    }
    useEffect(() => {
        refetch()
    }, [reloadContext?.reload?.isRoomListUpdated])
    useEffect(() => {

        if(data){
            setRoomList(data.myrooms)
        }
        reloadContext?.setReload({isRoomListUpdated: false})
    }, [data, reloadContext?.reload?.isRoomListUpdated])
    // useEffect(() => {
    //     console.log("77777", reloadContext?.reload?.isRoomListUpdated)
    // },[reloadContext?.reload?.isRoomListUpdated])
    useEffect(() => {
        getUser();
    }, [])

    return (
        <SafeAreaView style={styles.Container}>
            {/* <Header title='HOME'/> */}
            <View style={{ ...styles.BannerSection, backgroundColor: colors.primary_20 }}>
                <View style={styles.TextArea}>
                    <Text style={styles.BiggerText}>
                        Easy money management with{' '}
                        <Text style={{ color: colors.primary }}>Sharing Money!</Text>
                    </Text>
                    <Text style={{ ...styles.SmallerText, color: colors.newtral_9 }}>
                        Just a few simple steps without Excel
                    </Text>
                </View>
                <View style={styles.PhotoArea}>
                    <Image
                        style={styles.PhotoStyle}
                        source={require('../../assets/images/Home-picture.png')}
                    />
                </View>
            </View>
            <View style={styles.SearchingSection}>
                <TextInput
                    iconLeft={
                        <Icon style={{marginLeft: 5}} name="search1" size={20} color={colors.neutral} />
                    }
                    variant='one-line'
                    placeholder='Searching room here...'
                    text={searchingText}
                    setText={(text) => searchFilter(text)}
                />
            </View>
            <ScrollView style={styles.RoomListSection} contentContainerStyle={{flexGrow : 1, alignItems : 'center'}}>
                {roomList &&
                    roomList.map((roomDetail: IRoom, index: number) => (
                        <RoomCard key={index} room={roomDetail}/>
                    ))
                }
            </ScrollView>
            <View style={styles.CreateRoomSection}>
                <View style={{ marginRight: 20 }}>
                    <Button
                        type="primary"
                        variant="round"
                        size="large"
                        onPress={() => {
                            navigation.navigate('CREATINGROOM', {});
                        }}
                    >
                        <Icon name="plus" size={30} color="#ffffff" />
                    </Button>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    BannerSection: {
        flex: 0.27,
        flexDirection: 'row',
    },
    TextArea: {
        flex: 0.6,
        justifyContent: 'center',
        marginLeft: 20,
    },
    BiggerTextArea: {
        flexDirection: 'row',
    },
    BiggerText: {
        fontSize: 18,
        fontWeight: '600',
    },
    SmallerText: {
        marginTop: 10,
        fontSize: 12,
    },
    PhotoArea: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PhotoStyle: {
        width: 203,
        height: 118,
        marginRight: 20,
    },
    RoomListSection: {
        flex: 0.6,
    },
    CreateRoomSection: {
        flex: 0.13,
        alignItems: 'flex-end',
    },
    SearchingSection:{
        marginHorizontal: 10,
        marginTop: 10,
    }
});

export default withTheme(Home);
