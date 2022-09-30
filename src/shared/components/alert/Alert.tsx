import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Snackbar, Text, Button } from 'react-native-paper';
import { withTheme, useTheme } from 'react-native-paper';
import { red100 } from 'react-native-paper/lib/typescript/styles/colors';
import { Theme } from 'react-native-paper/lib/typescript/types';
import Icon from 'react-native-vector-icons/AntDesign';


interface AlertProps {
    visible: boolean;
    type?: "primary"| "secondary" | "neutral" | undefined;
    message?: string;
    onDismissAlert?(): void;
    theme: Theme;
}

const Alert: React.FC<AlertProps> = ({ visible, message = '', type,onDismissAlert }) => {
    const { colors } = useTheme();
    let backgroundColor, color;
    switch(type){
        case "primary":
            backgroundColor = colors.primary;
            color = colors.neutral_black;
            break;
        case "secondary":
            backgroundColor = colors.secondary;
            break;    
        case "neutral":
            backgroundColor = colors.neutral_black;
            color ="#ffffff"
            break;
    }
    let containerStyle;


    return (
        <Portal>
            <Modal visible={visible} onDismiss={() => onDismissAlert && onDismissAlert() } contentContainerStyle={{...styles.Container,backgroundColor}}>
                <View style={styles.Content}>
                    <View style={styles.WarningIcon}>
                        <Icon  name="exclamationcircle" size={20} color={color}/>
                    </View>
                    <View style={styles.TextView}>
                        <Text style={{...styles.Text, color}}>{message}</Text>
                    </View>
                    <View style={styles.CloseIcon}>
                        <Button onPress={() => onDismissAlert && onDismissAlert()}><Icon  name="close" size={20} color={color}/></Button>
                    </View>
                </View> 
            </Modal>
        </Portal>
        
    );
};
const styles = StyleSheet.create({
    Container:{
        borderRadius: 10,
        marginLeft:5,
        marginRight: 5,
    },
    Content:{
        flexDirection: 'row',
        padding: 10,

    },
    WarningIcon:{
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextView:{
        justifyContent: 'center',
        marginLeft: 20,
        width: 290,

    },
    Text:{
        color: 'black',
        fontWeight: '800'
       
    },
    CloseIcon:{
        justifyContent: 'center',
        alignItems: 'center',
        
    }


})

export default withTheme(Alert);
