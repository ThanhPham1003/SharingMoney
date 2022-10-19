import * as React from 'react';
import { Button as CoreButton } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

interface ButtonProps {
    children?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'neutral' | undefined;
    variant?: 'filled' | 'ghost' | 'borderless' | 'round' | undefined;
    size?: 'large' | 'medium' | 'small' | undefined;

    onPress?(): void;
    theme: Theme;
}

const Button: React.FC<ButtonProps> = ({ children, type, variant, size, onPress }) => {
    const { colors } = useTheme();
    let backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        height = 0,
        paddingHorizontal;

    switch (type) {
        case 'primary':
            backgroundColor = colors.primary;
            borderRadius = 5;
            break;
        case 'secondary':
            backgroundColor = colors.secondary;
            borderRadius = 5;
            break;
        case 'neutral':
            backgroundColor = colors.neutral_black;
            borderRadius = 5;
            break;
        default:
            break;
    }
    switch (size) {
        case 'large':
            paddingHorizontal =10,
            height = 64;

            break;
        case 'medium':
            paddingHorizontal = 5,
            height = 58;

            break;
        case 'small':
            paddingHorizontal = 0,
            height = 54;

            break;
        default:
            break;
    }
    switch (variant) {
        case 'filled':
            break;
        case 'ghost':
            borderColor = backgroundColor;
            borderWidth = 2;
            backgroundColor = 'transparent';

            break;
        case 'borderless':
            backgroundColor = 'transparent';
            break;
        case 'round':
            borderRadius = height/2;
            break;
        default:
            break;
    }


    return (
        <CoreButton
            style={{
                ...styles.Container,
                backgroundColor,
                borderColor,
                borderWidth,
                borderRadius,
                paddingHorizontal,
                height
            }}
            onPress={() => onPress && onPress()}
            uppercase={false}
        >
            {children}
        </CoreButton>
    );
};

const styles = StyleSheet.create({
    SectionContainer: {
        width: 200,
    },
    Container: {
        //borderRadius:20,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default withTheme(Button);
