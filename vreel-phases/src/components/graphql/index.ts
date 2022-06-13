import { ApolloClient, InMemoryCache, DefaultOptions } from '@apollo/client';

const BASE_URL = 'https://staging.vreel.page';
const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },

};

export const client = new ApolloClient({
  uri: `${BASE_URL}/graphql`,
  defaultOptions: defaultOptions,
  cache: new InMemoryCache(),

});
