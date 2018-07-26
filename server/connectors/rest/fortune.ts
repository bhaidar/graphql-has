import { BaseConnector } from './base';

class FortuneCookieService extends BaseConnector {
  constructor() {
    super();
  }

  public getOne() {
    const opts = this.constructRequestObject('http://fortunecookieapi.herokuapp.com/v1/cookie');
    return this._get(opts);
  }
}

export { FortuneCookieService };
