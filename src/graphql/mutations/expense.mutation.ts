import {gql} from '@apollo/client'

const CREATE_EXPENSE_MUTATION = gql`
  mutation createExpense ($createExpenseInput : CreateExpenseInput!) {
    createExpense( createExpenseInput : $createExpenseInput) {
      _id
      name
    }
  } 
`;

export {CREATE_EXPENSE_MUTATION}