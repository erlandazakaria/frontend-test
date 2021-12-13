import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';

import { ToastProvider } from "./Contexts/Toast";
import { LoadingProvider } from "./Contexts/Loading";
import { AuthProvider } from "./Contexts/Auth";
import { RestaurantProvider } from "./Contexts/Restaurant";
import { gqlClient, theme } from './config';

import Wrapper from './Wrapper';
import reportWebVitals from './reportWebVitals';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <ToastProvider>
            <ApolloProvider client={gqlClient}> 
              <AuthProvider>
                <RestaurantProvider>
                  <Wrapper />
                </RestaurantProvider>
              </AuthProvider>  
            </ApolloProvider>
          </ToastProvider>
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
