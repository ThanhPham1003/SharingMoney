import * as React from 'react';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';

import {TextInput as Input} from 'react-native'
import { Float } from 'react-native/Libraries/Types/CodegenTypes';

interface NumberInputProps {
    isPassword?: boolean;
    variant: 'one-line'| 'multiple-lines' | undefined
    iconRight?: React.ReactNode;
    iconLeft?: React.ReactNode;
    number?: number;
    placeholder?: string;


    setNumber (number: number): void;
    theme: Theme;
}

const NumberInput: React.FC<NumberInputProps> = ({ isPassword=false, variant, placeholder, iconRight = null, iconLeft = null, number, setNumber }) => {
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
            <View style={{flex: 0.9, flexDirection: 'row'}}>
                {iconLeft}
                <Input style={{...styles.TextSection}}
                    multiline={isMultipleLines}
                    onChangeText={(text) => {
                        setNumber(Number(text))
                    }}
                    value={number}
                    placeholder={placeholder}
                    secureTextEntry={isPassword}
                    keyboardType='numeric'
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
        paddingHorizontal:5,
        paddingVertical: 15,
        flexDirection: 'row',
    },
    TextSection:{
        fontSize: 14,
        marginLeft: 10
        
    }
})
export default withTheme(NumberInput);