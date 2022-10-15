import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { endpoint } from '../../../configuration/EndPoint';
import { LocalStoreName } from '../../enums/local-store.enum';

const api = axios.create({
    baseURL: `${endpoint.api}/`,
});
// api.defaults.headers.common['idShop'] = localStorage.getItem('idShop') || 'aaa';
api.interceptors.request.use(
    function (config: any) {
        const token = AsyncStorage.getItem(LocalStoreName.TOKEN);
        config.headers = {
            Authorization: `Bearer ${token}`,
        } as any;

        return config;
    },
    function (error: any) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    function (response: any) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error: AxiosError) {
        if (error.response && error.response?.status >= 400 && error.response?.status < 500) {
            if (error?.response?.status === 401) {
                const result = await api.post('auth/retrieve-token', {
                    refreshToken: AsyncStorage.getItem(LocalStoreName.REFRESH_TOKEN),
                });
                if (!result.data.token) {
                    location.href = '/login';
                } else {
                    AsyncStorage.setItem(LocalStoreName.TOKEN, result.data.token);
                    return api.request(error.config);
                }
            }
            return Promise.reject(error.response.data);
        } else {
            console.log(`${error?.response?.status}: ${error?.response?.statusText}`);
            // alert(`${error?.response?.status}: ${error?.response?.statusText}`);
        }
        return Promise.reject(error);
    }
);

export default api;
