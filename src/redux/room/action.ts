import { AppDispatch } from 'redux/store';
import { addRoom, removeRoom, getRoom } from './slice';
import api from 'shared/services/api';
import { LocalStoreName } from 'shared/enums/local-store.enum';

const BASE_URL = '/room';

export function fetchRoomList() {
    return async (dispatch: AppDispatch) => {
        try {
            const rs = await api.get(`${BASE_URL}`);
            if (rs.status === 200) {
                dispatch(getRoom(rs.data));
                return rs.data;
            }
        } catch (err) {
            // Analytics later
            console.log(err);
        }
    };
}
