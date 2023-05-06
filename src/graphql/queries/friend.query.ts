import { gql } from '@apollo/client';


const GET_ALL_FRIENDS = gql`
    query GetAllFriends($page: Int!, $limit: Int!, $confirmed: Boolean!){
      friends(page: $page, limit: $limit, confirmed: $confirmed){
        _id 
        requester
        receiver
        confirmed
      }
    }
`;
const GET_REQUEST_LIST = gql`
query GetAllFriends($page: Int!, $limit: Int!, $confirmed: Boolean!, $receiver: String!){
  friends(page: $page, limit: $limit, confirmed: $confirmed, receiver: $receiver){
    _id 
    requester
  }
}
`;

export { GET_ALL_FRIENDS, GET_REQUEST_LIST };