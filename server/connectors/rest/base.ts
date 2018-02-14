import * as _ from 'lodash';
import * as request from 'request-promise-native';

import { Conf } from '../../../config/common';
import { Common } from '../../helpers/common';
import { dev, test, prod } from '../../../config/apis';

class BaseConnector {
  protected cookie: string = '';
  protected conf;

  constructor(cookie?: string) {
    this.cookie = cookie;

    const env = Conf.ServerEnv;
    const envIndex = Conf.ServerEnvId;
    switch (env) {
    case Common.constants.ENV_DEV:
      this.conf = dev(envIndex);
      break;
    case Common.constants.ENV_TEST:
      this.conf = test(envIndex);
      break;
    case Common.constants.ENV_PROD:
      this.conf = prod(envIndex);
      break;
    }
  }

  protected constructRequestObject(url: string, params?: any, queryParams?: any, headers?: any): any {
    const defaultHeaders = {
      'accept': 'application/json, text/plain, */*',
      'accept-encoding': 'gzip, deflate, br',
      'content-type': 'application/json',
      'cookie': this.cookie
    };
    headers =_.assign(defaultHeaders, headers);

    const output = {
      url: url,
      headers: headers,
      json: headers['content-type'] === 'application/json'
    };

    if (!_.isUndefined(params)) {
      output['body'] = params;
    }
    if (!_.isUndefined(queryParams)) {
      output['qs'] = queryParams;
    }

    return output;
  }

  // NOTE: It's useful to pass handlePromise=false in case you need to
  // get access to the raw response, otherwise it will processed
  // through the JSON parse.
  protected _get(opts, resolveWithFullResponse: boolean = false): Promise<any> {
    if (resolveWithFullResponse) {
      opts.resolveWithFullResponse = true;
    }
    return request.get(opts);
  }
  protected _post(opts, resolveWithFullResponse: boolean = false): Promise<any> {
    if (resolveWithFullResponse) {
      opts.resolveWithFullResponse = true;
    }
    return request.post(opts);
  }
  protected _put(opts, resolveWithFullResponse: boolean = false): Promise<any> {
    if (resolveWithFullResponse) {
      opts.resolveWithFullResponse = true;
    }
    return request.put(opts);
  }
  protected _delete(opts, resolveWithFullResponse: boolean = false): Promise<any> {
    if (resolveWithFullResponse) {
      opts.resolveWithFullResponse = true;
    }
    return request.delete(opts);
  }
}

export { BaseConnector };
