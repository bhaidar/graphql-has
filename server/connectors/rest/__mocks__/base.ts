import * as _ from 'lodash';
import { dev, test, prod } from '../../../../config/apis';

class BaseConnector {
  protected cookie: string = '';
  protected conf;
  protected defaultHeaders;
  constructor(cookie: string) {
    this.defaultHeaders = {};
    this.conf = dev(process.env.TEST_ENV);
  }
  protected constructRequestObject(url: string, body?: any, queryParams?: any, headers?: any): any {
    headers = _.assign({}, this.defaultHeaders, headers);

    const output: any = {
      url,
      headers,
      json: headers['content-type'] === 'application/json' && headers.responseType !== 'arraybuffer'
    };

    if (!_.isUndefined(body)) {
      output.body = body;
    }
    if (!_.isUndefined(queryParams)) {
      output.qs = queryParams;
    }

    return output;
  }

  protected _get(opts: any, resolveWithFullResponse: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      const output = [];
      // Ad-hoc logic to return the content
      resolve(output);
    });
  }
  protected _post(opts: any, resolveWithFullResponse: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
  protected _put(opts: any, resolveWithFullResponse: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
  protected _delete(opts: any, resolveWithFullResponse: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
  protected _download(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }

}

export { BaseConnector };
