import { createWriteStream, createReadStream, unlinkSync, statSync, readFileSync, readFile, existsSync } from 'fs';
import { UploadError } from '../errors/uploadError';

class FileUtils {
  /**
   * Sanitizes the filename from unwanted characters
   * @param filename - The filename
   */
  public static sanitizeFilename(filename: string): string {
    const re = new RegExp(/[%]/ig); // we might need to add more characters in the future
    return filename.replace(re, '-');
  }

  /**
   * Returns a stream and a filename from a given object
   * @param param0
   */
  public static getFileFromStream({ stream, filename }: any): Promise<any> {
    const chunks = [];
    return new Promise((resolve, reject) => {

      if (typeof stream === 'undefined') {
        reject(new UploadError(UploadError.UPLOAD_ERROR));
        return;
      }

      stream
        .on('error', (err) => {
          reject(err);
        })
        .on('data', (d) => chunks.push(d))
        .on('end', () => resolve({ body: Buffer.concat(chunks) }));
      }
    );
  }
}

export { FileUtils };
