import {gql} from '@apollo/client'

const CREATE_FRIEND_MUTATION = gql`
  mutation createFriend ($createFriendInput : CreateFriendInput!) {
    createFriend( createFriendInput : $createFriendInput ) {
      _id
    }
  } 
`;

const CONFIRM_FRIEND_MUTATION = gql`
  mutation updateFriend ($updateFriendInput: UpdateFriendInput!){
    updateFriend(updateFriendInput: $updateFriendInput){
      _id
      confirmed
    }
  }
`;
const DELETE_FRIEND_MUTATION = gql`
  mutation removeFriend($id: String!){
    removeFriend(id: $id){
      _id
    }
  }
`

export { CREATE_FRIEND_MUTATION, CONFIRM_FRIEND_MUTATION, DELETE_FRIEND_MUTATION};