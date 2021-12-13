import { verify } from "jsonwebtoken";
import moment from "moment";

import { gqlClient, isLoggedInVar } from "../config";
import { REFRESH_TOKEN } from "../Queries/User";

export const readLocalToken = () => {
  try {
    const read = localStorage.getItem(process.env.REACT_APP_LOCAL_STORAGE);
    return JSON.parse(read);
  } catch(err) {
    return false;
  }  
};

export const writeLocalToken = (token) => {
  try {
    localStorage.setItem(process.env.REACT_APP_LOCAL_STORAGE, JSON.stringify(token));
    isLoggedInVar({accessToken: token.accessToken, refreshToken: token.refreshToken});
    return true;
  } catch(err) {
    return false;
  }  
};

export const deleteLocalToken = () => {
  try {
    localStorage.removeItem(process.env.REACT_APP_LOCAL_STORAGE);
    isLoggedInVar(null);
    return true;
  } catch(err) {
    return false;
  }  
};

export const decodeToken = (token) => {
  let isValid = false;
  let user = null;

  try {
    isValid = verify(token, process.env.REACT_APP_JWT_SECRET);
  } catch(err) {}
  
  if(isValid) { user = isValid; }

  return user;
}

export const onFetchToken = () => {
  const now = moment().format();
  const token = readLocalToken();
  let isAccessTokenValid = false;
  let needRefresh = false;

  if(token) {
    try {
      isAccessTokenValid = verify(token.accessToken, process.env.REACT_APP_JWT_SECRET);
    } catch(err) {}
  }
  if(isAccessTokenValid) {
    let accessDiff = moment(parseInt(isAccessTokenValid.exp, 10)*1000).diff(now, "minutes");
    if(accessDiff < 15) {
      needRefresh = true;
    }
    return {
      needRefresh,
      accessToken: token.accessToken
    }
  } else {
    return {
      needRefresh: true,
      accessToken: null
    }
  }
}

export const onFetchRefreshToken = async () => {
  const token = readLocalToken();
  let isRefreshTokenValid = false;

  if(token) {
    try {
      isRefreshTokenValid = verify(token.refreshToken, process.env.REACT_APP_JWT_SECRET);
    } catch(err) {}
  }

  if(isRefreshTokenValid) {
    const { data } = await gqlClient.query({
      query: REFRESH_TOKEN,
      variables: { token: token.refreshToken }
    });
    if(data && data.refreshToken && data.refreshToken.accessToken) {
      writeLocalToken({accessToken: data.refreshToken.accessToken, refreshToken: data.refreshToken.refreshToken});
    }
  }
}

export const onLaunchcheckToken = async () => {
  const now = moment().format();
  const token = readLocalToken();
  let isAccessTokenValid = false;
  let isRefreshTokenValid = false;
  let accessToken = null;
  let refreshToken = null;
  let user = null;

  if(token) {
    try {
      isAccessTokenValid = verify(token.accessToken, process.env.REACT_APP_JWT_SECRET);
    } catch(err) {}

    try {
      isRefreshTokenValid = verify(token.refreshToken, process.env.REACT_APP_JWT_SECRET);
    } catch(err) {}
  }

  if(isAccessTokenValid) {
    // if access token valid then check expiry time, if reached minimum time then refresh token
    let accessDiff = moment(parseInt(isAccessTokenValid.exp, 10)*1000).diff(now, "minutes");
    if(accessDiff < 15) {
      // refresh token
      const { data } = await gqlClient.query({
        query: REFRESH_TOKEN,
        variables: { token: token.refreshToken }
      });
      if(data && data.refreshToken && data.refreshToken.accessToken) {
        writeLocalToken({accessToken: data.refreshToken.accessToken, refreshToken: data.refreshToken.refreshToken});
        accessToken = data.refreshToken.accessToken; 
        refreshToken = data.refreshToken.refreshToken; 
        user = isAccessTokenValid; 
      }
    } else {
      writeLocalToken({accessToken: token.accessToken, refreshToken: token.refreshToken});
      accessToken = token.accessToken; 
      refreshToken = token.refreshToken; 
      user = isAccessTokenValid; 
    }
  } else if(isRefreshTokenValid) {
    // if access token INVALID and refreshtoken VALID then refresh token
    // refresh token
    const { data } = await gqlClient.query({
      query: REFRESH_TOKEN,
      variables: { token: token.refreshToken }
    });
    if(data && data.refreshToken && data.refreshToken.accessToken) {
      writeLocalToken({accessToken: data.refreshToken.accessToken, refreshToken: data.refreshToken.refreshToken});
      accessToken = token.accessToken; 
      refreshToken = data.refreshToken.refreshToken;
      user = isRefreshTokenValid; 
    }
  }

  return {
    accessToken,
    user,
    refreshToken
  }
}
