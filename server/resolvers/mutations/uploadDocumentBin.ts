import { FileUpload } from './upload/fileUpload';

export default {
  // For the upload: https://blog.apollographql.com/file-uploads-with-apollo-server-2-0-5db2f3f60675
  uploadDocumentBin: (root, { file, metadata }, ctx) =>
    new FileUpload(ctx.cookie)
      .processUpload(file, metadata, ctx)
};
