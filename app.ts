import { apolloUploadExpress } from 'apollo-upload-server';
import * as root from 'app-root-path';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as multer from 'multer';
import * as path from 'path';
import * as request from 'request-promise-native';

import * as restRoutes from './server/routes/rest';
import { Common } from './server/helpers/common';
import { Conf } from './config/common';

// Apollo
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import schema from './server/schemas/schema';

const app = express();

// Store some confs
Conf.ServerAddr = process.env.ADDR || Conf.DefaultBFFAddr;
Conf.ServerPort = process.env.PORT || String(Conf.DefaultBFFPort);
Conf.ServerEnv = process.env.NODE_TARGET_ENV || Common.constants.ENV_DEV;
Conf.ServerEnvId = process.env.NODE_ENV_ID || 1;
Conf.ServerKey = `BFF:doc-app:${Conf.ServerEnv}-${Conf.ServerEnvId}`;

// CORS options
const corsOptions = {
  origin: Conf.AcceptedDomains,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200                 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// ------------------------
// GraphQL
// ------------------------

// Support pre-flight for all the requests
app.options('*', cors(corsOptions));

// -------------------
//  Apollo Server
// -------------------
app.use(
  '/graphql',
  cors(corsOptions),
  bodyParser.json(),
  apolloUploadExpress(),
  graphqlExpress((req: any) => ({
    schema,
    rootValue: req,
    context: { cookie: req.headers.cookie },
  }))
);

if (Conf.ServerEnv === Common.constants.ENV_DEV || Conf.ServerEnv === Common.constants.ENV_TEST) {
  // Enabling Request module debug
  request.debug = true;

  // Enabling GraphiQL on dev env.
  app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://${Conf.ServerAddr}:${Conf.ServerPort}/subscriptions`,
  }));
}

// Configure multer to accept multiple files (.any()) or a single file (.single('file'))
app.use(multer({
  storage: multer.memoryStorage(),
}).any());

// ------------------------
// REST
// ------------------------
app.use('/rest', cors(corsOptions), restRoutes);

// ------------------------
// MISC.
// ------------------------
// view engine setup
app.set('views', `${root}/server/views/`);
app.set('view engine', 'ejs');
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // catch 404 and forward to error handler
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
if (Conf.ServerEnv === Common.constants.ENV_DEV || Conf.ServerEnv === Common.constants.ENV_TEST) {
  // development error handler
  // will print stacktrace
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
app.use((err: any, req: express.Request, res: express.Response, next: any) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

export { app, schema };
