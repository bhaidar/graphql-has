import { ApolloServer } from 'apollo-server-express';
import { TypeDefs } from '../graphql';
import resolvers from './resolvers/resolver';

class GraphQlServer {
  public static createServer(
    path: string,
    app: any,
    corsOpts: any,
    developmentMode: boolean,
  ): void {
    const typeDefs = new TypeDefs().appSchemaToGql();

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req, res}) => ({
        cookie: req.headers.cookie,
      }),
      introspection: developmentMode,
      playground: developmentMode
    });

    server.applyMiddleware({
      app,
      path,
      cors: corsOpts,
    });
  }
}

export { GraphQlServer };
