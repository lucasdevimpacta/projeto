// Configuration for your app
// https://quasar.dev/quasar-cli/quasar-conf-js

//solução temporaria, para extração de estilo default do quasar
var fs = require('fs')

const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')

var webpack = require('webpack');

if (process.env.GDMSESSION === 'ubuntu') {
  fs.writeFileSync(`${__dirname}\/node_modules\/quasar\/dist\/quasar.sass`, '/*! * Quasar Framework v1.6.1 * (c) 2015-present Razvan Stoenescu * Released under the MIT License. */')
  fs.writeFileSync(`${__dirname}\/node_modules\/@quasar\/quasar-ui-qmarkdown\/src\/index.sass`, '')
} else {
  fs.writeFileSync(`${__dirname}\\node_modules\\quasar\\dist\\quasar.sass`, '/*! * Quasar Framework v1.6.1 * (c) 2015-present Razvan Stoenescu * Released under the MIT License. */')
  fs.writeFileSync(`${__dirname}\\node_modules\\@quasar\\quasar-ui-qmarkdown\\src\\index.sass`, '')
}

module.exports = function (ctx) {
  let app = {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://quasar.dev/quasar-cli/cli-documentation/boot-files

    preFetch: true,

    boot: [
      'i18n',
      'axios',
      'vueFragment',
      'vueLazyload',
      {path:'vueDatepicker', server: false}
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-css
    css: [
      'app.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      // 'ionicons-v4',
      // 'mdi-v4',
      // 'fontawesome-v5',
      // 'eva-icons',
      // 'themify',
      // 'roboto-font-latin-ext', // this or either 'roboto-font', NEVER both!

      'roboto-font', // optional, you are not bound to it
      'material-icons' // optional, you are not bound to it
    ],

    // https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-framework
    framework: {
      //iconSet: 'material-icons', // Quasar icon set
      lang: 'pt-BR', // Quasar language pack

      // Possible values for "all":
      // * 'auto' - Auto-import needed Quasar components & directives
      //            (slightly higher compile time; next to minimum bundle size; most convenient)
      // * false  - Manually specify what to import
      //            (fastest compile time; minimum bundle size; most tedious)
      // * true   - Import everything from Quasar
      //            (not treeshaking Quasar; biggest bundle size; convenient)
      all: false,


      components: [],
      directives: [],

      // Quasar plugins
      plugins: [
        'Meta'
      ]
    },

    // https://quasar.dev/quasar-cli/cli-documentation/supporting-ie
    supportIE: false,

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-build
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history', // available values: 'hash', 'history'
      showProgress: true,
      gzip: true,
      analyze: true,
      // Options below are automatically set depending on the env, set them if you want to override
      // preloadChunks: false,
      // extractCSS: false,

      // https://quasar.dev/quasar-cli/cli-documentation/handling-webpack
      extendWebpack (cfg) {
        cfg.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /pt-br/));
      },

      //adicionado pelo kelvin
      env: ctx.dev
        ? { // so on dev we'll have
          // API: JSON.stringify('http://localhost:3008')
          API: JSON.stringify('https://apiv2.impacta.com.br/api/v1')
        }
        : { // and on build (production):
          API: JSON.stringify('https://apiv2.impacta.com.br/api/v1')
        }
    },

    // Full list of options: https://quasar.dev/quasar-cli/quasar-conf-js#Property%3A-devServer
    devServer: {
      https: false,
      port: 8081,
      compress: true,
      open: true // opens browser window automatically
    },

    // animations: 'all', // --- includes all animations
    // https://quasar.dev/options/animations
    animations: [],

    // https://quasar.dev/quasar-cli/developing-ssr/configuring-ssr
    ssr: {
      pwa: false,
      extendWebpack (cfg) {
        cfg.plugins.push(
          new PrerenderSpaPlugin({
            // Absolute path to compiled SPA
            staticDir: path.join(__dirname, 'dist'),
            // List of routes to prerender
            routes: ['/']
          })
        )
      },
    },

    // https://quasar.dev/quasar-cli/developing-pwa/configuring-pwa
    pwa: {
      workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
      workboxOptions: {}, // only for GenerateSW
      manifest: {
        name: 'Quasar App',
        short_name: 'Quasar App',
        description: 'sistema grupo impacta',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      id: 'org.cordova.quasar.app'
    },


    // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
    electron: {
      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'site_impacta_2020'
      },

      // keep in sync with /src-electron/main-process/electron-main
      // > BrowserWindow > webPreferences > nodeIntegration
      // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
      nodeIntegration: true,

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      }
    }
  }
  return app
}
