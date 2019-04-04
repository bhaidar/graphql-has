import { BaseConnector } from './base';

class FortuneCookieService extends BaseConnector {
  private serviceName = 'getCookie';

  constructor() {
    super();
  }

  public getOne() {
    const opts = this.constructRequestObject(
      this.endpoints(this.serviceName)
    );
    return this._get(opts);
  }
}

export { FortuneCookieService };
