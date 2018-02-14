class UploadError extends Error {
  static UPLOAD_ERROR = 'upload-error';
  static UPLOAD_ROLLBACK_MSG = 'Something wrong happened, the document has not been upload, please retry.';
  static UPLOAD_OP_NOT_PERMITTED_MSG = 'The reques';

  constructor(m: string) {
    super(m);
    Object.setPrototypeOf(this, UploadError.prototype);
  }
}

export { UploadError };
