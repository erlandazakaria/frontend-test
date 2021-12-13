import { gql } from '@apollo/client';

export const GET_COLLECTIONS = gql`
  query getCollections {
    getCollections {
      _id
      user {
        _id
      }
      name
      restaurants {
        _id
        name
      }
    }
  }
`;

export const NEW_COLLECTION = gql`
  mutation newCollection($name: String!, $id_restaurant: String) {
    newCollection(name: $name, id_restaurant: $id_restaurant) {
      message
    }
  }
`;

export const ADD_TO_COLLECTION = gql`
  mutation addToCollection($id_collection: String!, $id_restaurant: String!) {
    addToCollection(id_collection: $id_collection, id_restaurant: $id_restaurant) {
      message
    }
  }
`;

export const DELETE_FROM_COLLECTION = gql`
  mutation deleteFromCollection($id_collection: String!, $id_restaurant: String!) {
    deleteFromCollection(id_collection: $id_collection, id_restaurant: $id_restaurant) {
      message
    }
  }
`;

export const RENAME_COLLECTION = gql`
  mutation renameCollection($id_collection: String!, $name: String!) {
    renameCollection(id_collection: $id_collection, name: $name) {
      message
    }
  }
`;

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($id_collection: String!) {
    deleteCollection(id_collection: $id_collection) {
      message
    }
  }
`;
