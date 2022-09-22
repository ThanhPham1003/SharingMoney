import * as React from 'react';
import { Button as CoreButton } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';

interface ButtonProps {
    title: string;
    onPress?(): void;
    theme: Theme
}

const Button: React.FC<ButtonProps> = ({ title = '', onPress }) => {
    const { colors } = useTheme();
    console.log('11111', colors.primary);
    return (
        <CoreButton style={{backgroundColor: colors.primary}} icon="camera" mode="contained" onPress={() => onPress && onPress()}>
            {title}
        </CoreButton>
    );
};

export default withTheme(Button);
