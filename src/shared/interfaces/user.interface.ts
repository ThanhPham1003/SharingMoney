export interface IUser {
    _id: string;
    email: string;
    name: string;
    type?: string;
    uid?: string;
    avatar: string;
    date_of_birth?: Date;
    updated_at?: Date;
    created_at?: Date;
}
