const path = require('path');

const projRoot  = path.resolve(__dirname, '..');

module.exports = {
  webpackFinal: (config) => {
    config.resolve.alias['@material-ui/styles'] = path.resolve(projRoot, 'node_modules', '@material-ui/styles');
    return { ...config };
  },
};
