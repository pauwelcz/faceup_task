import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import './index.css';
import App from './App';

const client = new ApolloClient({
  link: new createHttpLink({
    uri: "graphql/",
  }),
  cache: new InMemoryCache(), 
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
);
