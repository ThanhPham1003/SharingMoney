import { gql } from '@apollo/client';

const GET_ALL_USERS = gql`
    query GetAllUsers {
        users {
            _id
            name
            email
        }
    }
`;

const GET_USER = gql`
    query GetUser($id: String!) {
        user(id: $id) {
            _id
            name
            email
        }
    }
`;

export { GET_USER, GET_ALL_USERS };
