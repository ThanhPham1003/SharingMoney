import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'shared/interfaces/user.interface';

const initialState: IUser = {
    _id: '',
    email: '',
    name: '',
    type: '',
    avatar: '',
};

const userSlice = createSlice({
    name: 'user-slice',
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<IUser>) => {
            state = action.payload;
        },
    },
});

export const { updateUser } = userSlice.actions;

export default userSlice;
