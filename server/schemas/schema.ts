import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import { TypeDefs } from '../schemas/types';
import resolver from '../resolvers/resolver';

const typeDefsUtil = new TypeDefs();
let _typeDefs = `
scalar Upload

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

type Query {
  getFortuneCookie: String
}

type Mutation {
  uploadDocumentBin(file: Upload!): File!
}

type Subscription {
  onData: SubscriptionResult
}

type SubscriptionResult {
  id: String,
  data: String
}

type File {
  id: ID!
  path: String!
  filename: String!
  mimetype: String!
  encoding: String!
}
`;

const resolvers = resolver;
const typeDefs = typeDefsUtil.merge(_typeDefs);
const schema = makeExecutableSchema({ typeDefs, resolvers });
export default schema;
