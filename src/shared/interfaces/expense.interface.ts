export interface  IExpense{
  _id: string;
  name: string;
  payer: string;
  total: number;
  description: string;
  __typename: string;
  userShares: any;
  images: string[];
}
export interface IUserShare{
  payer: string,
  amount: number,
  percent: number,
}
export interface IUserShareStates {
  userShares: IUserShare[];
}
export interface IExpenseStates {
  expenses: IExpense[];
}