import { readFileSync, readdirSync } from 'fs';
import * as _ from 'lodash';

class TypeDefs {
    constructor() {}

    appSchemaToString(): string {
      let output = ``;
      output = output.concat(readFileSync(`./graphql/base.graphql`, 'utf8'));
      const files = readdirSync(`./graphql/types/`);
      _.each(files, file => {
        if (file.indexOf('.graphql') > -1) {
          output = output.concat(readFileSync(`./graphql/types/${file}`, 'utf8'));
        }
      });
      return output;
    }
}
export { TypeDefs };
