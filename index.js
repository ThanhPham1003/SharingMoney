/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import lightColors from './src/shared/themes/light.json';
import { Provider } from 'react-redux';
import store from './src/redux/store';
const theme = {
    ...DefaultTheme,
    colors: {
        ...lightColors,
    },
};

export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </Provider>
    );
}

AppRegistry.registerComponent(appName, () => Main);
