import * as _ from 'lodash';
import { ApolloServer } from 'apollo-server-express';
import { TypeDefs } from '../graphql';

import context from './context';
import formatResponse from './extensions';
import validationRules from './validationRules';
import middlewares from './middlewares';

class GraphQlServer {
  public static server;

  public static createServer(
    path: string,
    app: any,
    corsOpts: any,
    developmentMode: boolean,
  ): void {
    const { resolvers, typeDefs } = new TypeDefs().appSchemaToString();

    // Registering middlewares before Apollo
    app.use(path, [...middlewares]);

    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      context,
      formatResponse,
      validationRules,
      introspection: developmentMode,
      playground: developmentMode,
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
