import { File } from "./file.type";
import { Upload } from "./upload.scalar";

export interface Mutation {
  uploadDocumentBin: File;
}

export interface UploadDocumentBinMutationArgs {
  file: Upload;
}
