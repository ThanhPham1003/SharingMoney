import {gql} from '@apollo/client'

export const CREATE_ROOM_MUTATION = gql`
mutation createRoom ($createRoomInput : CreateRoomInput!) {
  createRoom( createRoomInput : $createRoomInput) {
    id : _id 
    name 
    description
    users
  }
} 
`