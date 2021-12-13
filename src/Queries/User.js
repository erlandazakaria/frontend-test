import { gql } from '@apollo/client';

export const IS_LOGGED_IN = gql`
  query IsUserLoggedIn {
    isLoggedIn @client
  }
`;

export const LOGIN = gql`
  query login($email: String!, $password: String!){
    login(email: $email, password: $password) {
      ...on Token {
        accessToken
        refreshToken
      }
      ...on Message {
        message
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  query refreshToken($token: String!) {
    refreshToken(token: $token) {
      accessToken
      refreshToken
    }
  }
`;

export const UPDATE_TOKEN = gql`
  query updateToken {
    updateToken {
      accessToken
      refreshToken
    }
  }
`;
