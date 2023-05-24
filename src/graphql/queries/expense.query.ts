import { gql } from '@apollo/client';

const GET_ALL_EXPENSES =gql`
  query GetAllExpenses($roomId: String!){
    expenses(roomId: $roomId){
      _id
      name
      total
      payer
      description
      userShares{payer, amount, percent}
      images
    }
  }
`

export {GET_ALL_EXPENSES}