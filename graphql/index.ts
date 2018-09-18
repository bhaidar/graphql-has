import { lstatSync, readdirSync, existsSync, statSync } from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import { gql } from 'apollo-server-express';
import { Common } from '../server/helpers/common';
import resolvers from '../server/resolvers';

const baseGqlDefinition = gql`
schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}
`;

class TypeDefs {
  private logicBasePath = './server/resolvers';
  private graphQlExtension = '.graphql';
  private schemaPath = `schema${this.graphQlExtension}`;

  constructor() {
    this.prepareGraphqlAsssets();
  }

  /**
   * Returns the content of the whole GraphQL definitions
   * as a single gql string
   */
  public appSchemaToString(): any {
    const _resolvers = {
      Query: {},
      Mutation: {},
      Subscription: {},
    };

    const commonDefs = [];
    const queryDefs = [];
    const mutationDefs = [];
    const subscriptionDefs = [];

    _.each(resolvers, (items: any) => {
      _.each(items, (item: any) => {
        if (!_.isEmpty(item.resolver.query)) {
          _resolvers.Query = {
            ..._resolvers.Query,
            ...item.resolver.query,
          };
        }
        if (!_.isEmpty(item.resolver.mutation)) {
          _resolvers.Mutation = {
            ..._resolvers.Mutation,
            ...item.resolver.mutation,
          };
        }
        if (!_.isEmpty(item.resolver.subscription)) {
          _resolvers.Subscription = {
            ..._resolvers.Subscription,
            ...item.resolver.subscription,
          };
        }
        if (!_.isEmpty(item.common)) {
          commonDefs.push(item.common);
        }
        if (!_.isEmpty(item.query)) {
          queryDefs.push(item.query);
        }
        if (!_.isEmpty(item.mutation)) {
          mutationDefs.push(item.mutation);
        }
        if (!_.isEmpty(item.subscription)) {
          subscriptionDefs.push(item.subscription);
        }
      });
    });

    const commonDef = gql`${commonDefs.join("\n")}`;
    const queryDef = gql`
      type Query {
        ${queryDefs.join("\n")}
      }
    `;
    const mutationDef = gql`
      type Mutation {
        ${mutationDefs.join("\n")}
      }
    `;
    const subscriptionDef = gql`
      type Subscription {
        ${subscriptionDefs.join("\n")}
      }
    `;

    let typeDefs = [baseGqlDefinition];
    typeDefs = [
      ...typeDefs,
      commonDef,
      queryDef,
      mutationDef,
      subscriptionDef,
    ];

    return { resolvers: _resolvers, typeDefs };
  }

  /**
   * Checks if there are changes made after the last compile
   * of the GraphQL schema + TS interfaces + Fragments. If yes,
   * it does trigger the creation process of those entities.
   */
  public prepareGraphqlAsssets(): void {
    if (existsSync(this.schemaPath)) {
      const schemaStat = statSync(this.schemaPath);
      const schemaModifiedDate = new Date(schemaStat.mtime);

      /**
      * List all files in a directory recursively in a synchronous fashion.
      *
      * @param {String} dir
      * @returns {IterableIterator<String>}
      */
      const traverseDir = (dir) => {
        let output = [];
        readdirSync(dir).forEach(file => {
          let fullPath = path.join(dir, file);
          if (lstatSync(fullPath).isDirectory()) {
            output.push(...traverseDir(fullPath));
          } else {
            output.push(fullPath);
          }
        });
        return output;
      }

      const files = traverseDir(this.logicBasePath);
      _.each(files, file => {
        if (file.indexOf('.ts') > -1 && file.indexOf('index') < 0) {
          const fileStat = statSync(file);
          const fileModifiedDate = new Date(fileStat.mtime);

          if (fileModifiedDate > schemaModifiedDate) {
            this.triggerGraphqlPreparation();
            return true;
          }
        }
      });
    } else {
      this.triggerGraphqlPreparation();
    }
  }

  /**
   *
   */
  private triggerGraphqlPreparation(): void {
    Common.executeNpmScript('prepare-graphql');
  }
}

export { TypeDefs };
