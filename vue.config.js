const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const pkg = require('./package.json');

const prod = process.env.NODE_ENV === 'production';
const cache = process.env.CACHE === 'true';
const buildForGitPage = process.env.GIT_PAGE;

function resolve(dir) {
  return path.join(__dirname, dir);
}

const splitChunks = {
  chunks: 'all',
  cacheGroups: {
    libs: {
      name: 'chunkLibs',
      test: /[\\/]node_modules[\\/]/,
      priority: 10,
      chunks: 'initial',
    },
    elementUI: {
      name: 'chunkElementUI',
      priority: 20,
      test: /[\\/]node_modules[\\/]element-ui[\\/]/,
    },
  },
};

module.exports = {
  parallel: true,
  publicPath: buildForGitPage ? '/x-chart/' : '/',
  runtimeCompiler: true,
  configureWebpack: {
    optimization: {
      splitChunks,
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
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: resolve('dist'),
        routes: ['/'],
      }),
    ],
  },
  chainWebpack: (config) => {
    // modify html-webpack-html configure
    config.plugin('html').tap((options) => {
      options[0].title = pkg.name;
      options[0].template = resolve('src/template/index.html');
      options[0].favicon = resolve('public/favicon.ico');

      // only set cache = true and prod mode will use cache template
      if (prod && cache) {
        options[0].inject = false;
        options[0].template = resolve('src/template/index.cache.html');
        options[0].gitPage = buildForGitPage;
      }
      return options;
    });

    // modify url-loader for fonts
    config.module
      .rule('fonts')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => {
        options.limit = 10000;
        // modify publicPath for git-pages
        options.publicPath = buildForGitPage ? '/x-chart/' : '/';
        return options;
      });
  },
};
