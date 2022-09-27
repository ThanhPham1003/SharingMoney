import * as React from 'react';
import { Button as CoreButton } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
import { withTheme, useTheme } from 'react-native-paper';
import { View,StyleSheet, Text } from 'react-native';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';

interface ButtonProps {
    title: string;
    type?: string;
    style?:string;
    size?: string;

    onPress?(): void;
    theme: Theme
}

const Button: React.FC<ButtonProps> = ({ title = '',type, style, size,onPress }) => {
    const { colors } = useTheme();
    let backgroundColor;
    let color;
    let borderColor;
    let borderWidth;
    let borderRadius;
    let width;
    let height;
    let fontSize;

    switch(type){
        case "primary":
            backgroundColor = colors.primary;
            break;
        case "secondary":
            backgroundColor = colors.secondary;
            break;    
        case "neutral":
            backgroundColor = colors.neutral_black;
            break;
        default:
            backgroundColor = colors.primary; 
    };
    switch(style){        
        case "filled":
            break;
        case "ghost":
            color = backgroundColor;
            borderColor =  backgroundColor;
            borderWidth = 2;
            backgroundColor = 'transparent'

            break;    
        case "borderless":
            color = backgroundColor;
            backgroundColor = 'transparent'

            break;
        case "round":
            color = '#ffffff';
            borderRadius = 20;
            break;  
        default :
            color = '#ffffff';
            borderRadius = 0;
            break;
        ;      
    }
    switch(size){
        case "large":
            width = 130;
            height = 56;
            fontSize = 20;
            break;    
        case "medium":
            width = 110;
            height = 48;
            fontSize = 18;
            break;
        case "small":
            width = 80;
            height = 36;
            fontSize = 12;
            break;
        default:
            width = 136;
            height = 56;
            fontSize = 20;
            break;    
    }


    return (
        <View style={styles.SectionContainer}>
            <CoreButton style={{...styles.Container, backgroundColor,borderColor,borderWidth,borderRadius,width,height}} onPress={() => onPress && onPress()}>
                <Text style={{...styles.Text,color,fontSize}}>{title}</Text>
            </CoreButton>
        </View>

    );
};

const styles = StyleSheet.create({
    SectionContainer:{
        height: 70,
    },
    Container:{
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:20,
    },
    Text:{
        fontWeight:'800'
    }

}
)

export default withTheme(Button);
