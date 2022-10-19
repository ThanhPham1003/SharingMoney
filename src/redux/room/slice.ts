import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRoom, IRoomStates } from 'shared/interfaces/room.interface';

const initialState: IRoomStates = {
    rooms: [],
};

const roomSlice = createSlice({
    name: 'room-slice',
    initialState,
    reducers: {
        getRoom: (state, action: PayloadAction<IRoom[]>) => {
            state.rooms = action.payload;
        },
        addRoom: (state, action: PayloadAction<IRoom>) => {
            state.rooms = [action.payload, ...state.rooms];
        },
        removeRoom: (state, action: PayloadAction<string>) => {
            const rooms = [...state.rooms];
            state.rooms = rooms.filter((el) => el.id !== action.payload);
        },
    },
});

export const { addRoom, removeRoom, getRoom } = roomSlice.actions;

export default roomSlice;
