import { AppDispatch } from '@root/redux/store';
import { checkToken } from './slice';
import api from "@root/shared/services/api/api";
import { LocalStoreName } from '@root/shared/enums/local-store.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = '/auth';

export function verifyToken() {
    return async (dispatch: AppDispatch) => {
        try {
            const rs = await api.post(`${BASE_URL}/login/firebase`);
            if (rs.status === 200) {
                await AsyncStorage.setItem(LocalStoreName.TOKEN, rs.data?.access_token || '');
                await AsyncStorage.setItem(LocalStoreName.REFRESH_TOKEN, rs.data?.refresh_token || '');
                dispatch(checkToken(true));
            }
        } catch (err) {
            // Analytics later
            console.log(err)
        }

    };
}
