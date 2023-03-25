import React, { useEffect, useState } from 'react';
import { AppStackScreens } from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
const App = () => {
    return (
        <Provider store={store}>
            <AppStackScreens />
        </Provider>
    );
};

export default App;
