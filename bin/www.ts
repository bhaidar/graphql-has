/**
 * Module dependencies.
 */
import { app, schema } from '../app';
import { Conf } from '../config/common';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import * as fs from 'fs';
import * as http from 'http';
import * as debug from 'debug';
import * as inquirer from 'inquirer';
import chalk from 'chalk';

// binding to console
let log = debug('modern-express:server');
log.log = console.log.bind(console);

const server = http.createServer(app);
server.listen(Conf.ServerPort, Conf.ServerAddr, () => {
  // WebSocket Subscription server
  new SubscriptionServer({
    execute,
    subscribe,
    schema,
  }, {
    server: server,
    path: '/subscriptions',
  });
});

//
// EVENTS
//
server.on('error', (error: any) => {
  /**
   * Event listener for HTTP server "error" event.
   */
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof Conf.ServerPort === 'string' ? `Pipe ${Conf.ServerPort}` : `Port ${Conf.ServerPort}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  /**
   * Event listener for HTTP server "listening" event.
   */
  const addr = server.address();
  const bind = (typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`);
  log(`Listening on ${bind}`);
});

//
// UTILS
//
const onExit = () => {
  removeLock();
  process.exit();
}
const createLock = () => {
  removeLock();
  fs.writeFileSync('.pid.lock', process.pid, {flag: 'wx'});
};
const removeLock = () => {
  try {
    fs.unlinkSync('.pid.lock');
  } catch(err) {}
};

//
// BOOTSTRAP
//
const welcomeMessage = ` => Service up and running <= `;
const serverAddressMessage = ` (HTTP + WS) Listening on http://${Conf.ServerAddr}:${Conf.ServerPort} `;
const serverKeyMessage = ` [Service key] ${Conf.ServerKey} `;
console.log('\n');
console.log(chalk.white.bgMagentaBright('                                          '));
console.log(chalk.white.bgMagentaBright.bold(`     ${welcomeMessage}       `));
console.log(chalk.white.bgMagentaBright('                                          '));
console.log(chalk.white.bgBlack(serverAddressMessage));
console.log(chalk.white.bgBlack(serverKeyMessage));
console.log('\n');

createLock();

// Handle graceful exit
process.stdin.resume();
process.on('uncaughtException', onExit);
process.on('beforeExit', removeLock);
process.on('SIGINT', removeLock);
process.on('SIGTERM', removeLock);
