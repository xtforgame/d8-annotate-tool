const path = require('path');

const projRoot  = path.resolve(__dirname, '..');

module.exports = {
  webpackFinal: (config) => {
    config.resolve.alias['@material-ui/styles'] = path.resolve(projRoot, 'node_modules', '@material-ui/styles');
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
        },
      ],
    });
    config.resolve.extensions.push('.ts', '.tsx');
    return { ...config };
  },
};
