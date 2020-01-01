import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ApolloClient, ApolloLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from '@apollo/react-hooks';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';

import { API_URI } from './environment';

import Home from './pages/home/Home';

const httpLink = createHttpLink({ uri: API_URI });

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
    });
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([httpLink, errorLink]),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Switch>
        <Route component={Home} exact />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
