import { Common } from './server/helpers/common';
import { Conf } from './config/common';

// Store some confs
Conf.ServerAddr = process.env.ADDR || Conf.DefaultAppAddr;
Conf.ServerPort = process.env.PORT || String(Conf.DefaultAppPort);
Conf.ServerEnv = process.env.NODE_TARGET_ENV || Common.constants.ENV_DEV;
Conf.ServerEnvId = process.env.NODE_ENV_ID || 1;
Conf.ServerKey = `${Conf.AppName}:${Conf.ServerEnv}-${Conf.ServerEnvId}`;

const isDev = Conf.ServerEnv === Common.constants.ENV_DEV
  || Conf.ServerEnv === Common.constants.ENV_TEST;

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import * as multer from 'multer';
import * as bodyParser from 'body-parser';
import * as request from 'request-promise-native';

import * as restRoutes from './server/routes/rest';
import { GraphQlServer } from './server';

const app = express();

// CORS options
// TODO: Use a flag to enable/disable CORS
const corsOptions = {
  origin: Conf.AcceptedDomains,
  methods: Conf.AcceptedMethods,
  preflightContinue: Conf.PreflightContinue,
  optionsSuccessStatus: Conf.OptionsSuccessStatus,
  credentials: true,
};

// Support pre-flight for all the requests
app.options(Conf.AcceptedDomains, cors(corsOptions));

// -------------------
//  Apollo Server
// -------------------
GraphQlServer.createServer(
  Conf.GraphQlPath,
  app,
  corsOptions,
  isDev,
);

if (isDev) {
  // Enabling Request module debug
  request.debug = true;
}

// Configure multer to accept multiple files (.any())
// or a single file (.single('file'))
app.use(multer({
  storage: multer.memoryStorage(),
}).any());

// ------------------------
// REST
// ------------------------
app.use(Conf.RestPath, cors(corsOptions), restRoutes);

// ------------------------
// MISC.
// ------------------------
// view engine setup
app.set('views', Conf.ViewsSrcPath);
app.set('view engine', Conf.ViewsEngine);
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  // catch 404 and forward to error handler
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handlers
if (isDev) {
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

export { app };
