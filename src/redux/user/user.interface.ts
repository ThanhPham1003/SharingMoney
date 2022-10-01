// Define a type for the slice state
export interface IUser {
    token: string;
}

// Define the initial state using that type
export const initialState: IUser = {
    token: 'test token',
};
