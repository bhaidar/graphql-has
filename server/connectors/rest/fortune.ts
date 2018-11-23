import { BaseConnector } from './base';

class FortuneCookieService extends BaseConnector {
  constructor() {
    super();
  }

  public getOne() {
    const opts = this.constructRequestObject(this.endpoints.getCookie);
    return this._get(opts);
  }
}

export { FortuneCookieService };
