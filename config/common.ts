import * as root from 'app-root-path';
import * as CONFS from '../serviceconfig.json';

class Conf {
  static ServerKey;
  static ServerAddr;
  static ServerPort;
  static ServerEnv;
  static ServerEnvId;

  static BFFName = CONFS.name;
  static UploadMaxNumOfFiles = 25;
  static DefaultBFFPort = CONFS.defaults.port;
  static DefaultBFFAddr = CONFS.defaults.addr;
  static AcceptedDomains = CONFS.cors.acceptedDomains;
  static AcceptedMethods = CONFS.cors.methods;
  static PreflightContinue = CONFS.cors.preflightContinue;
  static OptionsSuccessStatus = CONFS.cors.optionsSuccessStatus;
  static RestPath = CONFS.rest.path;
  static GraphQlPath = CONFS.graphql.path;
  static ViewsEngine = CONFS.views.engine;
  static ViewsSrcPath = String(CONFS.views.src).replace('__root', root.toString());

  static Remotes = CONFS.remotes;
}

export { Conf }
