import {gql} from '@apollo/client'

const CREATE_ROOM_MUTATION = gql`
mutation createRoom ($createRoomInput : CreateRoomInput!) {
  createRoom( createRoomInput : $createRoomInput) {
    _id 
    name 
    description
    users
    image
  }
} 
`;
const UPDATE_ROOM_MUTATION = gql`
mutation updateRoom($updateRoomInput: UpdateRoomInput!){
  updateRoom( updateRoomInput: $updateRoomInput){
    _id
  }
}
`;
const REMOVE_ROOM_MUTATION = gql`
  mutation removeRoom($id: String!){
    removeRoom(id: $id){
      _id
    }
  }
`
export {CREATE_ROOM_MUTATION, UPDATE_ROOM_MUTATION, REMOVE_ROOM_MUTATION}