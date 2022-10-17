export interface IRoom {
    id: string;
    name: string;
    description?: string;
    owner?: any;
    active?: boolean;
    user_ids: string[];
    summary: any;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
}

export interface IRoomStates {
    rooms: IRoom[];
}
