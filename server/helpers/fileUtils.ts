import { createWriteStream, createReadStream, unlinkSync, statSync, readFileSync, readFile } from 'fs';

const uploadDir = './.tmp';

class FileUtils {
  static textContains(text: string, searchText: string): boolean {
    return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
  }

  static isPostBind(input: string): boolean {
    return input.indexOf('_PB') > 0;
  }

  static isFac(processType: string): boolean {
    return processType === 'FAC' || processType === 'FAC_PB';
  }

  static isCof(processType: string): boolean {
    return !FileUtils.isFac(processType) && !FileUtils.isPostBind(processType);
  }

  static validateFilename(filename: string): boolean {
    const re = new RegExp(/[^A-a0-9\w\.]/ig);
    return re.test(filename);
  }

  static sanitizeFilename(filename: string): string {
    const re = new RegExp(/[%]/ig); // we might need to add more characters in the future
    return filename.replace(re, '-');
  }

  static storeFile({ stream, filename }): Promise<any> {
    const id = Math.ceil(Math.random() * 99999);
    const path = `${uploadDir}/${id}-${filename}`
    return new Promise((resolve, reject) =>
      stream
        .on('error', error => {
          if (stream.truncated) {
            // Delete the truncated file
            unlinkSync(path)
          }
          reject(error)
        })
        .on('end', () => resolve({ id, path }))
        .pipe(createWriteStream(path))
    )
  }

  static deleteTmpFile(path: string): any {
    unlinkSync(path);
  }

  static getFileStream(path: string): any {
    return createReadStream(path);
  }

  static getFileBuffer(path: string): any {
    return readFileSync(path);
  }

  static getFileArrayBuffer(path: string): any {
    const rf = FileUtils.getFileBuffer(path);
    return Uint8Array.from(rf).buffer;
  }
}

export { FileUtils }
