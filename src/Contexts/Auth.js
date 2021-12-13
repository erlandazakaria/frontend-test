import { createContext, useReducer, useMemo, useContext} from "react";
import { writeLocalToken, deleteLocalToken, decodeToken, onLaunchcheckToken } from "../Utils/localStorage";
import { gqlClient } from "../config";
import { LOGIN, UPDATE_TOKEN } from "../Queries/User";

const AuthContext = createContext();

const initialAuthState = false;

function AuthReducer(state, action) {
  switch (action.type) {
    case "SET_AUTH": {
      return action.payload;
    }
    case "UNSET_AUTH": {
      return {};
    }
    default: {
      throw new Error(`Unhandled type: ${action.type}`);
    }
  }
}

export function AuthProvider(props) {
  const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
  const value = useMemo(() => [state, dispatch], [state]);
  return <AuthContext.Provider value={value} {...props} />
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  const [state, dispatch] = context;
  
  const checkAuth = async () => {
    const check = await onLaunchcheckToken();
    if(check && check.user) {
      dispatch({ type: "SET_AUTH", payload: check.user });
    }
  };

  const login = async (payload) => {
    const { data } = await gqlClient.query({
      query: LOGIN,
      variables: payload,
      fetchPolicy: "network-only"
    });

    if(data.login.__typename === 'Token') {
      const user = decodeToken(data.login.accessToken);
      writeLocalToken({accessToken: data.login.accessToken, refreshToken: data.login.refreshToken});
      dispatch({ type: "SET_AUTH", payload: user });
      return { error: false }
    } else {
      return { error: true, msg: data.login.message};
    }
  };
  
  const logout = () => {
    dispatch({ type: "UNSET_AUTH" });
    deleteLocalToken();
  };

  const setAuth = (payload) => {
    writeLocalToken(payload.token);
    dispatch({ type: "SET_AUTH", payload: payload.user });
  };

  const updateToken = async () => {
    const { data } = await gqlClient.query({
      query: UPDATE_TOKEN,
      fetchPolicy: "network-only"
    });
    if(data.updateToken.__typename === 'Token') {
      const user = decodeToken(data.updateToken.accessToken);
      writeLocalToken({accessToken: data.updateToken.accessToken, refreshToken: data.updateToken.refreshToken});
      dispatch({ type: "SET_AUTH", payload: user });
    }
  }

  return { 
    auth: state, 
    checkAuth, 
    login, 
    logout, 
    setAuth, 
    updateToken
  };
}
