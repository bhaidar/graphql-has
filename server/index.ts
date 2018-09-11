import * as _ from 'lodash';
import { ApolloServer } from 'apollo-server-express';
import { TypeDefs } from '../graphql';

class GraphQlServer {
  public static server;

  public static createServer(
    path: string,
    app: any,
    corsOpts: any,
    developmentMode: boolean,
  ): void {
    const { resolvers, typeDefs } = new TypeDefs().appSchemaToString();

    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({req, res}) => ({
        cookie: req.headers.cookie,
      }),
      introspection: developmentMode,
      playground: developmentMode
    });

    this.server.applyMiddleware({
      app,
      path,
      cors: corsOpts,
    });
  }

  public static createSubscription(httpServer: any): void {
    this.server.installSubscriptionHandlers(httpServer);
  }
}

export { GraphQlServer };
