import * as React from 'react';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { HelperText, TextInput as Input } from 'react-native-paper';
interface TextInputProps {
    colorType?: "primary" | "secondary" | "neutral" | undefined;
    isPassword?: boolean;
    variant?: "outlined" | "flat" | undefined;
    //iconType?: "iconRight" | "iconLeft" | "none" | undefined;

    //icon?: string;
    iconRight?: React.ReactNode;
    iconLeft?: React.ReactNode;
    text?: string;
    label?: string;
    placeholder?: string;


    setText (text: string): void;
    theme: Theme;
}

const TextInput: React.FC<TextInputProps> = ({ colorType, isPassword=false, variant, label, placeholder, iconRight = null, iconLeft = null, text, setText }) => {
    const { colors } = useTheme();
    let color;
    switch (colorType) {
        case "primary":
            color = colors.primary;
            break;
        case "secondary":
            color = colors.secondary;
            break;
        case "neutral":
            color = colors.neutral_black;
            break;

    };
 
    return (
        <View style={styles.InputSection}>
            <Input style={{ ...styles.InputSection }}
                activeOutlineColor={color}
                outlineColor={color}
                label={label}
                mode={variant}
                placeholder={placeholder}
                value={text}
                onChangeText={(text) => {
                    setText(text)
                }}
                right={iconRight}
                left={iconLeft}
                secureTextEntry={isPassword}
            />

        </View>

    )
};
const styles = StyleSheet.create({
    InputSection: {
        backgroundColor: "#ffffff",
        borderRadius: 15,
        marginHorizontal: 10,
    }
})
export default withTheme(TextInput);