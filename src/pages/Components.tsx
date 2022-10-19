import React, { useState, type PropsWithChildren } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { withTheme, useTheme } from 'react-native-paper';
import { Alert, Button, TextInput } from '../shared/components';
import { TextInput as Input } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { setToken } from '../redux/user/slice';
import { useNavigation } from '@react-navigation/native';
// import './i18';

interface ComponentsProps {
}

const Components: React.FC<ComponentsProps> = ({}) => {
    const navigation = useNavigation();
    const token = useAppSelector((state) => state.user.token);
    const dispatch = useAppDispatch();
    const isDarkMode = useColorScheme() === 'dark';
    const [visibleAlert, setVisibleAlert] = useState<boolean>(false);
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    const [text, setText] = React.useState<string>('');

    return (
        <SafeAreaView style={backgroundStyle}>
            <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={backgroundStyle.backgroundColor}
            />
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={backgroundStyle}>
                <Header />
                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}
                >
                    <Button
                        type="primary"
                        variant="ghost"
                        size="large"
                        onPress={() => {
                            dispatch(setToken('binh'));
                            // setVisibleAlert(true);
                            navigation.navigate('LOGIN', {});
                        }}
                    >
                        <Text style={{ fontSize: 30, color: 'orange' }}>+</Text>
                    </Button>
                </View>
                <View style={{ marginTop: 40 }}>
                    <Alert
                        type="neutral"
                        visible={visibleAlert}
                        onDismissAlert={() => setVisibleAlert(false)}
                        message="Test alert"
                    />
                </View>
                <View style={{ marginTop: 80 }}>
                    <TextInput
                        colorType="primary"
                        isPassword={true}
                        variant="outlined"
                        label={token}
                        placeholder="Enter your Email"
                        iconRight={<Input.Icon icon="eye" />}
                        text={text}
                        setText={(text) => setText(text)}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default withTheme(Components);
