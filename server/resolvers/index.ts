// Connectors
import { PubSubManager } from '../connectors/pubsub';
import { FortuneCookieService } from '../connectors/rest/fortune';

// Resolving Controllers
// import { FileUpload } from './upload/fileUpload';

//
// NOTE:
// root = optional argument with the root object (could be set in app.ts)
// args = arguments coming from the query
// ctx = context object
//
const resolver = {
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
      /*
      For the upload: https://blog.apollographql.com/file-uploads-with-apollo-server-2-0-5db2f3f60675
      uploadDocumentBin: (root, { file, metadata }, ctx) =>
        new FileUpload(ctx.cookie)
          .processUpload(file, metadata, ctx)
      */
    },
    Subscription: {
      onData: {
        subscribe: () => PubSubManager.getInstance().pubsub.asyncIterator(PubSubManager.ON_DATA_MSG),
      },
    },
};

export default resolver;
