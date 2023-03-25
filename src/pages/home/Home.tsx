import react, { useEffect, useState } from 'react';
import { withTheme, useTheme } from 'react-native-paper';
import { StyleSheet, View, Image, Text, SafeAreaView } from 'react-native';
import { RoomCard } from '../../components';
import { Button } from '../../shared/components';
import { Header } from '../../components';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useQuery } from '@apollo/client';
import { get } from 'lodash';
import { GET_ALL_ROOMS } from '@root/graphql/queries/room.query';

interface HomeProps {}
const useGetList = (data: any, loading: boolean) => {
    const [list, setList] = useState([]);
    useEffect(() => {
      console.log(data);
      
        if (!loading && data) {
            setList(data);
        }
    }, [data, loading]);
    return get(list, 'rooms', []);
};
const Home: React.FC<HomeProps> = (props) => {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { data, loading, error } = useQuery(GET_ALL_ROOMS, {
        variables: { page: 1, pageSize: 10, limit: 10 },
    });
    const list = useGetList(data, loading);
    return (
        <SafeAreaView style={styles.Container}>
            {/* <Header title='HOME'/> */}
            <View style={{ ...styles.BannerSection, backgroundColor: colors.primary_20 }}>
                <View style={styles.TextArea}>
                    <Text style={styles.BiggerText}>
                        Chia tiền dễ dàng cùng{' '}
                        <Text style={{ color: colors.primary }}>Sharing Money!</Text>
                    </Text>
                    <Text style={{ ...styles.SmallerText, color: colors.newtral_9 }}>
                        Chỉ cần vài bước đơn giản mà không cần tới Excel
                    </Text>
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
        flex: 0.245,
        flexDirection: 'row',
    },
    TextArea: {
        flex: 0.5,
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
        fontSize: 11,
    },
    PhotoArea: {
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    PhotoStyle: {
        width: 263,
        height: 158,
        marginRight: 70,
    },
    RoomListSection: {
        flex: 0.64,
        alignItems: 'center',
    },
    CreateRoomSection: {
        flex: 0.15,
        alignItems: 'flex-end',
    },
});

export default withTheme(Home);
