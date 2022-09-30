/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

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
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Alert, Button, TextInput } from './src/shared/components';
import { TextInput as Input } from 'react-native-paper';
// import './i18';

const Section: React.FC<
    PropsWithChildren<{
        title: string;
    }>
> = ({ children, title }) => {
    const isDarkMode = useColorScheme() === 'dark';
    return (
        <View style={styles.sectionContainer}>
            <Text
                style={[
                    styles.sectionTitle,
                    {
                        color: isDarkMode ? Colors.white : Colors.black,
                    },
                ]}
            >
                {title}
            </Text>
            <Text
                style={[
                    styles.sectionDescription,
                    {
                        color: isDarkMode ? Colors.light : Colors.dark,
                    },
                ]}
            >
                {children}
            </Text>
        </View>
    );
};

const App = () => {
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
                        onPress={() => setVisibleAlert(true)}
                    >
                        <Text style={{fontSize: 30, color:"orange"}}>+</Text>
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
                        label="Email"
                        placeholder="Enter your Email"
                        iconRight={
                            <Input.Icon icon="eye" />
                        }
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

export default App;
