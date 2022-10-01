import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './user.interface';
// import { setToken } from './reducer';

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
    },
});

export const { setToken  } = userSlice.actions;

export default userSlice.reducer;
