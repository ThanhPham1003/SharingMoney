import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppStates, TAppActions } from '@root/shared/interfaces/app-states.interface';
import { AppActions } from '@root/shared/enums/app-actions.enum';

const initialState: IAppStates = {
    hasToken: false,
    loading: false,
};

const appSlice = createSlice({
    name: 'app-slice',
    initialState,
    reducers: {
        checkToken: (state, action: PayloadAction<boolean>) => {
            state.hasToken = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
});

export const { checkToken, setLoading } = appSlice.actions;

export default appSlice;
