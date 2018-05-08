import { UploadError } from '../../errors/uploadError';
import { FileUtils } from '../../helpers/fileUtils';

/**
 * File upload resolving class
 */
class FileUpload {
  private cookie: string = '';

  constructor(cookie: string) {
    this.cookie = cookie;
  }

  /**
   * Processes the upload of a file. It is in charge of triggering the creation+upload
   * towards IXL and managing the rollback in case of failures
   * @param fileStream - The filestream object coming from the GraphQL mutation
   * @param metadata - The metadata object to be linked to the uploaded document
   * @param ctx - The context object coming from the GraphQL server
   * @param archiveOpts - An optional object containing configurations for the archive (flag/password)
   */
  public async processUpload(
    fileStream: any, metadata: any, ctx: any,
    archiveOpts: any = {isCompressed: false, password: ''}
  ) {
    const { stream, filename, mimetype, encoding }: any = await fileStream;
    const { body } = await FileUtils.getFileFromStream({ stream, filename });

    return new Promise((resolve, reject) => {
      // Your custom logic here...
      resolve(true);
    });
  }
}

export { FileUpload };
