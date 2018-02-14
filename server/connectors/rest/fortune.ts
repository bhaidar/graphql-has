import { BaseConnector } from "./base";

class FortuneCookieService extends BaseConnector {
  constructor() {
    super();
  }

  getOne() {
    const opts = this.constructRequestObject('http://fortunecookieapi.herokuapp.com/v1/cookie');
    return this._get(opts);
  }
}

// and at the bottom, modify the export to include FortuneCookie
export { FortuneCookieService };
