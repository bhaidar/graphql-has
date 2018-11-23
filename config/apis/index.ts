import { Conf } from '../../config/common';

const dev = (envIndex: string | number): any => {
  // TODO: env specific confs
  return {
    ...Conf.Remotes
  };
};

const test = (envIndex: string | number): any => {
  // TODO: env specific confs
  return {
    ...Conf.Remotes
  };
};

const prod = (envIndex: string | number): any => {
  // TODO: env specific confs
  return {
    ...Conf.Remotes
  };
};

export { dev, test, prod };
