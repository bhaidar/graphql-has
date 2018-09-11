import { FileUpload } from './upload/fileUpload';

export default {
  resolver: {
    query: {},
    mutation: {
      // For the upload: https://blog.apollographql.com/file-uploads-with-apollo-server-2-0-5db2f3f60675
      uploadDocumentBin: (root, { file, metadata }, ctx) =>
      new FileUpload(ctx.cookie)
        .processUpload(file, metadata, ctx)
    },
    subscription: {},
  },
  query: ``,
  mutation: `
    uploadDocumentBin(file: Upload!): File!
  `,
  subscription: ``,
  common: `
    type File {
      filename: String!
      mimetype: String!
      encoding: String!
    }
  `,
};
