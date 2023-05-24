import React, { useEffect, useState } from 'react';
import { AppStackScreens } from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import {RoomUpdatedProvider} from './src/context'
import { ExpenseUpdatedProvider } from './src/context';
import { FriendUpdatedProvider } from './src/context';
import { CurrentIDProvider } from './src/context';
if (__DEV__) {
    import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}
const App = () => {
    return (
        <Provider store={store}>
            <CurrentIDProvider>
                <RoomUpdatedProvider>
                    <FriendUpdatedProvider>
                        <ExpenseUpdatedProvider>
                            <AppStackScreens />
                        </ExpenseUpdatedProvider>
                    </FriendUpdatedProvider>
                </RoomUpdatedProvider>
            </CurrentIDProvider>
        </Provider>
    );
};

export default App;
