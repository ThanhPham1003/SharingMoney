import { AppDispatch } from '@root/redux/store';
import { checkToken } from './slice';
import api from '@root/shared/services/api/api';
import { LocalStoreName } from '@root/shared/enums/local-store.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
const BASE_URL = '/auth';

export function verifyToken(token: string) {
    return async (dispatch: AppDispatch) => {
        try {
            const rs = await api.post(`${BASE_URL}/login-by-google`, { token });
            if (rs.status === 201) {
                await AsyncStorage.setItem(LocalStoreName.TOKEN, rs.data?.token || '');
                await AsyncStorage.setItem(
                    LocalStoreName.REFRESH_TOKEN,
                    rs.data?.refreshToken || ''
                );
                dispatch(checkToken(rs.data?.token));
            }
        } catch (err) {
            // Analytics later
            console.log('verifyToken', err);
        }
    };
}
