import { gql } from '@apollo/client';

const GET_ALL_ROOMS = gql`
    query GetAllRooms($page: Int!, $limit: Int!) {
        rooms(page: $page, limit: $limit) {
            _id
            name
            owner
            description
            users
            description
        }
    }
`;

const GET_ROOM_DETAIL = gql`
    query GetAllRooms($roomId: String!) {
        room(id: $roomId) {
            _id
            name
            users
            owner
        }
    }
`;

export { GET_ALL_ROOMS, GET_ROOM_DETAIL };
