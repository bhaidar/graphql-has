import { readFileSync, readdirSync, existsSync, statSync, stat } from 'fs';
import * as _ from 'lodash';
import { gql } from 'apollo-server-express';
import { Common } from '../server/helpers/common';

class TypeDefs {
  private graphQlFolder = './graphql';
  private graphQlExtension = '.graphql';
  private graphQlTypesFolder = `${this.graphQlFolder}/types`;
  private graphQlBase = `${this.graphQlFolder}/base${this.graphQlExtension}`;
  private schemaPath = `schema${this.graphQlExtension}`;

  constructor() {
    this.prepareGraphqlAsssets();
  }

  /**
   * Returns the content of the whole GraphQL definitions
   * as a single string
   */
  public appSchemaToString(): string {
    let output = '';
    output = output.concat(readFileSync(this.graphQlBase, 'utf8'));
    const files = readdirSync(this.graphQlTypesFolder);
    _.each(files, file => {
      if (file.indexOf(this.graphQlExtension) > -1) {
        output = output.concat(
          readFileSync(`${this.graphQlTypesFolder}/${file}`, 'utf8')
        );
      }
    });
    return output;
  }

  public appSchemaToGql(): any {
    return gql`${this.appSchemaToString()}`;
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

      const baseModifiedStat = statSync(this.graphQlBase);
      const baseModifiedDate = new Date(baseModifiedStat.mtime);

      if (baseModifiedDate > schemaModifiedDate) {
        this.triggerGraphqlPreparation();
      } else {
        const files = readdirSync(this.graphQlTypesFolder);
        _.each(files, file => {
          if (file.indexOf(this.graphQlExtension) > -1) {
            const fileStat = statSync(`${this.graphQlTypesFolder}/${file}`);
            const fileModifiedDate = new Date(fileStat.mtime);

            if (fileModifiedDate > schemaModifiedDate) {
              this.triggerGraphqlPreparation();
              return true;
            }
          }
        });
      }
    } else {
      this.triggerGraphqlPreparation();
    }
  }

  /**
   *
   */
  triggerGraphqlPreparation(): void {
    Common.executeNpmScript('prepare-graphql');
  }
}

export { TypeDefs };
