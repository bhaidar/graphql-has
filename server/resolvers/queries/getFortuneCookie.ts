import { FortuneCookieService } from '../../connectors/rest/fortune';

//
// NOTE:
// root = optional argument with the root object (could be set in app.ts)
// args = arguments coming from the query
// ctx = context object
export default {
  resolver: {
    query: {
      getFortuneCookie(root: any, {}: any, ctx: any) {
        console.log('Resolver:: getFortuneCookie');
        const service = new FortuneCookieService();
        return new Promise((resolve, reject) => {
          service
            .getOne()
            .then((res: any) => {
              resolve({
                msg: res[0].fortune.message
              });
            });
        });
      },
      getFortuneCookieJson(root: any, {}: any, ctx: any) {
        console.log('Resolver:: getFortuneCookieJson');
        const service = new FortuneCookieService();
        return new Promise((resolve, reject) => {
          service
            .getOne()
            .then((res: any) => {
              resolve({
                msg: res[0].fortune.message
              });
            });
        });
      }
    },
  },
  query: `
    getFortuneCookie: FortuneString
    getFortuneCookieJson: JSON
  `,
};
