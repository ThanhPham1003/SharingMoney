import { createNavigationContainerRef } from '@react-navigation/native';
import { MainStackParamList } from './MainStackScreens';
export const navigationRef = createNavigationContainerRef<MainStackParamList>();

export function navigate(name: any, params: any) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}

// add other navigation functions that you need and export them
