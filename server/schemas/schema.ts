import { makeExecutableSchema } from 'graphql-tools';
import { TypeDefs } from '../../graphql';
import resolver from '../resolvers/resolver';

const typeDefs = new TypeDefs().appSchemaToString();
const resolvers = resolver;

export default makeExecutableSchema({ typeDefs, resolvers });
