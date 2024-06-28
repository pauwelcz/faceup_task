import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client';
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import './index.css';
import App from './App';

const csrfMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-apollo-operation-name': operation.operationName || 'some-operation-name',
    },
  }));
  return forward(operation);
});

const uploadLink = createUploadLink({
  uri: 'http://localhost:3000/graphql', // Nastavte na váš GraphQL endpoint
});

const link = ApolloLink.from([csrfMiddleware, uploadLink]);


const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(), 
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
