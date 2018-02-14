const envs = {
  'env1': {
    apiBaseUrl: `dev.foobar.com`,
  },
  'env2': {
    apiBaseUrl: `dev.foobar.com`,
  }
};
let conf = (envIndex) => {
  const envKey = `env${envIndex}`;
  const output = {
    apiBaseUrl: envs[envKey].apiBaseUrl,
  };
  output.urls = {
    api: `https://${output.apiBaseUrl}/`,
  }
  return output;
};
module.exports = conf;
