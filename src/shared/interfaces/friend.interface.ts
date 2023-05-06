export interface  IFriend {
  _id: string;
  requester: string;
  receiver: string;
  confirmed: boolean;
}
export interface  IRequest {
  _id: string;
  requester: string;
  confirmed: boolean;
}

export interface IFriendStates {
  friends: IFriend[];
}