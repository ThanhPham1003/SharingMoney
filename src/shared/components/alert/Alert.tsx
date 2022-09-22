import * as React from 'react';
import { Snackbar } from 'react-native-paper';
import { withTheme, useTheme } from 'react-native-paper';
import { Theme } from 'react-native-paper/lib/typescript/types';
interface AlertProps {
    visible: boolean;
    message?: string;
    onDismissAlert?(): void;
    theme: Theme;
}

const Alert: React.FC<AlertProps> = ({ visible, message = '', onDismissAlert }) => {
    const { colors } = useTheme();
    return (
        <Snackbar
            visible={visible}
            onDismiss={() => onDismissAlert && onDismissAlert()}
            // action={{
            //     label: 'Undo',
            //     onPress: () => {
            //         // Do something
            //     },
            // }}
        >
            {message}
        </Snackbar>
    );
};

export default withTheme(Alert);
