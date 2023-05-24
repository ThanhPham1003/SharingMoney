import { gql } from '@apollo/client';

const GET_MY_ROOMS = gql`
    query GetMyRooms($page: Int!, $limit: Int!) {
        myrooms(page: $page, limit: $limit) {
            _id
            name
            owner
            description
            users
            image
        }
    }
`;

const GET_ROOM_DETAIL = gql`
    query GetAllRooms($roomId: String!) {
        room(id: $roomId) {
            _id
            name
            users
            description
            owner
            image
        }
    }
`;

export { GET_MY_ROOMS, GET_ROOM_DETAIL };
