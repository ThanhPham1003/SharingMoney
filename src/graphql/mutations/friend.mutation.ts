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
`

export { CREATE_FRIEND_MUTATION, CONFIRM_FRIEND_MUTATION};