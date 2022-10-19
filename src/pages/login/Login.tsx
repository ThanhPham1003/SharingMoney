import * as React from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';
import { withTheme, useTheme } from 'react-native-paper';


interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
     const { colors } = useTheme();
    return (
        <View>
            <Text>222222</Text>
        </View>
    );
};

export default withTheme(Login);
