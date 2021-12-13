import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, from, makeVar } from "@apollo/client";
import { createTheme } from "@mui/material/styles";

import { deleteLocalToken, onFetchToken, onFetchRefreshToken } from "./Utils/localStorage";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1F1F43",
      contrastText: "white"
    },
    secondary: {
      main: "#FFE920",
      contrastText: "#1F1F43"
    },
  },
  typography: {
    fontFamily: "Poppins"
  }
});

export const isLoggedInVar = makeVar();

const cache = new InMemoryCache({
  // addTypename: false,
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: { read() { return isLoggedInVar(); } },
        login: { merge(existing, incoming) { return incoming; } }
      },
    },
  },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const check = onFetchToken();
  if(operation.operationName !== "refreshToken"){
    if(check.needRefresh) {
      onFetchRefreshToken();
    }
    operation.setContext({
      headers: {
        token: check && check.accessToken ? `Bearer ${check.accessToken}`: "",
      }
    });
  }
  return forward(operation);
});

const invalidateMiddleware = new ApolloLink((operation, forward) => {
  return forward(operation).map((value) => {
    try {
      Object.keys(value.data).forEach(key => {
        if(key 
          && value.data[key] 
          && value.data[key].length > 0
          && value.data[key][0].__typename === "Message"
          && value.data[key][0].message.includes("Restricted")
        ) {
          deleteLocalToken();
        } else if(key 
          && typeof value.data[key] === "object"
          && value.data[key].__typename === "Message"
          && value.data[key].message.includes("Restricted")
        ) {
          deleteLocalToken();
        }
      });
    } catch(err) { console.log("ERROR IN MIDDLEWARE", err) }
    return value;
  });
});

console.log(process.env.REACT_APP_SERVER_URL)

const link = new HttpLink({
  uri: process.env.REACT_APP_SERVER_URL
});

export const gqlClient = new ApolloClient({
  link: from([
    authMiddleware,
    invalidateMiddleware,
    link,
  ]),
  cache: cache,
  connectToDevTools: false,
  credentials: "include",
});
