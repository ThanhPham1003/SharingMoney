export interface IRoom {
    id: string;
    name: string;
    description?: string;
    owner?: any;
    active?: boolean;
    users: string[];
    summary: any;
    created_at: Date;
    updated_at?: Date;
    deleted_at?: Date;
    imgUrl? : string; 
}

export interface IRoomStates {
    rooms: IRoom[];
}
