const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const pkg = require('./package.json');

const prod = process.env.NODE_ENV === 'production';
const buildForGitPage = process.env.GIT_PAGE;

module.exports = {
  parallel: true,
  publicPath: buildForGitPage ? '/x-chart/' : '/',
  runtimeCompiler: true,
  configureWebpack: {
    optimization: {
      minimizer: prod
        ? [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                drop_console: true,
              },
            },
          }),
        ]
        : [],
    },
  },
  chainWebpack: (config) => {
    // modify html-webpack-html configure
    config.plugin('html').tap((options) => {
      options[0].title = pkg.name;
      options[0].template = path.join(__dirname, 'src/template/index.html');
      options[0].favicon = path.join(__dirname, 'public/favicon.ico');
      if (prod) {
        options[0].inject = false;
        options[0].template = path.join(
          __dirname,
          'src/template/index.cache.html',
        );
        options[0].gitPage = buildForGitPage;
      }
      return options;
    });

    // modify url-loader for fonts
    config.module.rule('fonts').use('url-loader').loader('url-loader').tap((options) => {
      options.limit = 10000;
      // modify publicPath for git-pages
      options.publicPath = buildForGitPage
        ? '/x-chart/'
        : '/';
      return options;
    });
  },
};
