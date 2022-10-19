import * as React from 'react';
import { Button as CoreButton } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
    children?: React.ReactNode;
    type?: 'primary' | 'secondary' | 'neutral' | 'neutral-active'| undefined;
    variant?: 'filled' | 'ghost' | 'borderless' | 'round' | undefined;
    size?: 'large' | 'medium' | 'small' | undefined;
    onPress?(): void;
    theme: Theme;
}

const Button: React.FC<ButtonProps> = ({ children, type, variant, size,  onPress }) => {
    const { colors } = useTheme();
    let backgroundColor,
        borderColor,
        borderWidth,
        borderRadius,
        paddingVertical = 0,
        paddingHorizontal,
        height

    switch (type) {
        case 'primary':
            backgroundColor = colors.primary;
            borderRadius = 10;
            break;
        case 'secondary':
            backgroundColor = colors.secondary;
            borderRadius = 10;
            break;
        case 'neutral':
            backgroundColor = colors.neutral_6;
            borderRadius = 10;
            break;
        case 'neutral-active':
            backgroundColor = colors.neutral;
            borderRadius = 10;
            break;    
        default:
            break;
    }
    switch (size) {
        case 'large':
            paddingHorizontal =15,
            paddingVertical=15

            break;
        case 'medium':
            paddingHorizontal = 10,
            paddingVertical = 10

            break;
        case 'small':
            paddingHorizontal = 5,
            paddingVertical = 5

            break;
        default:
            break;
    }
    switch (variant) {
        case 'filled':
            break;
        case 'ghost':
            borderColor = backgroundColor;
            borderWidth = 1;
            backgroundColor = 'transparent';

            break;
        case 'borderless':
            backgroundColor = 'transparent';
            break;
        case 'round':
            borderRadius = 64;
            break;
        default:
            break;
    }



    return (
        <TouchableOpacity
            style={{
                ...styles.Container,
                backgroundColor,
                borderColor,
                borderWidth,
                borderRadius,
                paddingHorizontal,
                paddingVertical,
                height
            }}
            onPress={() => onPress && onPress()}
        >
            {children}
        </TouchableOpacity>
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
        backgroundColor:'red'
    },
});

export default withTheme(Button);
