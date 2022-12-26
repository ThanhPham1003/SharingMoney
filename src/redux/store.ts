import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userSlice from './user/slice';
import roomSlice from './room/slice';
import appSlice from './app/slice';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

const store = configureStore({
    reducer: {
        room: roomSlice.reducer,
        user: userSlice.reducer,
        app: appSlice.reducer
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
