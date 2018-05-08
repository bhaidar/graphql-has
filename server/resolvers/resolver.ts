import { GraphQLUpload } from 'apollo-upload-server';

// Connectors
import { PubSubManager } from '../connectors/pubsub';
import { FortuneCookieService } from '../connectors/rest/fortune';

// Misc.
import { FileUtils } from '../helpers/fileUtils';

// Models
// ...

// Resolving Controllers
import { FileUpload } from './upload/fileUpload';

// Errors
import { UploadError } from '../errors/uploadError';

//
// NOTE:
// root = optional argument with the root object (could be set in app.ts)
// args = arguments coming from the query
// ctx = context object
//
const resolver = {
    Upload: GraphQLUpload,
    Query: {
      getFortuneCookie() {
        console.log('Resolver:: getFortuneCookie');
        const service = new FortuneCookieService();
        return new Promise((resolve, reject) => {
          service
            .getOne()
            .then((res: any) => {
              resolve(res[0].fortune.message);
            });
        });
      }
    },
    Mutation: {
      uploadDocumentBin: (root, { file, metadata }, ctx) =>
        new FileUpload(ctx.cookie)
          .processUpload(file, metadata, ctx)
    },
    Subscription: {
      onData: {
        subscribe: () => PubSubManager.getInstance().pubsub.asyncIterator(PubSubManager.ON_DATA_MSG),
      },
    },
};

export default resolver;
