import * as React from 'react';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import {TextInput as Input} from 'react-native'

interface TextInputProps {
    isPassword?: boolean;
    variant: 'one-line'| 'multiple-lines' | undefined
    iconRight?: React.ReactNode;
    iconLeft?: React.ReactNode;
    text?: string;
    placeholder?: string;


    setText (text: string): void;
    theme: Theme;
}

const TextInput: React.FC<TextInputProps> = ({ isPassword=false, variant, placeholder, iconRight = null, iconLeft = null, text, setText }) => {
    const { colors } = useTheme();
    let minHeight, isMultipleLines = false;
    switch (variant) {
        case "one-line":
            minHeight = 50;
            break;
        case "multiple-lines":
            minHeight = 100;
            isMultipleLines = true;
            break;
       
    };
 
    return (
        <View style={{...styles.InputSection, minHeight,borderColor: colors.neutral_6}}>
            <View style={{flex: 0.9}}>
                {iconLeft}
                <Input style={{...styles.TextSection}}
                    multiline={isMultipleLines}
                    onChangeText={(text) => {
                        setText(text)
                    }}
                    value={text}
                    placeholder={placeholder}
                    secureTextEntry={isPassword}
                />
            </View>
            <View style={{flex: 0.1}}>
                {iconRight}
            </View>
            

        </View>

    )
};
const styles = StyleSheet.create({
    InputSection: {
        backgroundColor: "#ffffff",
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        paddingHorizontal:15,
        paddingVertical:10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    TextSection:{
        fontSize: 14,
        
    }
})
export default withTheme(TextInput);