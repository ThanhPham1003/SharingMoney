import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppStates, TAppActions } from '@root/shared/interfaces/app-states.interface';
import { AppActions } from '@root/shared/enums/app-actions.enum';

const initialState: IAppStates = {
    accessToken: '',
    loading: false,
};

const appSlice = createSlice({
    name: 'app-slice',
    initialState,
    reducers: {
        checkToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
        clearToken: (state) => {
            state.accessToken = '';
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { checkToken, clearToken, setLoading } = appSlice.actions;

export default appSlice;
