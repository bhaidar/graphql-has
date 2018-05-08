/**
 * Ideally you don't need to touch this file since it's capable
 * to get everything it needs from the graphql folder.
 */
import { makeExecutableSchema } from 'graphql-tools';
import { TypeDefs } from '../../graphql';
import resolver from '../resolvers/resolver';

const typeDefs = new TypeDefs().appSchemaToString();
const resolvers = resolver;

export default makeExecutableSchema({ typeDefs, resolvers });
