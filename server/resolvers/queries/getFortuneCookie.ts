import { FortuneCookieService } from '../../connectors/rest/fortune';

//
// NOTE:
// root = optional argument with the root object (could be set in app.ts)
// args = arguments coming from the query
// ctx = context object
export default {
  getFortuneCookie(root: any, {}: any, ctx: any) {
    console.log('Resolver:: getFortuneCookie');
    const service = new FortuneCookieService();
    return new Promise((resolve, reject) => {
      service
        .getOne()
        .then((res: any) => {
          resolve(res[0].fortune.message);
        });
    });
  }
};
